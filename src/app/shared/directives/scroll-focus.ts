import { Directive, ElementRef, OnInit, OnDestroy, NgZone, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[appScrollFocus]',
})
export class ScrollFocus implements OnInit, OnDestroy {
  private isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private observer?: IntersectionObserver;
  private raf = 0;
  private listening = false;

  constructor(private el: ElementRef<HTMLElement>, private zone: NgZone) {}

  ngOnInit() {
    if (!this.isBrowser) return;
    const host = this.el.nativeElement;
    host.style.opacity = '0';
    host.style.transform = 'translateY(30px)';
    host.style.transition = 'opacity 0.4s ease-out, transform 0.4s ease-out';
    host.style.willChange = 'opacity, transform';

    this.zone.runOutsideAngular(() => {
      this.observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            if (!this.listening) {
              this.listening = true;
              window.addEventListener('scroll', this.onScroll, { passive: true });
            }
            this.update();
          } else {
            host.style.opacity = '0';
            host.style.transform = 'translateY(30px)';
          }
        },
        { threshold: 0 }
      );
      this.observer.observe(host);
    });
  }

  private onScroll = () => {
    if (!this.raf) {
      this.raf = requestAnimationFrame(() => {
        this.raf = 0;
        this.update();
      });
    }
  };

  private update() {
    const host = this.el.nativeElement;
    const rect = host.getBoundingClientRect();
    const vh = window.innerHeight;

    // 0 = element top at viewport bottom, 1 = element centered, 0 = element bottom at viewport top
    const center = rect.top + rect.height / 2;
    const t = 1 - Math.abs(center - vh / 2) / (vh / 2);
    const clamped = Math.max(0, Math.min(1, t));

    // ease curve for smoother feel
    const eased = clamped < 0.5
      ? 2 * clamped * clamped
      : 1 - 2 * (1 - clamped) * (1 - clamped);

    const translateY = (1 - eased) * 30;
    host.style.opacity = String(eased);
    host.style.transform = `translateY(${translateY}px)`;
  }

  ngOnDestroy() {
    if (!this.isBrowser) return;
    this.observer?.disconnect();
    window.removeEventListener('scroll', this.onScroll);
    if (this.raf) cancelAnimationFrame(this.raf);
  }
}
