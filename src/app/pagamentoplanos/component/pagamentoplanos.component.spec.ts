import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagamentoplanosComponent } from './pagamentoplanos.component';

describe('PagamentoplanosComponent', () => {
  let component: PagamentoplanosComponent;
  let fixture: ComponentFixture<PagamentoplanosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagamentoplanosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PagamentoplanosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
