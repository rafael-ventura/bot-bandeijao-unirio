import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { SocialLinksComponent } from './components/social-links/social-links.component';
import { SubscriptionFormComponent } from './components/subscription-form/subscription-form.component';
import { MenuViewerComponent } from './components/menu-viewer/menu-viewer.component';
import { MenuDisplayComponent } from './components/menu-display/menu-display.component';
import { TelegramButtonComponent } from './components/telegram-button/telegram-button.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    imports: [
        CommonModule,
        FormsModule,
        ButtonModule,
        CardModule,
        InputTextModule,
        SocialLinksComponent,
        SubscriptionFormComponent,
        MenuViewerComponent,
        MenuDisplayComponent,
        TelegramButtonComponent
    ]
})
export class AppComponent {
  title = 'Vai Bandeijar?';

  openIdPortal() {
    window.open('https://id.unirio.br', '_blank');
  }
}
