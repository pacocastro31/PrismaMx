import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiciosParte1DetailComponent } from './servicios-parte1-detail.component';

describe('ServiciosParte1DetailComponent', () => {
  let component: ServiciosParte1DetailComponent;
  let fixture: ComponentFixture<ServiciosParte1DetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiciosParte1DetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiciosParte1DetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
