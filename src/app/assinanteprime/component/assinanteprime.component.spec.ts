import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssinanteprimeComponent } from './assinanteprime.component';

describe('AssinanteprimeComponent', () => {
  let component: AssinanteprimeComponent;
  let fixture: ComponentFixture<AssinanteprimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssinanteprimeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssinanteprimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
