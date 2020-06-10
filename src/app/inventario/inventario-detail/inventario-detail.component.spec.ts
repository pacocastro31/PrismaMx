import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventarioDetailComponent } from './inventario-detail.component';

describe('InventarioDetailComponent', () => {
  let component: InventarioDetailComponent;
  let fixture: ComponentFixture<InventarioDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventarioDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventarioDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
