import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';

@Component({
    selector: 'app-social-links',
    templateUrl: './social-links.component.html',
    styleUrls: ['./social-links.component.scss'],
    standalone: true,
    imports: [CommonModule, CardModule]
})
export class SocialLinksComponent {
  socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/rafael-ventura',
      icon: 'assets/github-logo.png'
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/raf4ael-ventura/',
      icon: 'assets/linkedin-logo.png'
    },
    {
      name: 'Portfolio',
      url: 'https://seu-portfolio.com',
      icon: 'assets/home-logo.png'
    }
  ];

  openLink(url: string) {
    window.open(url, '_blank');
  }
}
