import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InteresseComponent } from './interesse.component';

describe('InteresseComponent', () => {
  let component: InteresseComponent;
  let fixture: ComponentFixture<InteresseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InteresseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InteresseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
