import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SectionHeader } from '../../shared/components/section-header/section-header';
import { CtaBanner } from '../../shared/components/cta-banner/cta-banner';
import { ScrollReveal } from '../../shared/directives/scroll-reveal';

@Component({
  selector: 'app-about',
  imports: [RouterLink, SectionHeader, CtaBanner, ScrollReveal],
  templateUrl: './about.html',
})
export class About {
  subPages = [
    { path: '/about/team', label: 'Meet the Team' },
    { path: '/about/partners', label: 'Partners' },
    { path: '/about/careers', label: 'Careers' },
  ];

  stats = [
    { value: '20+', label: 'Years Delivering Automation' },
    { value: '5-10%', label: 'Productivity Improvement' },
    { value: 'IIoT', label: 'Industry 4.0 Technology' },
  ];

  capabilities = [
    {
      title: 'OPC Architecture',
      description: 'Secure OPC architecture communicates with virtually every PLC type and brand.',
      icon: 'M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2',
    },
    {
      title: 'Wireless Sensors',
      description: 'Smart wireless sensors capture data from non-networked machines.',
      icon: 'M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.858 15.355-5.858 21.213 0',
    },
    {
      title: 'Digital Workflows',
      description: 'Mobile touch screen devices convert manual paperwork into lean digital workflows.',
      icon: 'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z',
    },
    {
      title: 'Smart Displays',
      description: 'Interactive smart digital displays eliminate wasteful paper report preparation.',
      icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
    },
  ];
}
