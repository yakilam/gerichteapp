import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GerichtResponse } from '../../interfaces/gerichtResponse';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GerichtService {

  meineGerichte: Subject<GerichtResponse[]> = new Subject<GerichtResponse[]>();
  alleGerichte: Subject<GerichtResponse[]> = new Subject<GerichtResponse[]>();
  isLoadedChanged: Subject<boolean> = new Subject<boolean>();
  uploadSuccess: Subject<boolean> = new Subject<boolean>();

  constructor(private http: HttpClient) { }

  pushGericht(gericht: GerichtResponse){
    this.http.post('http://localhost:8080/api/v1/gerichte', gericht).subscribe(response => {
      this.uploadSuccess.next(true);
    });
  }

  getMeineGerichte() {
    this.http.get<GerichtResponse[]>('http://localhost:8080/api/v1/gerichte/my/my').subscribe(res => {
      this.meineGerichte.next(res);
      });
  }

  getAlleGerichte() {
    this.http.get<GerichtResponse[]>('http://localhost:8080/api/v1/gerichte').subscribe(res => {
      this.alleGerichte.next(res);
      });
  }

  getImages(path: String): any {
    return this.http.get('http://localhost:8080/api/v1/gerichte/getPictures/123', { responseType: 'blob' }).subscribe(
    (res) => {
        return new Blob([res], { type: 'image/png' })
    });
  }

  ngOnInit(): void {
    this.http.get<GerichtResponse[]>('http://localhost:8080/api/v1/gerichte/tester1').subscribe(res => {
      
      });
  }

}
