import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationActionButtonsListComponent } from './navigation-action-buttons-list.component';

describe('NavigationActionButtonsListComponent', () => {
  let component: NavigationActionButtonsListComponent;
  let fixture: ComponentFixture<NavigationActionButtonsListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavigationActionButtonsListComponent],
    });
    fixture = TestBed.createComponent(NavigationActionButtonsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
