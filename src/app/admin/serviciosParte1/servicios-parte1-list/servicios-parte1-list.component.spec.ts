import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiciosParte1ListComponent } from './servicios-parte1-list.component';

describe('ServiciosParte1ListComponent', () => {
  let component: ServiciosParte1ListComponent;
  let fixture: ComponentFixture<ServiciosParte1ListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiciosParte1ListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiciosParte1ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
