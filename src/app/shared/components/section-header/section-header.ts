import { Component, input } from '@angular/core';
@Component({
  selector: 'app-section-header',
  templateUrl: './section-header.html'
})
export class SectionHeader {
  title = input.required<string>();
  label = input<string>();
  subtitle = input<string>();
  theme = input<'light' | 'dark'>('light');
}
