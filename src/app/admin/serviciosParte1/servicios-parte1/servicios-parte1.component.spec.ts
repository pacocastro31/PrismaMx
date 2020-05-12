import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiciosParte1Component } from './servicios-parte1.component';

describe('ServiciosParte1Component', () => {
  let component: ServiciosParte1Component;
  let fixture: ComponentFixture<ServiciosParte1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiciosParte1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiciosParte1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
