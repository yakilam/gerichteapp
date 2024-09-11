import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GerichtResponse } from '../../interfaces/gerichtResponse';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class addGerichtService {

  geladeneGerichte: GerichtResponse[] = [];
  isLoadedChanged: Subject<boolean> = new Subject<boolean>();
  uploadSuccess: Subject<boolean> = new Subject<boolean>();

  constructor(private http: HttpClient) { }

  pushGericht(gericht: GerichtResponse){
    console.log(gericht.zutaten);
    this.http.post('http://localhost:8080/api/v1/gerichte', gericht).subscribe(response => {
      this.uploadSuccess.next(true);
    });
  }

}
