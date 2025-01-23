import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-subscription-form',
  templateUrl: './subscription-form.component.html',
  styleUrls: ['./subscription-form.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule, InputTextModule, CardModule]
})
export class SubscriptionFormComponent {
  email: string = '';
  isSubscribing: boolean = false;

  async subscribeEmail() {
    if (!this.email || this.isSubscribing) return;

    try {
      this.isSubscribing = true;
      // TODO: Implementar chamada real para API
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulando chamada
      console.log('Email subscribed:', this.email);
      this.email = ''; // Limpa o input após sucesso
      // TODO: Adicionar toast de sucesso
    } catch (error) {
      console.error('Subscription error:', error);
      // TODO: Adicionar toast de erro
    } finally {
      this.isSubscribing = false;
    }
  }
}
