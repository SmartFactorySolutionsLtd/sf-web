import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-cta-banner',
  imports: [RouterLink, UpperCasePipe],
  templateUrl: './cta-banner.html'
})
export class CtaBanner {
  heading = input.required<string>();
  subheading = input<string>();
  buttonText = input('Get in Touch');
  link = input('/contact');
}
