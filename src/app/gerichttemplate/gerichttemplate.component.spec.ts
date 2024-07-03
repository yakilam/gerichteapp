import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerichttemplateComponent } from './gerichttemplate.component';

describe('GerichttemplateComponent', () => {
  let component: GerichttemplateComponent;
  let fixture: ComponentFixture<GerichttemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GerichttemplateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GerichttemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
