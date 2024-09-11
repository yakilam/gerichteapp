import { Component } from '@angular/core';
import { GerichteListComponent } from '../gerichte-list/gerichte-list.component';
import { GerichtResponse } from '../interfaces/gerichtResponse';
import { MyPlanService } from './services/my-plan.service';

@Component({
  selector: 'app-my-plan',
  standalone: true,
  imports: [
    GerichteListComponent
  ],
  templateUrl: './my-plan.component.html',
  styleUrl: './my-plan.component.scss'
})
export class MyPlanComponent {

  constructor(private myPlanService: MyPlanService) { }

  myPlan: GerichtResponse[] = [];

  ngOnInit(): void {
    this.myPlanService.geladenerPlan.subscribe(value => {
      this.myPlan = value;
    });
    this.myPlanService.getPlan();

  }
}
