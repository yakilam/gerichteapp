import { Component } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import { GerichteMyComponent } from '../gerichte-my/gerichte-my.component';
import { AddGerichtComponent } from '../add-gericht/add-gericht.component';

@Component({
  selector: 'app-gericht',
  standalone: true,
  imports: [
    MatTabsModule,
    GerichteMyComponent,
    AddGerichtComponent
  ],
  templateUrl: './gericht.component.html',
  styleUrl: './gericht.component.scss'
})
export class GerichtComponent {

}
