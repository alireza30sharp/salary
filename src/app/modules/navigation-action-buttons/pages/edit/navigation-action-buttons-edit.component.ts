import { Component, DestroyRef, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from '@share/services/toast.service';
import { NavigationActionPackageService } from '@proxy/navigation-action-packages';
import { NavigationPackageDto } from '@proxy/dtos/navigation-action-package';
import { Paths } from '@share/utilities/paths';
import { NavigationActionService } from '@proxy/entity-types';
import { NavigationActionNode } from '@proxy/dtos/navigation-actions';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs';
import { GeneralActionType } from '@share/types/general-action.type';
import { LocalizationService } from '@abp/ng.core';

@Component({
  templateUrl: './navigation-action-buttons-edit.component.html',
  styleUrls: ['./navigation-action-buttons-edit.component.scss'],
})
export class NavigationActionButtonsEditComponent implements OnInit {
  isProgressing?: boolean;
  showLoadingForm?: boolean;
  readonly submitButtonId = 'navigation-submit-button-id';
  showInactive: boolean = false;
  navigationActionPackageID: number = 0;
  model?: NavigationPackageDto = {
    navigationActionPackage: null,
    hideForAdmin: null,
  };
  isLoadingTree?: boolean = false;
  listNodeDto: NavigationActionNode[];
  items: GeneralActionType[] = [
    {
      text: this._localizationService.instant('::Add_Button'),
      click: (event, arg) => {},
    },
  ];
  itemsChild: GeneralActionType[] = [
    {
      text: this._localizationService.instant('::EDIT'),
      click: (event, args) => {},
    },
    {
      text: this._localizationService.instant('::Remove'),
      click: (event, arg) => {},
    },

    {
      text: this._localizationService.instant('::Add_Button'),
      click: (event, arg) => {},
    },
  ];
  constructor(
    private readonly _location: Location,
    private readonly _toastService: ToastService,
    private readonly _router: Router,
    private readonly _localizationService: LocalizationService,

    private readonly _activatedRoute: ActivatedRoute,
    private readonly _navigationActionPackageService: NavigationActionPackageService,
    private readonly _navigationActionService: NavigationActionService,
    private readonly _destroyRef: DestroyRef
  ) {}

  ngOnInit(): void {
    this.navigationActionPackageID = this._activatedRoute.snapshot.params['id'];
    this.getByNavigationActionPackageID();
    this._getTreeViewData();
  }
  listButtonClickHandler() {
    this._router.navigateByUrl(Paths.navigationActionButtons.list().url);
  }
  private _getTreeViewData() {
    this.isLoadingTree = true;
    this._navigationActionService
      .getNavigationActionNodesByNavigationActionPackageId(this.navigationActionPackageID)
      .pipe(
        takeUntilDestroyed(this._destroyRef),
        finalize(() => {
          this.isLoadingTree = false;
        })
      )
      .subscribe(res => {
        this.listNodeDto = res;
      });
  }
  getByNavigationActionPackageID() {
    this.showLoadingForm = true;
    this._navigationActionPackageService
      .get(this.navigationActionPackageID, this.showInactive)
      .subscribe({
        next: res => {
          if (res) {
            this.model = res;
          }
        },
        complete: () => {
          this.showLoadingForm = false;
        },
      });
  }
  submitHandler(data: NavigationPackageDto) {
    this.isProgressing = true;
    this._navigationActionPackageService.save(data).subscribe({
      next: res => {
        if (res) {
          this._toastService.success('::Navigation_Action_Buttons_Saved'); // TODO: add translation
          this._router.navigateByUrl(Paths.navigationActionButtons.list().url);
        }
      },
    });
  }

  cancelClickHandler() {
    this._location.back();
  }
}
