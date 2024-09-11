import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { GerichteListComponent } from '../gerichte-list/gerichte-list.component';
import { AddGerichtComponent } from '../add-gericht/add-gericht.component';
import { GerichtService } from './services/gericht.service';
import { GerichtResponse } from '../interfaces/gerichtResponse';

@Component({
  selector: 'app-gericht',
  standalone: true,
  imports: [
    MatTabsModule,
    GerichteListComponent,
    AddGerichtComponent
  ],
  templateUrl: './gericht.component.html',
  styleUrl: './gericht.component.scss'
})
export class GerichtComponent {
  constructor(private gerichtService: GerichtService) { }

  meineGerichte: GerichtResponse[] = [];
  alleGerichte: GerichtResponse[] = [];

  ngOnInit(): void {
    this.gerichtService.meineGerichte.subscribe(value => {
      this.meineGerichte = value;
    });

    this.gerichtService.alleGerichte.subscribe(value => {
      this.alleGerichte = value;
    });

    this.gerichtService.getMeineGerichte();
    this.gerichtService.getAlleGerichte();
  }
}
