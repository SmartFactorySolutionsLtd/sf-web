import { Component, input } from '@angular/core';

@Component({
  selector: 'app-section-header',
  template: `
    <div class="mb-16">
      <div class="flex items-center gap-3 mb-4">
        <div class="h-px w-8 animate-line-grow" [class]="theme() === 'dark' ? 'bg-sf-blue-light' : 'bg-sf-blue'"></div>
        <span class="tech-label" [class]="theme() === 'dark' ? 'text-sf-blue-light' : 'text-sf-blue'">
          {{ title() }}
        </span>
      </div>
      <h2 class="font-display text-3xl sm:text-4xl font-800 leading-tight"
          [class]="theme() === 'dark' ? 'text-white' : 'text-sf-text'">
        {{ title() }}
      </h2>
      @if (subtitle()) {
        <p class="mt-4 text-lg sm:text-xl max-w-2xl"
           [class]="theme() === 'dark' ? 'text-white/50' : 'text-sf-text-mid'">
          {{ subtitle() }}
        </p>
      }
    </div>
  `
})
export class SectionHeader {
  title = input.required<string>();
  subtitle = input<string>();
  theme = input<'light' | 'dark'>('light');
}
