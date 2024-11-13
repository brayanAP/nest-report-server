export class DateFormatter {
  static getDDMMMMYYYY(date: Date): string {
    const formatter = new Intl.DateTimeFormat('es-ES', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });

    return formatter.format(date);
  }
}
