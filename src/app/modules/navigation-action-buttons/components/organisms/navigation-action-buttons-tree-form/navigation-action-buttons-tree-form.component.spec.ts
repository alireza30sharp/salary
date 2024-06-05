import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationActionButtonsFormComponent } from './navigation-action-buttons-form.component';

describe('NavigationActionButtonsFormComponent', () => {
  let component: NavigationActionButtonsFormComponent;
  let fixture: ComponentFixture<NavigationActionButtonsFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavigationActionButtonsFormComponent],
    });
    fixture = TestBed.createComponent(NavigationActionButtonsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
