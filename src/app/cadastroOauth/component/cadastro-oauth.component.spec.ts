import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroOAuthComponent } from './cadastro-oauth.component';

describe('CadastroComponent', () => {
  let component: CadastroOAuthComponent;
  let fixture: ComponentFixture<CadastroOAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CadastroOAuthComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroOAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
