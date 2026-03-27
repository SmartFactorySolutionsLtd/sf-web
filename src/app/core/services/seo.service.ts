import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

const SITE_URL = 'https://smartfactorysolutionsltd.github.io/sf-web';
const SITE_NAME = 'SmartFactory';
const DEFAULT_IMAGE = `${SITE_URL}/assets/graphics/hero-factory.jpg`;

export interface Breadcrumb {
  name: string;
  url: string;
}

export interface SeoConfig {
  title: string;
  description: string;
  url: string;
  image?: string;
  type?: string;
  breadcrumbs?: Breadcrumb[];
  jsonLd?: Record<string, any> | Record<string, any>[];
}

@Injectable({ providedIn: 'root' })
export class SeoService {
  private meta = inject(Meta);
  private title = inject(Title);
  private doc = inject(DOCUMENT);

  updatePage(config: SeoConfig) {
    const fullTitle = `${config.title} | ${SITE_NAME}`;
    const absoluteUrl = `${SITE_URL}${config.url}`;
    const image = config.image ?? DEFAULT_IMAGE;
    const type = config.type ?? 'website';

    this.title.setTitle(fullTitle);

    this.meta.updateTag({ name: 'description', content: config.description });

    // Open Graph
    this.meta.updateTag({ property: 'og:title', content: fullTitle });
    this.meta.updateTag({ property: 'og:description', content: config.description });
    this.meta.updateTag({ property: 'og:url', content: absoluteUrl });
    this.meta.updateTag({ property: 'og:image', content: image });
    this.meta.updateTag({ property: 'og:type', content: type });
    this.meta.updateTag({ property: 'og:site_name', content: SITE_NAME });

    // Twitter Card
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: fullTitle });
    this.meta.updateTag({ name: 'twitter:description', content: config.description });
    this.meta.updateTag({ name: 'twitter:image', content: image });

    // Canonical
    this.updateCanonical(absoluteUrl);

    // JSON-LD
    const schemas: Record<string, any>[] = [];
    if (config.jsonLd) {
      schemas.push(...(Array.isArray(config.jsonLd) ? config.jsonLd : [config.jsonLd]));
    }
    if (config.breadcrumbs?.length) {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: config.breadcrumbs.map((b, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: b.name,
          item: `${SITE_URL}${b.url}`,
        })),
      });
    }
    if (schemas.length) {
      this.setPageJsonLd(schemas);
    } else {
      this.removePageJsonLd();
    }
  }

  setGlobalJsonLd(data: Record<string, any> | Record<string, any>[]) {
    let el = this.doc.getElementById('global-jsonld') as HTMLScriptElement | null;
    if (!el) {
      el = this.doc.createElement('script');
      el.id = 'global-jsonld';
      el.type = 'application/ld+json';
      this.doc.head.appendChild(el);
    }
    el.textContent = JSON.stringify(Array.isArray(data) ? data : [data]);
  }

  private setPageJsonLd(data: Record<string, any> | Record<string, any>[]) {
    let el = this.doc.getElementById('page-jsonld') as HTMLScriptElement | null;
    if (!el) {
      el = this.doc.createElement('script');
      el.id = 'page-jsonld';
      el.type = 'application/ld+json';
      this.doc.head.appendChild(el);
    }
    el.textContent = JSON.stringify(Array.isArray(data) ? data : [data]);
  }

  private removePageJsonLd() {
    this.doc.getElementById('page-jsonld')?.remove();
  }

  setSpeculationRules(rules: object) {
    let el = this.doc.getElementById('speculation-rules') as HTMLScriptElement | null;
    if (!el) {
      el = this.doc.createElement('script');
      el.id = 'speculation-rules';
      el.type = 'speculationrules';
      this.doc.body.appendChild(el);
    }
    el.textContent = JSON.stringify(rules);
  }

  private updateCanonical(url: string) {
    let link = this.doc.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!link) {
      link = this.doc.createElement('link');
      link.rel = 'canonical';
      this.doc.head.appendChild(link);
    }
    link.href = url;
  }
}
