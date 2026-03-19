import { Component, inject, input, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ArticleService } from '../../../core/services/article.service';
import { ScrollReveal } from '../../../shared/directives/scroll-reveal';

@Component({
  selector: 'app-article-detail',
  imports: [RouterLink, DatePipe, ScrollReveal],
  template: `
    @if (article(); as a) {
      <!-- Compact header -->
      <div class="bg-sf-blue">
        <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between">
          <a routerLink="/articles" class="text-white/30 hover:text-white text-sm inline-flex items-center gap-2 transition-colors font-mono tracking-wide">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
            </svg>
            Articles
          </a>
          <div class="flex items-center gap-2">
            <span class="tech-label text-white/20">{{ a.createdAt | date:'mediumDate' }}</span>
          </div>
        </div>
      </div>

      <!-- Cover image -->
      @if (a.imageUrl) {
        <div class="bg-sf-blue">
          <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 animate-fade-in">
            <div class="relative overflow-hidden border border-white/10">
              <img [src]="a.imageUrl" [alt]="a.title"
                   class="w-full h-auto block">
            </div>
          </div>
        </div>
      }

      <!-- Title block -->
      <div class="bg-white pt-20">
        <div class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
          <!-- Tags -->
          <div class="flex flex-wrap gap-2 mb-6 animate-reveal-up">
            @for (tag of a.tags; track tag) {
              <span class="tech-label text-sf-blue bg-sf-blue/8 border border-sf-blue/15 px-2.5 py-1">{{ tag }}</span>
            }
          </div>

          <h1 class="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-800 text-sf-blue leading-[1.15] mb-6 animate-reveal-up delay-100">{{ a.title }}</h1>

          <!-- Author line -->
          <div class="flex items-center gap-4 animate-reveal-up delay-200">
            <div class="w-8 h-0.5 bg-sf-blue/30"></div>
            <span class="font-display text-sm text-sf-text-mid tracking-wide">{{ a.author }}</span>
          </div>
        </div>
      </div>

      <!-- Article body -->
      <div class="bg-white">
        <article class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16" appScrollReveal>
          <div class="article-prose" [innerHTML]="a.content"></div>
        </article>

        <!-- Footer nav -->
        <div class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div class="border-t border-sf-grey/20 pt-8">
            <a routerLink="/articles"
               class="inline-flex items-center gap-3 text-sf-blue hover:text-sf-blue-light font-display font-bold text-sm tracking-wide transition-colors group">
              <svg class="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
              </svg>
              ALL ARTICLES
            </a>
          </div>
        </div>
      </div>
    } @else if (loading()) {
      <section class="py-32 text-center bg-white">
        <div class="flex items-center justify-center gap-3">
          <span class="tech-label text-sf-text-light">Loading article</span>
        </div>
      </section>
    } @else {
      <section class="py-32 text-center bg-white">
        <h1 class="font-display text-2xl font-800 text-sf-blue mb-4">Article Not Found</h1>
        <a routerLink="/articles" class="text-sf-blue hover:text-sf-blue-light transition-colors font-display text-sm tracking-wide">Back to Articles</a>
      </section>
    }
  `,
  styles: [`
    :host ::ng-deep .article-prose {
      font-family: var(--font-body);
      font-size: 1.125rem;
      line-height: 1.9;
      color: var(--color-sf-text-mid);
    }

    :host ::ng-deep .article-prose > *:first-child {
      margin-top: 0;
    }

    :host ::ng-deep .article-prose h3 {
      font-family: var(--font-display);
      font-size: 1.35rem;
      font-weight: 800;
      color: var(--color-sf-blue);
      margin-top: 2.5rem;
      margin-bottom: 0.75rem;
      letter-spacing: -0.01em;
      position: relative;
      padding-left: 1rem;
    }

    :host ::ng-deep .article-prose h3::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0.2em;
      bottom: 0.2em;
      width: 3px;
      background: var(--color-sf-blue);
    }

    :host ::ng-deep .article-prose p {
      color: var(--color-sf-text-mid);
      margin-bottom: 1.25rem;
    }

    :host ::ng-deep .article-prose ul {
      margin: 1.25rem 0;
      padding-left: 0;
      list-style: none;
    }

    :host ::ng-deep .article-prose ul li {
      position: relative;
      padding-left: 1.25rem;
      margin-bottom: 0.75rem;
      color: var(--color-sf-text-mid);
    }

    :host ::ng-deep .article-prose ul li::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0.7em;
      width: 6px;
      height: 6px;
      background: var(--color-sf-blue);
    }

    :host ::ng-deep .article-prose strong {
      color: var(--color-sf-blue);
      font-weight: 700;
    }

    :host ::ng-deep .article-prose em {
      font-style: italic;
      color: var(--color-sf-blue);
    }

    :host ::ng-deep .article-prose a {
      color: var(--color-sf-accent);
      text-decoration: underline;
      text-underline-offset: 3px;
      transition: color 0.2s;
    }

    :host ::ng-deep .article-prose a:hover {
      color: var(--color-sf-blue);
    }
  `]
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
