import { Component, inject, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ArticleService } from '../../../core/services/article.service';
@Component({
  selector: 'app-article-list',
  imports: [RouterLink, DatePipe],
  template: `
    <!-- Hero -->
    <section class="hero-gradient relative overflow-hidden -mt-16 pt-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 text-center relative">
        <div class="h-0.5 w-20 bg-sf-accent-light mb-6 mx-auto"></div>
        <h1 class="font-display text-4xl sm:text-5xl lg:text-6xl font-800 text-white mb-6 animate-reveal-up">Articles</h1>
        <p class="text-lg text-white/75 max-w-2xl mx-auto animate-reveal-up delay-200">
          Insights, news, and thought leadership from the SmartFactory team.
        </p>
      </div>
    </section>

    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <!-- Tag filters -->
        @if (!loading() && allTags().length > 0) {
          <div class="flex flex-wrap gap-2 mb-10 animate-fade-in">
            <button
              (click)="selectedTag.set(null)"
              [class]="selectedTag() === null
                ? 'tech-label bg-sf-blue text-white border border-sf-blue px-3 py-1 cursor-pointer transition-colors duration-150'
                : 'tech-label text-sf-blue bg-sf-blue/8 border border-sf-blue/15 px-3 py-1 cursor-pointer hover:bg-sf-blue/15 transition-colors duration-150'">
              All
            </button>
            @for (tag of allTags(); track tag) {
              <button
                (click)="selectedTag.set(tag)"
                [class]="selectedTag() === tag
                  ? 'tech-label bg-sf-blue text-white border border-sf-blue px-3 py-1 cursor-pointer transition-colors duration-150'
                  : 'tech-label text-sf-blue bg-sf-blue/8 border border-sf-blue/15 px-3 py-1 cursor-pointer hover:bg-sf-blue/15 transition-colors duration-150'">
                {{ tag }}
              </button>
            }
          </div>
        }

        @if (loading()) {
          <!-- Skeleton loader -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            @for (i of [1, 2, 3]; track i) {
              <div class="bg-white border border-sf-grey/15 rounded-xl overflow-hidden animate-pulse" [style.animation-delay.ms]="i * 150">
                <div class="h-48 bg-sf-grey-light"></div>
                <div class="p-6 space-y-3">
                  <div class="flex gap-2">
                    <div class="h-4 w-16 bg-sf-grey-light rounded-sm"></div>
                    <div class="h-4 w-12 bg-sf-grey-light rounded-sm"></div>
                  </div>
                  <div class="h-5 w-3/4 bg-sf-grey-light rounded-sm"></div>
                  <div class="space-y-2">
                    <div class="h-3 w-full bg-sf-grey-light rounded-sm"></div>
                    <div class="h-3 w-5/6 bg-sf-grey-light rounded-sm"></div>
                  </div>
                  <div class="h-3 w-24 bg-sf-grey-light rounded-sm mt-4"></div>
                </div>
              </div>
            }
          </div>
        } @else if (articles().length === 0) {
          <p class="text-center text-sf-text-light py-12">No articles published yet.</p>
        } @else if (filteredArticles().length === 0) {
          <p class="text-center text-sf-text-light py-12">No articles matching this tag.</p>
        } @else {
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            @for (article of filteredArticles(); track article.id; let i = $index) {
              <a [routerLink]="['/articles', article.slug]"
                 class="group block bg-white border border-sf-grey/15 rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:border-sf-accent/30 transition-all duration-200 relative"
                 [style.animation-delay.ms]="i * 80">
                <div class="bg-sf-grey-light h-48 flex items-center justify-center overflow-hidden">
                  @if (article.imageUrl) {
                    <img [src]="article.imageUrl" [alt]="article.title" class="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-200 will-change-transform">
                  } @else {
                    <svg class="w-10 h-10 text-sf-text-light/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"/>
                    </svg>
                  }
                </div>
                <div class="p-6">
                  <div class="flex flex-wrap gap-2 mb-3">
                    @for (tag of article.tags; track tag) {
                      <span class="tech-label text-sf-blue bg-sf-blue/8 border border-sf-blue/15 px-2 py-0.5">{{ tag }}</span>
                    }
                  </div>
                  <h2 class="font-display font-bold text-lg text-sf-blue group-hover:text-sf-accent transition-colors duration-200 mb-2">{{ article.title }}</h2>
                  <p class="text-base text-sf-text-mid leading-relaxed line-clamp-3">{{ article.summary }}</p>
                  <p class="font-mono text-sm text-sf-text-light mt-4 tracking-wide">{{ article.createdAt | date:'mediumDate' }}</p>
                </div>
              </a>
            }
          </div>
        }
      </div>
    </section>
  `,
})
export class ArticleList {
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
