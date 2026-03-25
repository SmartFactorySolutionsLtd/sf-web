import { Component, ViewEncapsulation, effect, inject, input, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ArticleService } from '../../../core/services/article.service';
import { ScrollReveal } from '../../../shared/directives/scroll-reveal';
import { SeoService } from '../../../core/services/seo.service';

@Component({
  selector: 'app-article-detail',
  imports: [RouterLink, DatePipe, ScrollReveal],
  templateUrl: './article-detail.html',
  styleUrl: './article-detail.css',
  encapsulation: ViewEncapsulation.None
})
export class ArticleDetail {
  slug = input<string>();
  private articleService = inject(ArticleService);
  private seo = inject(SeoService);

  loading = this.articleService.loading;

  article = computed(() => {
    const s = this.slug();
    return s ? this.articleService.getBySlug(s) : undefined;
  });

  private seoEffect = effect(() => {
    const a = this.article();
    if (a) {
      this.seo.updatePage({
        title: a.title,
        description: a.summary,
        url: `/articles/${a.slug}`,
        image: a.imageUrl || undefined,
        type: 'article',
        jsonLd: {
          '@context': 'https://schema.org', '@type': 'BlogPosting',
          headline: a.title, description: a.summary, image: a.imageUrl,
          author: { '@type': 'Person', name: a.author },
          publisher: { '@type': 'Organization', name: 'SmartFactory', url: 'https://smartfactory.ie' },
          datePublished: a.createdAt, dateModified: a.updatedAt,
        },
      });
    }
  });
}
