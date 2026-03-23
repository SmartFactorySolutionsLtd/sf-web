import { Component, ViewEncapsulation, inject, input, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ArticleService } from '../../../core/services/article.service';
import { ScrollReveal } from '../../../shared/directives/scroll-reveal';

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

  loading = this.articleService.loading;

  article = computed(() => {
    const s = this.slug();
    return s ? this.articleService.getBySlug(s) : undefined;
  });
}
