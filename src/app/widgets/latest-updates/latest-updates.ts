import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ArticleService } from '../../core/services/article.service';
import { SectionHeader } from '../../shared/components/section-header/section-header';

@Component({
  selector: 'app-latest-updates',
  imports: [RouterLink, DatePipe, SectionHeader],
  templateUrl: './latest-updates.html',
})
export class LatestUpdates {
  private articleService = inject(ArticleService);
  posts = this.articleService.latestPosts;
}
