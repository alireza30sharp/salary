import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationActionButtonsEditComponent } from './navigation-action-buttons-edit.component';

describe('NavigationActionButtonsEditComponent', () => {
  let component: NavigationActionButtonsEditComponent;
  let fixture: ComponentFixture<NavigationActionButtonsEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavigationActionButtonsEditComponent],
    });
    fixture = TestBed.createComponent(NavigationActionButtonsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
