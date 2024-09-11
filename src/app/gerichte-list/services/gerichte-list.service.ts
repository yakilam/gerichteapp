import { Injectable } from '@angular/core';
import { GerichtResponse } from '../../interfaces/gerichtResponse';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { GerichtZutat } from '../../interfaces/gerichtZutat';

@Injectable({
  providedIn: 'root'
})
export class GerichteListService {

  constructor(private http: HttpClient) { }

  neugeladeneGerichte: Subject<GerichtResponse[]> = new Subject<GerichtResponse[]>();
  zutaten: Subject<GerichtZutat[]> = new Subject<GerichtZutat[]>();

  deleteGericht(gericht: GerichtResponse){
    this.http.delete('http://localhost:8080/api/v1/gerichte/'+gericht.id).subscribe(response => {});
  }
  
  getUserPlan(){
    this.http.get<GerichtResponse[]>('http://localhost:8080/api/v1/users/my/myPlan').subscribe(response => {
      this.neugeladeneGerichte.next(response);
    })
  }

  updateUserPlan(userPlan: GerichtResponse[]){
    this.http.post<GerichtResponse[]>('http://localhost:8080/api/v1/users/my/myPlan', userPlan).subscribe(response => {});
  }

  addToUserPlan(userPlan: GerichtResponse){
    this.http.post<GerichtResponse>('http://localhost:8080/api/v1/users/my/myPlan/add', userPlan).subscribe(response => {});
  }

  getMeineGerichte() {
    this.http.get<GerichtResponse[]>('http://localhost:8080/api/v1/gerichte/my/my').subscribe(res => {
      this.neugeladeneGerichte.next(res);
      });
  }

  getAlleGerichte() {
    this.http.get<GerichtResponse[]>('http://localhost:8080/api/v1/gerichte').subscribe(res => {
      this.neugeladeneGerichte.next(res);
      });
  }

  getZutaten(){
    this.http.get<GerichtZutat[]>('http://localhost:8080/api/v1/users/my/myZutaten').subscribe(res => {
      this.zutaten.next(res);
    });
  }

  updateZutaten(gerichtZutaten: GerichtZutat[]) {
    this.http.post<GerichtZutat[]>('http://localhost:8080/api/v1/users/my/myZutaten', gerichtZutaten).subscribe(res => {});
  }
}
