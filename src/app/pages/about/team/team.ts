import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SectionHeader } from '../../../shared/components/section-header/section-header';
import { CtaBanner } from '../../../shared/components/cta-banner/cta-banner';
import { ScrollReveal } from '../../../shared/directives/scroll-reveal';
@Component({
  selector: 'app-team',
  imports: [RouterLink, SectionHeader, CtaBanner, ScrollReveal],
  templateUrl: './team.html',
})
export class Team {
  departments = [
    {
      name: 'Executive Leadership',
      members: [
        { name: 'Brendan Sheppard', role: 'CEO', photo: 'assets/team/brendan-sheppard.jpg' },
        { name: 'Vincent Sheridan', role: 'Chairman of the Board', photo: 'assets/team/vincent-sheridan.png' },
        { name: 'John Murnane', role: 'CFO', photo: 'assets/team/john-murnane.jpg' },
      ],
    },
    {
      name: 'Engineering & Technical',
      members: [
        { name: 'Petr Kostka', role: 'Full-Stack Developer', photo: 'assets/team/petr-kostka.png' },
        { name: 'Ladislav Stefka', role: 'Front-End Developer', photo: 'assets/team/ladislav-stefka.jpg' },
        { name: 'Dominik Brazdil', role: 'Front-End Developer', photo: 'assets/team/dominik-brazdil.jpg' },
        { name: 'Ramil Islamov', role: 'Back-end Developer', photo: 'assets/team/ramil-islamov.jpg' },
        { name: 'Jakub Pribyl', role: 'System Administrator', photo: 'assets/team/jakub-pribyl.png' },
        { name: 'Sunil Rullania', role: 'MES Developer', photo: 'assets/team/sunil-rullania.png' },
      ],
    },
    {
      name: 'Administration',
      members: [
        { name: 'Emilie Lavin', role: 'Senior Administrator', photo: 'assets/team/emilie-lavin.jpg' },
      ],
    },
  ];
}
