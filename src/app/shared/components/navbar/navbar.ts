import { Component, signal, HostListener } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface NavLink {
  path: string;
  label: string;
  exact: boolean;
  children?: { path: string; label: string }[];
}

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  template: `
<nav class="fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300"
     [class]="scrolled() ? 'bg-white/90 backdrop-blur-md border-sf-grey/20' : 'bg-transparent border-transparent'">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex justify-between items-center h-16">
      <!-- Logo -->
      <a routerLink="/" class="shrink-0">
        <img [src]="scrolled() ? 'assets/logo.png' : 'assets/logo-light.png'" alt="SmartFactory" class="h-18 w-auto py-1 transition-opacity duration-300">
      </a>

      <!-- Desktop nav -->
      <div class="hidden lg:flex items-center gap-0.5" [class]="scrolled() ? 'nav-scrolled' : 'nav-top'">
        @for (link of navLinks; track link.path) {
          @if (link.children) {
            <div class="relative group">
              <a [routerLink]="link.path"
                 routerLinkActive="nav-active"
                 [routerLinkActiveOptions]="{ exact: link.exact }"
                 class="relative px-4 py-2 nav-link font-display font-medium text-sm tracking-wide transition-colors inline-flex items-center gap-1">
                {{ link.label }}
                <svg class="w-3 h-3 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                </svg>
              </a>
              <div class="absolute top-full left-0 pt-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div class="dropdown-menu bg-white border border-sf-grey/20 shadow-lg rounded-lg min-w-44 py-1">
                  @for (child of link.children; track child.path) {
                    <a [routerLink]="child.path"
                       routerLinkActive="nav-active"
                       [routerLinkActiveOptions]="{ exact: child.path === link.path }"
                       class="block px-4 py-2 text-sf-text-mid hover:text-sf-blue hover:bg-sf-grey-light font-display text-sm tracking-wide transition-colors">
                      {{ child.label }}
                    </a>
                  }
                </div>
              </div>
            </div>
          } @else {
            <a [routerLink]="link.path"
               routerLinkActive="nav-active"
               [routerLinkActiveOptions]="{ exact: link.exact }"
               class="relative px-4 py-2 nav-link font-display font-medium text-sm tracking-wide transition-colors">
              {{ link.label }}
            </a>
          }
        }
        <a routerLink="/contact"
           class="ml-6 btn btn-outline btn-sm">
          REQUEST A DEMO
        </a>
      </div>

      <!-- Mobile hamburger -->
      <button (click)="mobileOpen.set(!mobileOpen())" class="lg:hidden p-2 nav-link transition-colors" aria-label="Toggle menu">
        <div class="w-6 h-5 relative flex flex-col justify-between">
          <span class="block h-0.5 w-6 bg-current transition-all duration-300"
                [class.rotate-45]="mobileOpen()" [class.translate-y-2]="mobileOpen()"></span>
          <span class="block h-0.5 w-6 bg-current transition-all duration-300"
                [class.opacity-0]="mobileOpen()"></span>
          <span class="block h-0.5 w-6 bg-current transition-all duration-300"
                [class.-rotate-45]="mobileOpen()" [class.-translate-y-2]="mobileOpen()"></span>
        </div>
      </button>
    </div>
  </div>

  <!-- Mobile menu -->
  @if (mobileOpen()) {
    <div class="lg:hidden border-t border-sf-grey/20 bg-white">
      <div class="px-4 py-4 space-y-1">
        @for (link of navLinks; track link.path) {
          <a [routerLink]="link.path"
             routerLinkActive="text-sf-blue bg-sf-blue/5"
             [routerLinkActiveOptions]="{ exact: link.exact }"
             (click)="mobileOpen.set(false)"
             class="block py-2.5 px-3 text-sf-text-mid hover:text-sf-blue font-display font-medium text-sm tracking-wide transition-colors rounded-lg">
            {{ link.label }}
          </a>
          @if (link.children) {
            @for (child of link.children; track child.path) {
              <a [routerLink]="child.path"
                 routerLinkActive="text-sf-blue bg-sf-blue/5"
                 (click)="mobileOpen.set(false)"
                 class="block py-2 px-6 text-sf-grey hover:text-sf-blue font-display text-sm tracking-wide transition-colors rounded-lg">
                {{ child.label }}
              </a>
            }
          }
        }
        <div class="pt-3 mt-3 border-t border-sf-grey/20">
          <a routerLink="/contact" (click)="mobileOpen.set(false)"
             class="btn btn-outline btn-sm w-full justify-center">
            REQUEST A DEMO
          </a>
        </div>
        <div class="pt-3 flex items-center gap-4 text-sm text-sf-grey font-mono">
          <a href="tel:+35361518443" class="hover:text-sf-blue transition-colors">+353 61 518 443</a>
          <span>|</span>
          <a href="mailto:info@smartfactory.ie" class="hover:text-sf-blue transition-colors">info&#64;smartfactory.ie</a>
        </div>
      </div>
    </div>
  }
</nav>
  `,
  styles: [`
    :host { display: block; }
    .nav-top .nav-link { color: rgba(255,255,255,0.7); }
    .nav-top .nav-link:hover { color: white; }
    .nav-top .btn-outline { color: white; box-shadow: inset 0 0 0 1.5px rgba(255,255,255,0.5); }
    .nav-top .btn-outline:hover { background: white; color: var(--color-sf-blue); box-shadow: inset 0 0 0 1.5px white; }
    .nav-scrolled .nav-link { color: var(--color-sf-text-mid); }
    .nav-scrolled .nav-link:hover { color: var(--color-sf-blue); }
    .nav-top .nav-active { color: white !important; }
    .dropdown-menu .nav-active { color: var(--color-sf-blue) !important; font-weight: 700; }
    .nav-scrolled .nav-active { color: var(--color-sf-blue) !important; font-weight: 700; }
  `]
})
export class Navbar {
  mobileOpen = signal(false);
  scrolled = signal(false);

  navLinks: NavLink[] = [
    { path: '/', label: 'Home', exact: true },
    { path: '/solutions', label: 'Solutions', exact: false },
    {
      path: '/about', label: 'Company', exact: false,
      children: [
        { path: '/about', label: 'Overview' },
        { path: '/about/team', label: 'Team' },
        { path: '/about/partners', label: 'Partners' },
        { path: '/about/careers', label: 'Careers' },
      ],
    },
    { path: '/articles', label: 'Articles', exact: false },
  ];

  @HostListener('window:scroll')
  onScroll() {
    this.scrolled.set(window.scrollY > 20);
  }
}
