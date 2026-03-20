import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  template: `
    <footer class="bg-sf-blue border-t border-white/5">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
          <!-- Company -->
          <div>
            <div class="flex items-center gap-3 mb-6">
              <img src="assets/logo-light.png" alt="SmartFactory" class="h-8 w-auto">
            </div>
            <p class="text-sm text-white/30 leading-relaxed">
              Transforming manufacturing through intelligent data. Over 35 years of combined experience in manufacturing technology.
            </p>
          </div>

          <!-- Quick Links -->
          <div>
            <span class="tech-label text-sf-blue-light block mb-6">Navigation</span>
            <ul class="space-y-3 text-sm">
              <li><a routerLink="/" class="text-white/40 hover:text-sf-accent transition-colors font-display">Home</a></li>
              <li><a routerLink="/solutions" class="text-white/40 hover:text-sf-accent transition-colors font-display">Solutions</a></li>
              <li><a routerLink="/about" class="text-white/40 hover:text-sf-accent transition-colors font-display">About</a></li>
              <li><a routerLink="/articles" class="text-white/40 hover:text-sf-accent transition-colors font-display">Articles</a></li>
              <li><a routerLink="/contact" class="text-white/40 hover:text-sf-accent transition-colors font-display">Contact</a></li>
            </ul>
          </div>

          <!-- Contact -->
          <div>
            <span class="tech-label text-sf-blue-light block mb-6">Contact</span>
            <ul class="space-y-3 text-sm text-white/40">
              <li class="font-body">Nexus Innovation Centre, Tierney Building</li>
              <li class="font-body">University of Limerick, Ireland V94 NYD3</li>
              <li class="pt-2 font-mono text-sm">
                <span class="block">IE: +353 61 518 443</span>
                <span class="block mt-1">UK: +44 1 635 800 355</span>
              </li>
              <li><a href="mailto:info@smartfactory.ie" class="hover:text-sf-accent transition-colors font-mono text-sm">info&#64;smartfactory.ie</a></li>
              <li class="pt-2 flex items-center gap-4">
                <a href="https://www.linkedin.com/company/smart-factory-solutions" target="_blank" rel="noopener"
                   class="inline-flex items-center gap-2 hover:text-sf-accent transition-colors">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                  <span class="font-mono text-sm">LinkedIn</span>
                </a>
                <a href="https://www.youtube.com/channel/UCQ7P1NPbLi5JtQYYlrj454g/videos" target="_blank" rel="noopener"
                   class="inline-flex items-center gap-2 hover:text-sf-accent transition-colors">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.546 12 3.546 12 3.546s-7.505 0-9.377.504A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.504 9.376.504 9.376.504s7.505 0 9.377-.504a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                  <span class="font-mono text-sm">YouTube</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div class="border-t border-white/5 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <span class="text-sm text-white/20 font-mono">&copy; {{ currentYear }} SmartFactory. All rights reserved.</span>
          <div class="flex items-center gap-2">
            <span class="w-1.5 h-1.5 rounded-full bg-sf-accent"></span>
            <span class="text-sm text-white/20 font-mono">Systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  `
})
export class Footer {
  currentYear = new Date().getFullYear();
}
