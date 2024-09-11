import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar'; 
import { RouterLink, RouterOutlet } from '@angular/router';
import { NgFor, NgIf, NgStyle } from '@angular/common';
import { GerichtResponse } from '../interfaces/gerichtResponse';
import { MatDialog, MatDialogModule} from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { ImageSliderComponent } from '../util/image-slider/image-slider.component';
import { MatButtonModule } from '@angular/material/button';
import { GerichteListService } from './services/gerichte-list.service';
import { GerichtZutat } from '../interfaces/gerichtZutat';



@Component({
  selector: 'app-gerichte-list',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
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
  templateUrl: './gerichte-list.component.html',
  styleUrl: './gerichte-list.component.scss'
})
export class GerichteListComponent {

  @Input() geladeneGerichte: GerichtResponse[] = [];
  @Input() settings?: string| null;

  constructor(private gerichtListService: GerichteListService) { }

  readonly dialog = inject(MatDialog);
  gewaehltesGericht?: GerichtResponse | null;
  images: String[] = [];
  index: number = -1;
  isVisible: boolean = false;
  zutatenVorrat: GerichtZutat[] = [];
  fehlendeZutaten: GerichtZutat[] = [];

  ngOnInit(): void {
    this.gerichtListService.neugeladeneGerichte.subscribe(value => {
      this.geladeneGerichte = value;
    });

    if(this.settings?.includes("myPlan")){
      this.isVisible = true;
      this.gerichtListService.zutaten.subscribe(value => {
        this.zutatenVorrat = value;
      });
      this.gerichtListService.getZutaten();
    }
  }

  changeChoice(i: number){
    this.gewaehltesGericht = this.geladeneGerichte[i];
    this.images= [];
    this.images = this.gewaehltesGericht?.images;
    this.index= i;
    if(this.isVisible){
      this.berechneFehlendeZutaten();
    }
  }

  deleteGericht(){
    if(this.settings?.includes("Gerichte")){
      if(this.index != -1 && this.geladeneGerichte.length > 1 && this.gewaehltesGericht){
        this.geladeneGerichte = this.geladeneGerichte.filter(value => value.id != this.gewaehltesGericht?.id);
        this.gerichtListService.deleteGericht(this.gewaehltesGericht);
        this.changeChoice(0);
      }
    }
    else if(this.settings == "myPlan" && this.gewaehltesGericht){
      this.geladeneGerichte = this.geladeneGerichte.filter(value => value.id != this.gewaehltesGericht?.id);
      this.gerichtListService.updateUserPlan(this.geladeneGerichte);
      this.changeChoice(0);
    }
    else if(this.settings == "createPlan" && this.gewaehltesGericht){
      this.geladeneGerichte = this.geladeneGerichte.filter(value => value.id != this.gewaehltesGericht?.id);
      this.changeChoice(0);
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogContentDialog);
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.deleteGericht();
      }
    });
  }

  addGericht(){
    if(this.settings?.includes("Gerichte") && this.gewaehltesGericht){
      this.gerichtListService.addToUserPlan(this.gewaehltesGericht);
    }
    else {
      this.gerichtListService.updateUserPlan(this.geladeneGerichte);
    }
  }

  reload(){
    if(this.settings == "alleGerichte"){
      this.gerichtListService.getAlleGerichte();
    } else if(this.settings == "meineGerichte"){
      this.gerichtListService.getMeineGerichte();
    } else if(this.settings == "myPlan"){
      this.gerichtListService.getUserPlan();
    }
  }

  gerichtDone(){
    const dialogRef = this.dialog.open(DialogContentDialog);
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.deleteGericht();

      }
    });
    if(this.gewaehltesGericht){
      this.zutatenVorrat = this.removeZutatenFromList(this.zutatenVorrat, this.gewaehltesGericht.zutaten);
    }
  }

  berechneFehlendeZutaten(){
    if(this.gewaehltesGericht){
      this.fehlendeZutaten = structuredClone(this.gewaehltesGericht.zutaten);
      this.fehlendeZutaten = this.removeZutatenFromList(this.fehlendeZutaten, this.zutatenVorrat);
    }
  }

  removeZutatenFromList(removeFrom: GerichtZutat[], toRemove: GerichtZutat[]){
    removeFrom.forEach(item => {
      toRemove.forEach(value => {
        if(item.name.toLowerCase() === value.name.toLowerCase()){
          item.menge = item.menge - value.menge;
        }
      })
    });
    return removeFrom.filter(value => value.menge > 0);
  }

}

@Component({
  selector: 'dialog-content',
  templateUrl: 'dialog-content.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogContentDialog {}
