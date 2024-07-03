import { ComponentFixture, TestBed } from '@angular/core/testing';
import {MatTabsModule} from '@angular/material/tabs';
import { GerichtComponent } from './gericht.component';

describe('GerichtComponent', () => {
  let component: GerichtComponent;
  let fixture: ComponentFixture<GerichtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GerichtComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GerichtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
