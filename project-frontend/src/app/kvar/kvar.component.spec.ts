import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KvarComponent } from './kvar.component';

describe('KvarComponent', () => {
  let component: KvarComponent;
  let fixture: ComponentFixture<KvarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KvarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KvarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
