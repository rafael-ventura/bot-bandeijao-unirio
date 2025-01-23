import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { animate, style, transition, trigger } from '@angular/animations';
import { MenuImageService } from '../../services/menu-image.service';

@Component({
    selector: 'app-menu-viewer',
    templateUrl: './menu-viewer.component.html',
    styleUrls: ['./menu-viewer.component.scss'],
    imports: [CommonModule, ButtonModule, CardModule],
    animations: [
        trigger('slideInOut', [
            transition(':enter', [
                style({ opacity: 0, height: 0 }),
                animate('300ms ease-out', style({ opacity: 1, height: '*' }))
            ]),
            transition(':leave', [
                animate('300ms ease-in', style({ opacity: 0, height: 0 }))
            ])
        ])
    ]
})
export class MenuViewerComponent implements OnInit {
  isMenuVisible: boolean = false;
  menuImagePath: string = '';

  constructor(private menuImageService: MenuImageService) {}

  ngOnInit() {
    this.updateMenuImagePath();
  }

  toggleMenu() {
    this.isMenuVisible = !this.isMenuVisible;
  }

  private updateMenuImagePath() {
    this.menuImageService.getLatestMenuImage().subscribe(
      path => this.menuImagePath = path
    );
  }
}
