import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GerichtResponse } from '../../interfaces/gerichtResponse';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyPlanService {

  constructor(private http: HttpClient) { }

  geladenerPlan: Subject<GerichtResponse[]> = new Subject<GerichtResponse[]>();

  getPlan() {
    this.http.get<GerichtResponse[]>('http://localhost:8080/api/v1/users/my/myPlan').subscribe(res => {
      this.geladenerPlan.next(res);
    });
  }
}
