import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGerichtComponent } from './add-gericht.component';

describe('AddGerichtComponent', () => {
  let component: AddGerichtComponent;
  let fixture: ComponentFixture<AddGerichtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddGerichtComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddGerichtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
