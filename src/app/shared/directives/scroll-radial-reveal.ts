import { Directive, ElementRef, OnInit, OnDestroy, NgZone, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[appScrollRadialReveal]',
})
export class ScrollRadialReveal implements OnInit, OnDestroy {
  private isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private observer?: IntersectionObserver;
  private raf = 0;
  private listening = false;

  constructor(private el: ElementRef<HTMLElement>, private zone: NgZone) {}

  ngOnInit() {
    if (!this.isBrowser) return;
    const host = this.el.nativeElement;
    host.style.clipPath = 'circle(0% at 50% 50%)';
    host.style.willChange = 'clip-path';

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
            host.style.clipPath = 'circle(0% at 50% 50%)';
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

    const center = rect.top + rect.height / 2;
    const t = 1 - Math.abs(center - vh / 2) / (vh / 2);
    const clamped = Math.max(0, Math.min(1, t));

    const eased = clamped < 0.5
      ? 2 * clamped * clamped
      : 1 - 2 * (1 - clamped) * (1 - clamped);

    const radius = eased * 75;
    host.style.clipPath = `circle(${radius}% at 50% 50%)`;
  }

  ngOnDestroy() {
    if (!this.isBrowser) return;
    this.observer?.disconnect();
    window.removeEventListener('scroll', this.onScroll);
    if (this.raf) cancelAnimationFrame(this.raf);
  }
}
