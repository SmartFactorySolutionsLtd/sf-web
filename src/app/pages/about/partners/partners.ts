import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SectionHeader } from '../../../shared/components/section-header/section-header';
import { CtaBanner } from '../../../shared/components/cta-banner/cta-banner';
import { ScrollReveal } from '../../../shared/directives/scroll-reveal';
import { SeoService } from '../../../core/services/seo.service';

@Component({
  selector: 'app-partners',
  imports: [RouterLink, SectionHeader, CtaBanner, ScrollReveal],
  templateUrl: './partners.html',
})
export class Partners {
  constructor() {
    inject(SeoService).updatePage({
      title: 'Technology Partners',
      description: 'SmartFactory partners with Siemens, Turck Banner, LineSpex, Rittal, and NDS for world-class IIoT and manufacturing solutions.',
      url: '/about/partners',
      breadcrumbs: [
        { name: 'Home', url: '/' },
        { name: 'Company', url: '/about' },
        { name: 'Partners', url: '/about/partners' },
      ],
    });
  }
  partners = [
    {
      name: 'Siemens',
      description: 'Active in more than 200 countries, focusing on electrification, automation and digitalisation. A major global manufacturer of energy-efficient technologies and infrastructure solutions.',
      logo: 'assets/partners/siemens.png',
    },
    {
      name: 'Turck Banner',
      description: 'Global leader in process and industrial automation with sensors, vision systems, lighting, and wireless safety products. Operating across multiple continents with Fortune 500 clientele.',
      logo: 'assets/partners/turck-banner.png',
    },
    {
      name: 'LineSpex',
      description: 'Industrial vision camera specialist operating in 19 countries and 40 US states. Serves Fortune 100 manufacturers with dependable, reliable and affordable productivity camera solutions.',
      logo: 'assets/partners/linespex.png',
    },
    {
      name: 'Rittal',
      description: "Founded in 1961, world's leading systems provider for enclosures, power distribution, climate control and IT infrastructure. Employs 10,000 people globally across machinery, automotive and IT sectors.",
      logo: 'assets/partners/rittal.png',
    },
    {
      name: 'NDS',
      description: 'Specializes in smart digital signage software. Connects with data sources such as Microsoft Exchange, Dynamics and SAP, creating dynamic display content through interactivity and real-time analytics.',
      logo: 'assets/partners/nds.png',
    },
  ];
}
