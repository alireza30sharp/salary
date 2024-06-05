import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationActionButtonsTreeComponent } from './navigation-action-buttons-tree.component';

describe('NavigationActionButtonsTreeComponent', () => {
  let component: NavigationActionButtonsTreeComponent;
  let fixture: ComponentFixture<NavigationActionButtonsTreeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavigationActionButtonsTreeComponent],
    });
    fixture = TestBed.createComponent(NavigationActionButtonsTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
