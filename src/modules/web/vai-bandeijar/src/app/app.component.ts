import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { SocialLinksComponent } from './components/social-links/social-links.component';
import { FooterComponent } from './components/footer/footer.component';
import { SubscriptionFormComponent } from './components/subscription-form/subscription-form.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    CardModule,
    InputTextModule,
    SocialLinksComponent,
    FooterComponent,
    SubscriptionFormComponent
  ]
})
export class AppComponent {
  title = 'Vai Bandeijar?';
  email: string = '';

  mealSchedule = {
    lunch: '11:00 às 14:00',
    dinner: '17:00 às 19:00'
  };

  prices = [
    { category: 'Estudante', value: 'R$ 3,00' },
    { category: 'Servidor', value: 'R$ 12,00' },
    { category: 'Visitante', value: 'R$ 15,00' }
  ];

  mealComposition = [
    {
      icon: 'pi pi-star',
      title: 'Prato Principal',
      description: 'Proteína do dia com acompanhamentos'
    },
    {
      icon: 'pi pi-heart',
      title: 'Saladas',
      description: 'Opções variadas de saladas frescas'
    },
    {
      icon: 'pi pi-check-circle',
      title: 'Guarnição',
      description: 'Arroz, feijão e complementos'
    },
    {
      icon: 'pi pi-apple',
      title: 'Sobremesa',
      description: 'Fruta ou doce do dia'
    }
  ];

  subscribeEmail() {
    // Implementar lógica de inscrição
    console.log('Email subscribed:', this.email);
    this.email = '';
  }

  openTelegram() {
    window.open('https://t.me/bandejao_unirio', '_blank');
  }

  openIdPortal() {
    window.open('https://id.unirio.br', '_blank');
  }

  showMenuImage() {
    // Lógica para mostrar a imagem do cardápio
  }
}
