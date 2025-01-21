export interface MenuItem {
  dish: string;
  type: 'meat' | 'vegan' | 'side' | 'salad' | 'dessert';
}

export interface DailyMenu {
  date: string;
  items: MenuItem[];
  price: number;
}

export interface WeeklyMenu {
  week: string;
  days: DailyMenu[];
  imageUrl: string;
}

export interface Subscriber {
  email: string;
  telegramId?: string;
  preferences?: {
    email: boolean;
    telegram: boolean;
  };
} 