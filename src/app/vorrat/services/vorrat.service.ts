import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GerichtZutat } from '../../gerichte-my/gerichtZutat';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VorratService {

  constructor(private http: HttpClient) { }

  geladeneZutaten: GerichtZutat[] = [];
  isLoadedChanged: Subject<boolean> = new Subject<boolean>();
  isLoadedChanged2: Subject<GerichtZutat[]> = new Subject<GerichtZutat[]>();

  getMeineZutaten() {
    this.http.get<GerichtZutat[]>('http://localhost:8080/api/v1/users/my/myZutaten').subscribe(res => {
      this.geladeneZutaten = res;
      this.isLoadedChanged.next(true);
      });
  }

  updateZutaten(gerichtZutaten: GerichtZutat[]) {
    this.http.post<GerichtZutat[]>('http://localhost:8080/api/v1/users/my/myZutaten', gerichtZutaten).subscribe(res => {
      this.geladeneZutaten = res;
      this.isLoadedChanged.next(true);
      this.isLoadedChanged2.next(res);
    });
  }
}
