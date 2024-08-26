import { Component } from '@angular/core';
import { GerichtZutat } from '../gerichte-my/gerichtZutat';
import { PlanService } from './services/plan.service';
import { PlanRequest } from './planRequest';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgFor } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-plan',
  standalone: true,
  imports: [
    MatButtonModule,
    MatInputModule,
    NgFor,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatFormFieldModule],
  templateUrl: './plan.component.html',
  styleUrl: './plan.component.scss'
})
export class PlanComponent {

  constructor(private planService: PlanService, private fb: FormBuilder, private snackBar: MatSnackBar) { }

  geladeneZutaten: GerichtZutat[] = [];
  planRequest2!: PlanRequest;
  zutatenForm!: FormGroup;

  ngOnInit(): void{
    this.planService.geladeneZutaten.subscribe(value => {
      this.geladeneZutaten = value;
      this.createZutatenForm();
    });

    this.zutatenForm = this.fb.group({
      days: new FormControl('',Validators.required),
      zutaten: this.fb.array(this.geladeneZutaten.map(() => new FormControl(false)))
     });

    this.planService.getMeineZutaten();
  }

  createPlan(){
    if(this.zutatenForm.valid) {
      const checkedZutaten = this.zutatenForm.value.zutaten
      .map((checked: boolean, index: number) => checked ? this.geladeneZutaten[index] : null)
      .filter((zutat: any) => zutat !== null);
      let planRequest: PlanRequest = {
        days: this.zutatenForm.get('days')?.value,
        zutaten: checkedZutaten
      }
      this.planService.createPlan(planRequest);
      console.log(planRequest);
      var divToShow = document.getElementById('plan');
      divToShow?.classList.remove('hidden');
    } else {
        this.snackBar.open("Anzahl der Tage vergessen?", "OK", {
          duration: 3000
        });
      }
  }

  getZutaten(){
    return this.zutatenForm.get('zutaten') as FormArray;
  }

  createZutatenForm(){
    this.zutatenForm = this.fb.group({
      days: new FormControl('',Validators.required),
      zutaten: this.fb.array(this.geladeneZutaten.map(() => new FormControl(false)))
    });
  }


}
