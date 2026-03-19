# Hygraph-Powered Articles — Design Document

## Goal
Replace localStorage-based article management and in-app admin pages with Hygraph headless CMS. Articles authored in Hygraph Studio, fetched via GraphQL at runtime.

## Why Hygraph
- Free tier: 3 seats, 1K entries, 500K API calls/mo, unlimited asset storage
- GraphQL Content API — standard query language
- Rich text returns as HTML natively — no conversion needed
- Image CDN with transforms
- No self-hosting required

## Content Model

One model: **Article**

| Field | Type | Notes |
|-------|------|-------|
| title | String (required) | |
| slug | Slug (from title, unique) | Auto-generated |
| summary | String (required) | Multi-line |
| content | Rich Text | Fetched as HTML |
| coverImage | Asset | Hygraph CDN |
| author | String | Default: "Smart Factory Team" |
| tags | String list | e.g. `["linkedin", "iiot"]` |
| published | Boolean | Default false |

## Data Flow

```
Hygraph Studio (authors) → Hygraph Content Lake → Angular ArticleService (GraphQL fetch) → Components
```

## Angular Integration
- Native `fetch()` to Hygraph Content API endpoint — no Apollo needed
- ArticleService rewritten: localStorage → GraphQL queries
- Rich text content fetched as HTML
- Images as Hygraph CDN URLs
- API endpoint + read-only token in `environment.ts`

## Removals
- `src/app/core/services/auth.service.ts`
- `src/app/core/guards/admin.guard.ts`
- `src/app/pages/admin/` (login, article-manager, article-editor)
- Admin routes from `app.routes.ts`
- Seed articles from ArticleService

## Modifications
- `ArticleService` — rewrite to fetch from Hygraph
- `article.model.ts` — match Hygraph response shape
- `app.routes.ts` — remove admin routes
- Article list/detail templates — image rendering updates

## Sources
- [Hygraph Pricing](https://hygraph.com/pricing)
- [Hygraph Rich Text Field](https://hygraph.com/docs/api-reference/content-api/rich-text-field)
- [Hygraph Field Types](https://hygraph.com/docs/api-reference/schema/field-types)
- [Hygraph GraphQL Cheatsheet](https://hygraph.com/cheatsheets/graphql-api)
