import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderusercomumComponent } from './headerusercomum.component';

describe('HeaderusercomumComponent', () => {
  let component: HeaderusercomumComponent;
  let fixture: ComponentFixture<HeaderusercomumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderusercomumComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderusercomumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
