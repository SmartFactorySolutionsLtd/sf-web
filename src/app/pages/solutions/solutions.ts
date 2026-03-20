import { Component } from '@angular/core';
import { SectionHeader } from '../../shared/components/section-header/section-header';
import { CtaBanner } from '../../shared/components/cta-banner/cta-banner';
import { ScrollReveal } from '../../shared/directives/scroll-reveal';
import { ScrollFocus } from '../../shared/directives/scroll-focus';
import { ImageLightbox } from '../../shared/components/image-lightbox/image-lightbox';
import { WapsLogoAnimated } from '../../shared/components/waps-logo-animated/waps-logo-animated';

@Component({
  selector: 'app-solutions',
  imports: [SectionHeader, CtaBanner, ScrollReveal, ScrollFocus, WapsLogoAnimated, ImageLightbox],
  templateUrl: './solutions.html',
})
export class Solutions {
  capabilities = [
    {
      title: 'Design',
      description: 'Define your production processes, KPIs, and data collection points. WAPS helps you design the data architecture that maps to your manufacturing goals.',
      icon: 'M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z',
      image: 'assets/waps/screenshots/grid-view.png',
    },
    {
      title: 'Capture',
      description: 'Seamlessly connect to your equipment via OPC UA and other industrial protocols. Collect real-time data from every work area without disrupting operations.',
      icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z',
      image: 'assets/waps/screenshots/energy.png',
    },
    {
      title: 'Analyse',
      description: 'Transform raw data into meaningful insights. Advanced analytics identify trends, anomalies, and opportunities for improvement across your production lines.',
      icon: 'M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z',
      image: 'assets/waps/screenshots/ddms.png',
    },
    {
      title: 'Visualise',
      description: 'Unified dashboards bring all your manufacturing data together in one place. Clear, intuitive displays that empower every level of your organisation.',
      icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
      image: 'assets/waps/screenshots/map.png',
    },
    {
      title: 'Operational Excellence',
      description: 'Drive continuous improvement with data-backed decisions. WAPS supports lean manufacturing, Six Sigma, and other operational excellence methodologies.',
      icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6',
      image: 'assets/waps/screenshots/call-for-help.png',
    },
  ];

  features = [
    'Real-time production monitoring',
    'OEE tracking and reporting',
    'Downtime analysis and alerting',
    'Quality management integration',
    'Energy consumption monitoring',
    'Predictive maintenance insights',
    'Custom KPI dashboards',
    'Multi-site management',
  ];

  opcFeatures = [
    'Vendor-agnostic connectivity',
    'Secure, encrypted data transfer',
    'Brownfield and greenfield deployments',
  ];

  integrations = [
    { name: 'Power BI', logo: 'assets/integrations/power-bi.png', description: 'Export and visualise WAPS data in Microsoft Power BI dashboards for advanced business intelligence.' },
    { name: 'SAP', logo: 'assets/integrations/sap.png', description: 'Bi-directional integration with SAP ERP for seamless production planning and reporting.' },
    { name: 'PAS-X', logo: 'assets/integrations/korber.png', description: 'Connect with Körber PAS-X MES for pharmaceutical and biotech manufacturing compliance.' },
    { name: 'Oracle', logo: 'assets/integrations/oracle.png', description: 'Integrate with Oracle Manufacturing Cloud for enterprise-wide visibility and control.' },
  ];
}
