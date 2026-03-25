import { Directive, ElementRef, OnInit, OnDestroy, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[appScrollReveal]',
})
export class ScrollReveal implements OnInit, OnDestroy {
  private isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private observer?: IntersectionObserver;

  constructor(private el: ElementRef<HTMLElement>) {}

  ngOnInit() {
    if (!this.isBrowser) return;
    this.el.nativeElement.style.opacity = '0';
    this.el.nativeElement.style.transform = 'translateY(20px)';
    this.el.nativeElement.style.transition = 'opacity 1s ease, transform 1s ease';
    this.el.nativeElement.style.transitionDelay = '0.15s';

    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.el.nativeElement.style.opacity = '1';
          this.el.nativeElement.style.transform = 'translateY(0)';
          this.observer?.unobserve(this.el.nativeElement);
        }
      },
      { threshold: 0.1 }
    );

    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }
}
