import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { VorratService } from './services/vorrat.service';
import { GerichtZutat } from '../gerichte-my/gerichtZutat';
import { MatTableModule } from '@angular/material/table';
import { FormBuilder, FormGroup, FormControl, Validators, ReactiveFormsModule} from '@angular/forms';
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
    NgIf
  ],
  templateUrl: './vorrat.component.html',
  styleUrl: './vorrat.component.scss'
})
export class VorratComponent {

  constructor(private fb: FormBuilder, private vorratService: VorratService) { }

  geladeneZutaten: GerichtZutat[] = [];
  geladeneZutaten2: GerichtZutat[] = [];
  zutatForm!: FormGroup;
  zutatFormRemove!: FormGroup;
  neueZutat!: GerichtZutat;

  ngOnInit(): void{
    this.vorratService.isLoadedChanged.subscribe(value => {
      if(value == true){
        this.geladeneZutaten = this.vorratService.geladeneZutaten;
      } 
    });
    this.vorratService.isLoadedChanged2.subscribe(value => {
      
        this.geladeneZutaten2 = value;
        console.log(this.geladeneZutaten2);
      
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
}
