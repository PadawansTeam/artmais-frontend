import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssinanteComponent } from './assinante.component';

describe('AssinanteprimeComponent', () => {
  let component: AssinanteComponent;
  let fixture: ComponentFixture<AssinanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssinanteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssinanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
