import { Component, DestroyRef, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { ToastService } from '@share/services/toast.service';
import { NavigationActionPackageService } from '@proxy/navigation-action-packages';
import { NavigationPackageDto } from '@proxy/dtos/navigation-action-package';
import { Paths } from '@share/utilities/paths';

@Component({
  templateUrl: './navigation-action-buttons-add.component.html',
  styleUrls: ['./navigation-action-buttons-add.component.scss'],
})
export class NavigationActionButtonsAddComponent implements OnInit {
  isProgressing?: boolean;
  readonly submitButtonId = 'navigation-submit-button-id';
  model?: NavigationPackageDto = {
    navigationActionPackage: null,
    hideForAdmin: false,
  };
  constructor(
    private readonly _location: Location,
    private readonly _toastService: ToastService,
    private readonly _router: Router,
    private readonly _navigationActionPackageService: NavigationActionPackageService
  ) {}

  ngOnInit(): void {}

  submitHandler(data: NavigationPackageDto) {
    debugger;
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
  listButtonClickHandler() {
    this._router.navigateByUrl(Paths.navigationActionButtons.list().url);
  }
  cancelClickHandler() {
    this._location.back();
  }
}
