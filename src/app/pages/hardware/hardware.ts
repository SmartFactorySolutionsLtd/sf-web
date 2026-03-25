import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import emailjs from '@emailjs/browser';
import { environment } from '../../../environments/environment';
import { CtaBanner } from '../../shared/components/cta-banner/cta-banner';
import { SectionHeader } from '../../shared/components/section-header/section-header';
import { ScrollReveal } from '../../shared/directives/scroll-reveal';
import { ScrollFocus } from '../../shared/directives/scroll-focus';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-hardware',
  imports: [ReactiveFormsModule, CtaBanner, SectionHeader, ScrollReveal, ScrollFocus],
  templateUrl: './hardware.html',
})
export class Hardware {
  private fb = new FormBuilder();

  constructor() {
    inject(SeoService).updatePage({
      title: 'IIoT Hardware & Smart Sensors',
      description: 'Industrial IoT toolkits, wireless sensors, condition monitoring, energy meters, RTLS, Pick-to-Light, and OPC UA connectivity solutions for manufacturing.',
      url: '/hardware',
      jsonLd: { '@context': 'https://schema.org', '@type': 'WebPage', name: 'IIoT Hardware & Smart Sensors', description: 'Industrial IoT hardware solutions for smart manufacturing' },
    });
  }

  showModal = signal(false);
  submitted = signal(false);
  sending = signal(false);
  error = signal(false);

