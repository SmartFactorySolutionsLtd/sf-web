import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './shared/components/navbar/navbar';
import { Footer } from './shared/components/footer/footer';
import { SeoService } from './core/services/seo.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  constructor() {
    inject(SeoService).setGlobalJsonLd([
      {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'SmartFactory',
        url: 'https://smartfactorysolutionsltd.github.io/sf-web',
        logo: 'https://smartfactorysolutionsltd.github.io/sf-web/assets/logos/smartfactory-logo.png',
        description: 'Manufacturing intelligence and IIoT solutions for Industry 4.0',
      },
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'SmartFactory',
        url: 'https://smartfactorysolutionsltd.github.io/sf-web',
      },
    ]);
  }
}
