import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then(m => m.Home),
  },
  {
    path: 'solutions',
    loadComponent: () => import('./pages/solutions/solutions').then(m => m.Solutions),
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about').then(m => m.About),
  },
  {
    path: 'about/team',
    loadComponent: () => import('./pages/about/team/team').then(m => m.Team),
  },
  {
    path: 'about/partners',
    loadComponent: () => import('./pages/about/partners/partners').then(m => m.Partners),
  },
  {
    path: 'about/careers',
    loadComponent: () => import('./pages/about/careers/careers').then(m => m.Careers),
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact').then(m => m.Contact),
  },
  {
    path: 'articles',
    loadComponent: () => import('./pages/articles/article-list/article-list').then(m => m.ArticleList),
  },
  {
    path: 'articles/:slug',
    loadComponent: () => import('./pages/articles/article-detail/article-detail').then(m => m.ArticleDetail),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
