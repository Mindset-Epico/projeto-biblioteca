import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivroDetalheComponent } from './livro-detalhe.component';

describe('LivroDetalheComponent', () => {
  let component: LivroDetalheComponent;
  let fixture: ComponentFixture<LivroDetalheComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LivroDetalheComponent]
    });
    fixture = TestBed.createComponent(LivroDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
