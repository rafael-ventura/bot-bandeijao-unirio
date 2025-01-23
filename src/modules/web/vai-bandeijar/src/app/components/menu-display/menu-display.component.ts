import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';

@Component({
    selector: 'app-section-bandeijao',
    templateUrl: './menu-display.component.html',
    styleUrls: ['./menu-display.component.scss'],
    imports: [CommonModule, CardModule]
})
export class MenuDisplayComponent {
  mealSchedule = {
    lunch: '11:00 às 14:00',
    dinner: '17:00 às 19:00'
  };

  prices = [
    { category: 'Estudante', value: '3,00' },
    { category: 'Servidor', value: '12,00' },
    { category: 'Visitante', value: '15,00' }
  ];

  mealComposition = [
    {
      icon: 'pi pi-heart',
      title: 'Entrada',
      description: 'Um vegetal folhoso e um legume ou salada elaborada'
    },
    {
      icon: 'pi pi-star',
      title: 'Prato Principal',
      description: 'Um prato proteico onívoro ou um prato proteico vegano'
    },
    {
      icon: 'pi pi-check-circle',
      title: 'Guarnição',
      description: 'Legumes ou preparação farinácea ou massa'
    },
    {
      icon: 'pi pi-box',
      title: 'Acompanhamentos',
      description: 'Arroz branco, arroz integral e feijão'
    },
    {
      icon: 'pi pi-apple',
      title: 'Sobremesa',
      description: 'Fruta (diariamente) ou doce (algumas datas festivas)'
    },
    {
      icon: 'pi pi-glass',
      title: 'Bebida',
      description: 'Refresco com e sem açúcar'
    }
  ];
}
