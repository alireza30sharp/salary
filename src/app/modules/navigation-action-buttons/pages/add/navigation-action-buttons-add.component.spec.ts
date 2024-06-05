import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationActionButtonsAddComponent } from './navigation-action-buttons-add.component';

describe('NavigationActionButtonsAddComponent', () => {
  let component: NavigationActionButtonsAddComponent;
  let fixture: ComponentFixture<NavigationActionButtonsAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavigationActionButtonsAddComponent],
    });
    fixture = TestBed.createComponent(NavigationActionButtonsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