  form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    company: [''],
    phone: [''],
    message: ['', Validators.required],
  });

  pdfUrl = 'assets/pdfs/004 - IIoT Toolkits and Smart Industrial Hardware.pdf';

  categories = [
    {
      label: '01',
      title: 'Performance & Condition Monitoring',
      description: 'Wireless data capture for Downtime, Scrap, Rework, Vibration, Temperature, and Current.',
      icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
    },
    {
      label: '02',
      title: 'Sustainability & SEU Monitoring',
      description: 'Wired and wireless capture for Energy and Utilities — Electricity, Gas, Water, Compressed Air.',
      icon: 'M13 10V3L4 14h7v7l9-11h-7z',
    },
    {
      label: '03',
      title: 'Identification & Locating',
      description: 'Vision systems, barcode readers, RFID, and Real Time Locating Systems (RTLS).',
      icon: 'M15 10.5a3 3 0 11-6 0 3 3 0 016 0z M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z',
    },
    {
      label: '04',
      title: 'Smart Connectivity',
      description: 'Industrial-grade cybersecurity, network infrastructure, and plug-and-play integrations.',
      icon: 'M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z',
    },
    {
      label: '05',
      title: 'Workflows & Process Automation',
      description: 'Pick-to-Light, Call-for-Parts and Call-for-Help solutions.',
      icon: 'M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z',
    },
  ];

  toolkits = [
    {
      number: '#1',
      title: 'Out-of-the-Box IIoT Platform',
      description: 'Turnkey data collection and visualisation platform preloaded with Kepware, Historian, WAPS dashboards, SQL, Power BI Gateway and more. Compact Rittal enclosure with Siemens IPC, firewall, WiFi AP, and Banner wireless gateway.',
      image: 'assets/hardware/toolkit-1.png',
      features: ['User Management (LDAP/SSO)', 'Downtime Viewer & OEE', 'Call-for-Help / Call-for-Parts', 'Sustainability & Condition Monitoring', 'Digital Daily Management', 'MAPS & Grid/Site View'],
    },
    {
      number: '#2',
      title: 'Wired & Wireless Gateways',
      description: 'Simplified IIoT integration with secure, scalable gateways. Support IO Link, Modbus RTU/TCP, and EtherNet/IP. Frequency hopping spread spectrum (FHSS) for reliable communication in IP67-rated housings.',
      image: 'assets/hardware/toolkit-2.png',
      features: ['Cleanroom expansion kit', 'Multiple protocol support', 'IP67-rated industrial housing'],
    },
    {
      number: '#3',
      title: 'Flexible Wireless I/O Nodes',
      description: 'Modular DX80 nodes supporting analogue, digital, thermistor, counters, or serial data — all over a secure wireless link. Flex-power and battery powered options. Multiple topologies: Point-to-Multipoint, Bus, Ring, Star, Tree, Mesh.',
      image: 'assets/hardware/toolkit-3.png',
      features: ['Configurable PNP/NPN I/O', '0-10V and 0-20mA analogue', '1-wire serial interface'],
    },
    {
      number: '#4',
      title: 'Wireless Condition Monitoring',
      description: 'Monitor vibration, current, and temperature in real-time from a compact wireless node with pre-configured sensors. Battery powered options available. Perfect for proactive maintenance.',
      image: 'assets/hardware/toolkit-4.png',
      features: ['Vibration & temperature sensors', 'Current transformer', 'Battery powered'],
    },
    {
      number: '#5',
      title: 'Wireless Output & State Monitoring',
      description: 'Complete pre-configured solution to wirelessly capture real-time production output and workstation states. Highly flexible, scalable and quick to install.',
      image: 'assets/hardware/toolkit-5.png',
      features: ['14-colour LED state indicator', 'High-speed counter', 'Wireless scrap pendant', 'Call-for-Help button', '24V or Li-Ion powered'],
    },
  ];

  specialised = [
    {
      title: 'SensingCam',
      subtitle: 'Visual Downtime Analysis',
      description: 'Revolutionise root-cause analysis with visual confirmation of events. Records up to 40 seconds before/after a trigger. Industrial rugged design, miniature 58mm size, 6GB storage.',
      image: 'assets/hardware/sensing-cam.png',
    },
    {
      title: 'Energy Meters',
      subtitle: 'Electricity Monitoring',
      description: '1-phase and 3-phase meters with CE/MID certification. DIN rail and panel mounting. Optional self-powered inductive meters. Modbus TCP/IP and RTU. Current transformers from 50A to 3000A.',
      image: 'assets/hardware/energy-meters.png',
    },
    {
      title: 'Flow Sensors',
      subtitle: 'Liquid & Gas Monitoring',
      description: 'Measure water, compressed air, nitrogen, coolants and more. Compact point-of-use measurement up to 200L/min. Optional clamp-on meters retrofit to existing pipework without production downtime.',
      image: 'assets/hardware/flow-sensors.png',
    },
    {
      title: 'Vision & RFID',
      subtitle: 'Identification Systems',
      description: 'Vision systems, industrial barcode readers with liquid lens technology, RFID tags and readers. Full integration with WAPS and customer databases. Laser-etch 2D Data Matrix for process verification.',
      image: 'assets/hardware/vision-systems.png',
    },
    {
      title: 'RTLS',
      subtitle: 'Real-Time Locating',
      description: 'Ultra-accurate indoor positioning — like GPS for your factory. Track assets, tools, WIP, or personnel with full two-way communication. E-paper transponders with IEEE 802.15.4a/z.',
      image: 'assets/hardware/rtls.jpg',
    },
    {
      title: 'Pick-to-Light',
      subtitle: 'Workflow Automation',
      description: 'Guide operators visually, confirm actions, and speed up kitting/Kanban operations. Touch sensors, optical sensors with 3-digit LED displays, multicolour IO-Link touch sensors.',
      image: 'assets/hardware/pick-to-light.png',
    },
  ];

  connectivity = [
    { title: 'SnapSignal', description: 'Convert legacy analogue and discrete sensor outputs to Modbus for seamless digital integration.' },
    { title: 'Power Bus', description: 'Modular 24V rail — drop in wireless nodes without rewiring or cutting power.' },
    { title: 'Distributed IO-Link', description: 'Rapid deployment of flexible RFID and barcode verification solutions.' },
    { title: 'Wireless IO-Link', description: 'Reliable industrial communication up to 20m. Up to 64 devices per master, up to 75% less wiring.' },
    { title: 'Industrial Networking', description: 'Firewalls, managed switches, VPN, NAT devices, PoE switches, and specialised antennas.' },
    { title: 'Cybersecurity', description: 'Consultancy, network design, and secure remote access for your IIoT infrastructure.' },
  ];

  openModal() {
    this.showModal.set(true);
    this.submitted.set(false);
    this.error.set(false);
  }

  closeModal() {
    this.showModal.set(false);
  }

  onBackdropClick(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      this.closeModal();
    }
  }

  async onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.sending.set(true);
    this.error.set(false);

    const { name, email, company, phone, message } = this.form.getRawValue();
    const { serviceId, templateId, publicKey } = environment.emailjs;

    try {
      await emailjs.send(serviceId, templateId, {
        from_name: name,
        from_email: email,
        company,
        phone,
        message,
      }, publicKey);

      this.submitted.set(true);
      this.form.reset();
      window.open(this.pdfUrl, '_blank');
      this.closeModal();
    } catch (err) {
      console.error('EmailJS error:', err);
      this.error.set(true);
    } finally {
      this.sending.set(false);
    }
  }
}
