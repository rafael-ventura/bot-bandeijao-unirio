export class DateUtils {
  static getCurrentWeekId(): string {
    const date = new Date();
    return `${date.getFullYear()}-W${DateUtils.getWeekNumber(date)}`;
  }

  static getWeekNumber(date: Date): number {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  }

  static getWeekDates(weekId: string): Date[] {
    const [year, week] = weekId.split('-W');
    const firstDayOfYear = new Date(parseInt(year), 0, 1);
    const weekNumber = parseInt(week);
    
    const firstDayOfWeek = new Date(firstDayOfYear);
    firstDayOfWeek.setDate(firstDayOfYear.getDate() + (weekNumber - 1) * 7);
    
    const weekDates: Date[] = [];
    for (let i = 0; i < 5; i++) { // Segunda a Sexta
      const date = new Date(firstDayOfWeek);
      date.setDate(firstDayOfWeek.getDate() + i);
      weekDates.push(date);
    }
    
    return weekDates;
  }

  static formatDate(date: Date): string {
    return date.toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
} 