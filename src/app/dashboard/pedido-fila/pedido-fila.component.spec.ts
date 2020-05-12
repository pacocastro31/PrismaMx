import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoFilaComponent } from './pedido-fila.component';

describe('PedidoFilaComponent', () => {
  let component: PedidoFilaComponent;
  let fixture: ComponentFixture<PedidoFilaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PedidoFilaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidoFilaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
