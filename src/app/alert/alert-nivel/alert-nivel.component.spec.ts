import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertNivelComponent } from './alert-nivel.component';

describe('AlertNivelComponent', () => {
  let component: AlertNivelComponent;
  let fixture: ComponentFixture<AlertNivelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertNivelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlertNivelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
