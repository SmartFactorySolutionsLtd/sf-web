import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CtaBanner } from '../../../shared/components/cta-banner/cta-banner';
import { ScrollReveal } from '../../../shared/directives/scroll-reveal';

@Component({
  selector: 'app-careers',
  imports: [RouterLink, CtaBanner, ScrollReveal],
  templateUrl: './careers.html',
})
export class Careers {}
