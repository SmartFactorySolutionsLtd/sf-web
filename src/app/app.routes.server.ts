import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  { path: 'articles/:slug', renderMode: RenderMode.Client },
  { path: '**', renderMode: RenderMode.Prerender },
];
