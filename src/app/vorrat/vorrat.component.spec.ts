import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VorratComponent } from './vorrat.component';

describe('VorratComponent', () => {
  let component: VorratComponent;
  let fixture: ComponentFixture<VorratComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VorratComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VorratComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
