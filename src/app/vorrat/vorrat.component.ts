import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { VorratService } from './services/vorrat.service';
import { GerichtZutat } from '../interfaces/gerichtZutat';
import { MatTableModule } from '@angular/material/table';
import { FormBuilder, FormGroup, FormControl, Validators, ReactiveFormsModule ,  FormsModule} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-vorrat',
  standalone: true,
  imports: [
    MatSidenavModule,
    MatTableModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    NgIf
  ],
  templateUrl: './vorrat.component.html',
  styleUrl: './vorrat.component.scss'
})
export class VorratComponent {

  constructor(private fb: FormBuilder, private vorratService: VorratService) { }

  geladeneZutaten: GerichtZutat[] = [];
  zutatForm!: FormGroup;
  zutatFormRemove!: FormGroup;
  neueZutat!: GerichtZutat;

  ngOnInit(): void{
    this.vorratService.loadedIngredients.subscribe(value => {
        this.geladeneZutaten = value;
    });

    this.zutatForm = this.fb.group({ 
      name:  new FormControl('',Validators.required), 
      menge:  new FormControl('',Validators.required), 
      einheit: new FormControl('',Validators.required)
    });

    this.zutatFormRemove = this.fb.group({ 
      name:  new FormControl('',Validators.required), 
      menge:  new FormControl('',Validators.required), 
      einheit: new FormControl('',Validators.required)
    });

    this.vorratService.getMeineZutaten();

  }

  addZutat(){
    this.neueZutat = this.zutatForm.value;
    if(this.zutatForm.valid && this.neueZutat.menge > 0){
      this.addZutatToZutaten(this.neueZutat);
      this.vorratService.updateZutaten(this.geladeneZutaten);
    }
  }

  removeZutat(){
    this.neueZutat = this.zutatFormRemove.value;
    if(this.zutatFormRemove.valid && this.neueZutat.menge > 0){
      this.removeZutatFromZutaten(this.neueZutat);
      this.vorratService.updateZutaten(this.geladeneZutaten);
    }
  }

  addZutatToZutaten(gerichtZutat: GerichtZutat){
    let isPresent: boolean = false;
    this.geladeneZutaten.forEach(zutat => {
      if( zutat.name.toLowerCase() == gerichtZutat.name.toLowerCase() &&
          zutat.einheit == gerichtZutat.einheit){
        zutat.menge = zutat.menge + gerichtZutat.menge;
        isPresent = true;
      }
    });
    if(isPresent == false){
      this.geladeneZutaten.push(gerichtZutat);
    }
  }

  removeZutatFromZutaten(gerichtZutat: GerichtZutat){
    this.geladeneZutaten.forEach((zutat, index) => {
      if( zutat.name.toLowerCase() == gerichtZutat.name.toLowerCase() &&
          zutat.einheit == gerichtZutat.einheit){
        zutat.menge = zutat.menge - gerichtZutat.menge;
        if(zutat.menge <= 0){
          this.geladeneZutaten.splice(index, 1);
        }
      }
    });
  }

  saveIngredients(){
    this.vorratService.updateZutaten(this.geladeneZutaten.filter(item => item.menge > 0));
  }
}
