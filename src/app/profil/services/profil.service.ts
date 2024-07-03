import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { user } from '../user';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfilService {

  constructor(private http: HttpClient) { }

  user!: user;
  meineGerichteAnzahl!: number;
  hasUserLoaded: Subject<boolean> = new Subject<boolean>();
  finishedCount: Subject<boolean> = new Subject<boolean>();

  getInfos(){
    this.http.get<user>('http://localhost:8080/api/v1/users/my/my').subscribe(res => {
      this.user = res;
      this.hasUserLoaded.next(true);
    });

    this.http.get<number>('http://localhost:8080/api/v1/gerichte/my/myCount').subscribe(res => {
      this.meineGerichteAnzahl = res;
      this.finishedCount.next(true);
    });


  }

}
