import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CtaBanner } from '../../../shared/components/cta-banner/cta-banner';
import { ScrollReveal } from '../../../shared/directives/scroll-reveal';
import { SeoService } from '../../../core/services/seo.service';
@Component({
  selector: 'app-careers',
  imports: [RouterLink, CtaBanner, ScrollReveal],
  templateUrl: './careers.html',
})
export class Careers {
  constructor() {
    inject(SeoService).updatePage({
      title: 'Careers',
      description: 'Join SmartFactory — careers in IIoT, manufacturing intelligence, and Industry 4.0 solutions.',
      url: '/about/careers',
    });
  }
}
