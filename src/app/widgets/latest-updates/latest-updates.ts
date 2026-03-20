import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ArticleService } from '../../core/services/article.service';
import { SectionHeader } from '../../shared/components/section-header/section-header';

@Component({
  selector: 'app-latest-updates',
  imports: [RouterLink, DatePipe, SectionHeader],
  template: `
    @if (posts().length > 0) {
      <section class="py-24 bg-sf-grey-light">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <app-section-header label="From Our Blog" title="Latest Updates" subtitle="News, insights, and announcements from our team" />

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            @for (post of posts(); track post.id) {
              <a [routerLink]="['/articles', post.slug]"
                 class="group block bg-white border border-sf-grey/15 rounded-xl p-6 shadow-sm hover:shadow-md hover:border-sf-accent/30 transition-all duration-300 relative overflow-hidden">

                <div class="flex items-start gap-4">
                  <div class="w-10 h-10 border border-sf-blue/20 flex items-center justify-center shrink-0">
                    <svg class="w-5 h-5 text-sf-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"/>
                    </svg>
                  </div>
                  <div class="min-w-0">
                    <h3 class="font-display font-bold text-sf-blue group-hover:text-sf-accent transition-colors mb-1">{{ post.title }}</h3>
                    <p class="text-base text-sf-text-mid line-clamp-2">{{ post.summary }}</p>
                    <p class="font-mono text-sm text-sf-text-light mt-3 tracking-wide">{{ post.createdAt | date:'mediumDate' }}</p>
                  </div>
                </div>
              </a>
            }
          </div>

          <div class="mt-10">
            <a routerLink="/articles"
               class="inline-flex items-center gap-3 text-sf-blue hover:text-sf-accent font-display font-bold text-sm tracking-wide transition-colors group">
              VIEW ALL ARTICLES
              <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </a>
          </div>
        </div>
      </section>
    }
  `,
})
export class LatestUpdates {
  private articleService = inject(ArticleService);
  posts = this.articleService.latestPosts;
}
