import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { RippleModule } from 'primeng/ripple';

@Component({
    selector: 'app-telegram-button',
    templateUrl: './telegram-button.component.html',
    styleUrls: ['./telegram-button.component.scss'],
    imports: [CommonModule, ButtonModule, CardModule, RippleModule]
})
export class TelegramButtonComponent {
  openTelegram() {
    window.open('https://t.me/bandejao_unirio', '_blank');
  }
}
