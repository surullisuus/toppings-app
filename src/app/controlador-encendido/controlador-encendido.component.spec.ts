import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControladorEncendidoComponent } from './controlador-encendido.component';

describe('ControladorEncendidoComponent', () => {
  let component: ControladorEncendidoComponent;
  let fixture: ComponentFixture<ControladorEncendidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ControladorEncendidoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ControladorEncendidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
