import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SectionHeader } from '../../shared/components/section-header/section-header';
import { CtaBanner } from '../../shared/components/cta-banner/cta-banner';
import { LatestUpdates } from '../../widgets/latest-updates/latest-updates';
import { ScrollReveal } from '../../shared/directives/scroll-reveal';
import { ImageLightbox } from '../../shared/components/image-lightbox/image-lightbox';

@Component({
  selector: 'app-home',
  imports: [RouterLink, SectionHeader, CtaBanner, LatestUpdates, ScrollReveal, ImageLightbox],
  templateUrl: './home.html',
})
export class Home {
  activeTestimonial = 0;
  testimonialInterval: ReturnType<typeof setInterval> | null = null;

  testimonials = [
    {
      quote: 'WAPS transformed how we track and reduce downtime. We saw a measurable improvement in OEE within the first quarter.',
      name: 'Sarah Mitchell',
      role: 'Plant Director',
      company: 'Boston Scientific',
      image: 'assets/customers/testimonials/sarah-mitchell.jpg',
    },
    {
      quote: 'The real-time visibility into our production lines has been a game-changer. Our teams now fix problems before they escalate.',
      name: 'James O\'Connor',
      role: 'Operations Manager',
      company: 'Stryker',
      image: 'assets/customers/testimonials/james-oconnor.jpg',
    },
    {
      quote: 'SmartFactory understood our manufacturing challenges from day one. Implementation was fast and the support has been exceptional.',
      name: 'Maria Chen',
      role: 'VP Manufacturing',
      company: 'Teleflex',
      image: 'assets/customers/testimonials/maria-chen.jpg',
    },
  ];

  ngOnInit() {
    this.testimonialInterval = setInterval(() => {
      this.activeTestimonial = (this.activeTestimonial + 1) % this.testimonials.length;
    }, 4000);
  }

  ngOnDestroy() {
    if (this.testimonialInterval) clearInterval(this.testimonialInterval);
  }

  setTestimonial(index: number) {
    this.activeTestimonial = index;
    if (this.testimonialInterval) clearInterval(this.testimonialInterval);
    this.testimonialInterval = setInterval(() => {
      this.activeTestimonial = (this.activeTestimonial + 1) % this.testimonials.length;
    }, 4000);
  }

  valueProps = [
    {
      icon: 'M13 10V3L4 14h7v7l9-11h-7z',
      title: 'Fast Implementation',
      description: 'Get up and running in days, not months. Our streamlined deployment process minimises disruption to your operations.',
    },
    {
      icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
      title: 'No Extra Personnel',
      description: 'Our system integrates seamlessly without requiring additional on-site staff. Your team stays focused on what they do best.',
    },
    {
      icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
      title: 'Unified Visualisation',
      description: 'All your manufacturing data in one place. Clear, actionable dashboards that drive informed decision-making.',
    },
    {
      icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
      title: 'Best-in-Class Support',
      description: 'Customer-centric support that goes beyond the norm. We are partners in your success, not just a vendor.',
    },
  ];
}
