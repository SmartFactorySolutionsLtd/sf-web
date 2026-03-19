import { Component, signal, input, effect, Renderer2, inject, OnDestroy } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-image-lightbox',
  template: `
    <img [src]="src()" [alt]="alt()" [class]="imgClass()" class="cursor-zoom-in" (click)="open()" />
  `,
  host: { class: 'contents' }
})
export class ImageLightbox implements OnDestroy {
  src = input.required<string>();
  alt = input<string>('');
  imgClass = input<string>('');

  isOpen = signal(false);

  private renderer = inject(Renderer2);
  private doc = inject(DOCUMENT);
  private overlay: HTMLElement | null = null;

  constructor() {
    effect(() => {
      if (this.isOpen()) {
        this.createOverlay();
      } else {
        this.destroyOverlay();
      }
    });
  }

  open() { this.isOpen.set(true); }
  close() { this.isOpen.set(false); }

  ngOnDestroy() { this.destroyOverlay(); }

  private createOverlay() {
    if (this.overlay) return;

    const overlay = this.renderer.createElement('div') as HTMLElement;
    overlay.style.cssText = 'position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.92);backdrop-filter:blur(4px);cursor:zoom-out;animation:lb-fade .15s ease-out';
    overlay.addEventListener('click', () => this.close());

    const btn = this.renderer.createElement('button') as HTMLElement;
    btn.setAttribute('aria-label', 'Close');
    btn.style.cssText = 'position:absolute;top:1.5rem;right:1.5rem;color:rgba(255,255,255,0.6);background:none;border:none;cursor:pointer;transition:color .2s';
    btn.innerHTML = '<svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12"/></svg>';
    btn.addEventListener('mouseenter', () => btn.style.color = '#fff');
    btn.addEventListener('mouseleave', () => btn.style.color = 'rgba(255,255,255,0.6)');

    const img = this.renderer.createElement('img') as HTMLImageElement;
    img.src = this.src();
    img.alt = this.alt();
    img.style.cssText = 'max-width:92vw;max-height:92vh;object-fit:contain;cursor:zoom-out;animation:lb-scale .2s ease-out;background:#fff;border-radius:4px';

    // inject keyframes once
    if (!this.doc.getElementById('lb-styles')) {
      const style = this.renderer.createElement('style') as HTMLStyleElement;
      style.id = 'lb-styles';
      style.textContent = '@keyframes lb-fade{from{opacity:0}to{opacity:1}}@keyframes lb-scale{from{transform:scale(.9);opacity:0}to{transform:scale(1);opacity:1}}';
      this.doc.head.appendChild(style);
    }

    overlay.appendChild(btn);
    overlay.appendChild(img);
    this.doc.body.appendChild(overlay);
    this.overlay = overlay;
  }

  private destroyOverlay() {
    if (this.overlay) {
      this.overlay.remove();
      this.overlay = null;
    }
  }
}
