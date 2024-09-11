import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerichteListComponent } from './gerichte-list.component';

describe('GerichteListComponent', () => {
  let component: GerichteListComponent;
  let fixture: ComponentFixture<GerichteListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GerichteListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GerichteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
