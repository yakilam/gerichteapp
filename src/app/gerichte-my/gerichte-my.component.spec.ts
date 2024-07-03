import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerichteMyComponent } from './gerichte-my.component';

describe('GerichteMyComponent', () => {
  let component: GerichteMyComponent;
  let fixture: ComponentFixture<GerichteMyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GerichteMyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GerichteMyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
