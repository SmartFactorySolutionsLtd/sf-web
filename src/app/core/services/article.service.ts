import { Injectable, PLATFORM_ID, inject, signal, computed } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Article } from '../models/article.model';
import { environment } from '../../../environments/environment';

const ARTICLES_QUERY = `
  query Articles {
    articles(where: { published: true }, orderBy: createdAt_DESC) {
      id
      title
      slug
      summary
      content { html }
      coverImage { url }
      author
      tags
      createdAt
      updatedAt
    }
  }
`;

const CACHE_KEY = 'sf_articles_cache';
const CACHE_TTL = 5 * 60 * 1000; // 5 min

@Injectable({ providedIn: 'root' })
export class ArticleService {
  private isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private articlesSignal = signal<Article[]>([]);
  private loadedSignal = signal(false);

  readonly articles = this.articlesSignal.asReadonly();
  readonly loading = computed(() => !this.loadedSignal());

  readonly publishedArticles = this.articlesSignal.asReadonly();

  readonly latestPosts = computed(() =>
    this.articlesSignal().slice(0, 4)
  );

  constructor() {
    if (this.isBrowser) {
      this.loadArticles();
    } else {
      this.loadedSignal.set(true);
    }
  }

  getBySlug(slug: string): Article | undefined {
    return this.articlesSignal().find(a => a.slug === slug);
  }

  private async loadArticles() {
    const cached = this.readCache();
    if (cached) {
      this.articlesSignal.set(cached);
      this.loadedSignal.set(true);
      // revalidate in background if stale
      this.fetchArticles(true);
    } else {
      await this.fetchArticles(false);
    }
  }

  private async fetchArticles(silent: boolean) {
    try {
      const res = await fetch(environment.hygraph.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(environment.hygraph.token && { Authorization: `Bearer ${environment.hygraph.token}` }),
        },
        body: JSON.stringify({ query: ARTICLES_QUERY }),
      });

      const { data } = await res.json();
      const articles = (data?.articles ?? []).map(this.mapArticle);
      this.articlesSignal.set(articles);
      this.writeCache(articles);
    } catch (e) {
      if (!silent) console.error('Failed to fetch articles from Hygraph:', e);
    } finally {
      this.loadedSignal.set(true);
    }
  }

  private readCache(): Article[] | null {
    if (!this.isBrowser) return null;
    try {
      const raw = sessionStorage.getItem(CACHE_KEY);
      if (!raw) return null;
      const { ts, data } = JSON.parse(raw);
      if (Date.now() - ts > CACHE_TTL) return null;
      return data;
    } catch {
      return null;
    }
  }

  private writeCache(articles: Article[]) {
    if (!this.isBrowser) return;
    try {
      sessionStorage.setItem(CACHE_KEY, JSON.stringify({ ts: Date.now(), data: articles }));
    } catch { /* quota exceeded — ignore */ }
  }

  private mapArticle(raw: any): Article {
    return {
      id: raw.id,
      title: raw.title,
      slug: raw.slug,
      summary: raw.summary,
      content: raw.content?.html ?? '',
      imageUrl: raw.coverImage?.url ?? '',
      author: raw.author ?? 'SmartFactory Team',
      tags: raw.tags ?? [],
      published: true,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    };
  }
}
