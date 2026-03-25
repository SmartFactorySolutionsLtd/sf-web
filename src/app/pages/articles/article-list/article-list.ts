import { Component, inject, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ArticleService } from '../../../core/services/article.service';
import { SeoService } from '../../../core/services/seo.service';
@Component({
  selector: 'app-article-list',
  imports: [RouterLink, DatePipe],
  templateUrl: './article-list.html',
})
export class ArticleList {
  constructor() {
    inject(SeoService).updatePage({
      title: 'Articles & Insights',
      description: 'Manufacturing insights, IIoT trends, and product updates from SmartFactory.',
      url: '/articles',
      jsonLd: { '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'SmartFactory Articles & Insights' },
    });
  }
  private articleService = inject(ArticleService);
  articles = this.articleService.publishedArticles;
  loading = this.articleService.loading;

  selectedTag = signal<string | null>(null);

  allTags = computed(() => {
    const tags = new Set<string>();
    for (const a of this.articles()) {
      for (const t of a.tags) tags.add(t);
    }
    return [...tags].sort();
  });

  filteredArticles = computed(() => {
    const tag = this.selectedTag();
    if (!tag) return this.articles();
    return this.articles().filter(a => a.tags.includes(tag));
  });
}
