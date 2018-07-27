import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepesaComponent } from './depesa.component';

describe('DepesaComponent', () => {
  let component: DepesaComponent;
  let fixture: ComponentFixture<DepesaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepesaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepesaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
