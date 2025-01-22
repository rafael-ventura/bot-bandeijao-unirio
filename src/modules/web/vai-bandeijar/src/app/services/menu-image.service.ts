import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MenuImageService {
  private readonly basePath = 'assets/cardapios';

  constructor(private http: HttpClient) {}

  getLatestMenuImage(): Observable<string> {
    return this.http.get<string[]>(`${this.basePath}/index.json`).pipe(
      map(files => {
        const latestFile = this.findLatestMenuFile(files);
        return `${this.basePath}/${latestFile}`;
      }),
      catchError(() => {
        // Fallback para latest.jpg se não conseguir ler o index.json
        return from([`${this.basePath}/latest.jpg`]);
      })
    );
  }

  private findLatestMenuFile(files: string[]): string {
    const menuFiles = files
      .filter(file => file.match(/cardapio_\d+-a-\d+-\d+-\d+\.jpg/))
      .map(file => ({
        filename: file,
        date: this.extractDateFromFilename(file)
      }))
      .sort((a, b) => b.date.getTime() - a.date.getTime());

    return menuFiles[0]?.filename || 'latest.jpg';
  }

  private extractDateFromFilename(filename: string): Date {
    // Formato: cardapio_21-a-24-01-25.jpg
    const match = filename.match(/cardapio_(\d+)-a-\d+-(\d+)-(\d+)\.jpg/);
    if (!match) return new Date(0);

    const [_, endDay, month, year] = match;
    // Usando o último dia do período para comparação
    return new Date(`20${year}-${month}-${endDay}`);
  }
}
