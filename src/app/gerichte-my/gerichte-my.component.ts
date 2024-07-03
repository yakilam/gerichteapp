import { Component, Input } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar'; 
import { RouterLink, RouterOutlet } from '@angular/router';
import { NgFor, NgIf, NgStyle } from '@angular/common';
import { GerichtResponse } from './gerichtResponse';
import { GerichteMyService } from './services/gerichte-my.service';
import { Subject } from 'rxjs';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { ImageSliderComponent } from '../util/image-slider/image-slider.component';



@Component({
  selector: 'app-gerichte-my',
  standalone: true,
  imports: [
    MatSidenavModule,
    MatGridListModule,
    MatTableModule,
    MatCardModule,
    MatListModule,
    MatToolbarModule,
    RouterOutlet,
    RouterLink,
    NgFor,
    NgIf,
    NgStyle,
    ImageSliderComponent
  ],
  templateUrl: './gerichte-my.component.html',
  styleUrl: './gerichte-my.component.scss'
})
export class GerichteMyComponent {

  @Input() startVariable!: string;

  constructor(private gerichteMyService: GerichteMyService) { }

  geladeneGerichte: GerichtResponse[] = [];
  choiceChanged: Subject<boolean> = new Subject<boolean>();
  gewaehltesGericht: GerichtResponse | undefined;
  images: String[] = [];
  image!: any;

  ngOnInit(): void {
    this.gerichteMyService.isLoadedChanged.subscribe(value => {
      if(value == true){
        this.geladeneGerichte = this.gerichteMyService.geladeneGerichte;
      } 
    });

    if(this.startVariable === "meine"){
      this.gerichteMyService.getMeineGerichte();
    }else if(this.startVariable === "alle"){
      this.gerichteMyService.getAlleGerichte();
    }
  }

  changeChoice(i: number){
    this.gewaehltesGericht = this.geladeneGerichte[i];
    this.images= [];
    this.images = this.gewaehltesGericht.images;
    this.choiceChanged.next(true);
  }

}
