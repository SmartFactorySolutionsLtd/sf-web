import { Directive, ElementRef, OnInit, OnDestroy, NgZone } from '@angular/core';

@Directive({
  selector: '[appScrollGrow]',
})
export class ScrollGrow implements OnInit, OnDestroy {
  private raf = 0;
  private bound = this.onScroll.bind(this);

  constructor(private el: ElementRef<HTMLElement>, private zone: NgZone) {}

  ngOnInit() {
    this.el.nativeElement.style.transformOrigin = 'left';
    this.el.nativeElement.style.transition = 'transform 0.1s linear';
    this.el.nativeElement.style.transform = 'scaleX(0.3)';

    this.zone.runOutsideAngular(() => {
      window.addEventListener('scroll', this.bound, { passive: true });
      this.onScroll();
    });
  }

  private onScroll() {
    if (this.raf) return;
    this.raf = requestAnimationFrame(() => {
      this.raf = 0;
      const rect = this.el.nativeElement.getBoundingClientRect();
      const vh = window.innerHeight;

      const progress = Math.min(1, Math.max(0, (vh - rect.top) / vh));
      const scale = 0.3 + progress * 3.7;
      this.el.nativeElement.style.transform = `scaleX(${scale})`;
    });
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.bound);
    if (this.raf) cancelAnimationFrame(this.raf);
  }
}
