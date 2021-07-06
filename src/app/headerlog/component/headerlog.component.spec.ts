import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderlogComponent } from './headerlog.component';

describe('HeaderlogComponent', () => {
  let component: HeaderlogComponent;
  let fixture: ComponentFixture<HeaderlogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderlogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
