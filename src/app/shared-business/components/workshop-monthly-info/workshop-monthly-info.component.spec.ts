import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkshopMonthlyInfoComponent } from './workshop-monthly-info.component';

describe('WorkshopMonthlyInfoComponent', () => {
  let component: WorkshopMonthlyInfoComponent;
  let fixture: ComponentFixture<WorkshopMonthlyInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WorkshopMonthlyInfoComponent]
    });
    fixture = TestBed.createComponent(WorkshopMonthlyInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
