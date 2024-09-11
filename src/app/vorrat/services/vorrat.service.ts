import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GerichtZutat } from '../../interfaces/gerichtZutat';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VorratService {

  constructor(private http: HttpClient) { }

  loadedIngredients: Subject<GerichtZutat[]> = new Subject<GerichtZutat[]>();

  getMeineZutaten() {
    this.http.get<GerichtZutat[]>('http://localhost:8080/api/v1/users/my/myZutaten').subscribe(res => {
      this.loadedIngredients.next(res);
      });
  }

  updateZutaten(gerichtZutaten: GerichtZutat[]) {
    this.http.post<GerichtZutat[]>('http://localhost:8080/api/v1/users/my/myZutaten', gerichtZutaten).subscribe(res => {
      this.loadedIngredients.next(res);
    });
  }
}
