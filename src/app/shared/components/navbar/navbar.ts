import { Component, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
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
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
  host: { '(window:scroll)': 'onScroll()' }
})
export class Navbar {
  private isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  mobileOpen = signal(false);
  scrolled = signal(false);

  navLinks: NavLink[] = [
    { path: '/', label: 'Home', exact: true },
    { path: '/solutions', label: 'Solutions', exact: false },
    { path: '/hardware', label: 'Hardware', exact: false },
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

  onScroll() {
    if (this.isBrowser) this.scrolled.set(window.scrollY > 20);
  }
}
