import { Injectable } from '@angular/core';
import { GerichtZutat } from '../../interfaces/gerichtZutat';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PlanRequest } from '../planRequest';
import { GerichtResponse } from '../../interfaces/gerichtResponse';

@Injectable({
  providedIn: 'root'
})
export class PlanService {

  constructor(private http: HttpClient) { }

  geladeneZutaten: Subject<GerichtZutat[]> = new Subject<GerichtZutat[]>();
  geladenerPlan: Subject<GerichtResponse[]> = new Subject<GerichtResponse[]>();

  getMeineZutaten() {
    this.http.get<GerichtZutat[]>('http://localhost:8080/api/v1/users/my/myZutaten').subscribe(res => {
      this.geladeneZutaten.next(res);
      });
  }

  createPlan(planRequest: PlanRequest) {
    this.http.post<GerichtResponse[]>('http://localhost:8080/api/v1/gerichte/my/myPlan', planRequest).subscribe(res => {
      this.geladenerPlan.next(res);
    });
  }
}
