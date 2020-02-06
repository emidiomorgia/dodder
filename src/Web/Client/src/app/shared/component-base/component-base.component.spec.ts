import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentBaseComponent } from './component-base.component';

describe('ComponentBaseComponent', () => {
  let component: ComponentBaseComponent;
  let fixture: ComponentFixture<ComponentBaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponentBaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
