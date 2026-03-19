import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-cta-banner',
  imports: [RouterLink, UpperCasePipe],
  template: `
<section class="bg-sf-blue relative overflow-hidden">
  <div class="max-w-4xl mx-auto px-4 py-20 text-center relative">
    <h2 class="font-display text-3xl sm:text-4xl font-800 text-white mb-4">{{ heading() }}</h2>
    @if (subheading()) {
      <p class="text-lg text-white/60 mb-10 max-w-xl mx-auto">{{ subheading() }}</p>
    }
    @if (link().startsWith('http')) {
      <a [href]="link()" target="_blank" rel="noopener" class="btn btn-white">
        {{ buttonText() | uppercase }}
      </a>
    } @else {
      <a [routerLink]="link()" class="btn btn-white">
        {{ buttonText() | uppercase }}
      </a>
    }
  </div>
</section>
  `
})
export class CtaBanner {
  heading = input.required<string>();
  subheading = input<string>();
  buttonText = input('Get in Touch');
  link = input('/contact');
}
