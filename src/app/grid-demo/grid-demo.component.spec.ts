import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { GridDemoComponent } from './grid-demo.component';
import { RouterTestingModule } from '@angular/router/testing';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

describe('GridDemoComponent', () => {
  let component: GridDemoComponent;
  let fixture: ComponentFixture<GridDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    imports: [RouterTestingModule, GridDemoComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
