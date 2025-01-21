export interface MenuItem {
  dish: string;
  isHoliday?: boolean;
}

export interface DailyMenu {
  date: string;
  items: {
    omnivorous?: MenuItem;
    vegetarian?: MenuItem;
    salad?: MenuItem;
    accompaniment?: string[];
    dessert?: string;
    juice?: string;
  };
  isHoliday?: boolean;
}

export interface WeeklyMenu {
  weekId: string;
  imagePath: string;
  days: DailyMenu[];
  processedAt: Date;
} 