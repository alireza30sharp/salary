import { Location } from "@angular/common";
import { Component, DestroyRef, OnInit } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { ActivatedRoute, Router } from "@angular/router";
import { finalize, of, switchMap } from "rxjs";
import { OrganizationUnitsDto } from "../../../../../app/base/models/organization-units.model";
import { OrganizationUnitsService } from "../../../../../app/base/services/organization-units.service";
import { ToastService } from "../../../../shared/services";
import { NgEventBus } from "../../../../shared/event/bus/ng-event-bus";
import { Events } from "../../../../shared/event/app.events";

@Component({
  templateUrl: "./organization-units-edit.component.html",
  styleUrls: ["./organization-units-edit.component.scss"],
  providers: [OrganizationUnitsService],
})
export class OrganizationUnitsEditComponent implements OnInit {
  isLoading?: boolean;
  isProgressing?: boolean;
  isEmpty?: boolean;
  model?: OrganizationUnitsDto;
  title?: string;
  readonly submitButtonId = "submit-button-organization-units";
  constructor(
    private readonly _organizationUnitsService: OrganizationUnitsService,
    private readonly _destroyRef: DestroyRef,
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _location: Location,
    private readonly _toastService: ToastService,
    private readonly _router: Router,
    private readonly _event: NgEventBus
  ) {}

  ngOnInit(): void {
    this._activatedRoute.params.subscribe((res) => {
      this._loadData(res.id);
      this._event.cast(Events.ExpandLetterDesignerTreeDocumentNode, res.id);
    });
  }

  submitHandler(data: OrganizationUnitsDto) {
    this.isProgressing = true;
    this._organizationUnitsService.update(data).subscribe((res) => {
      if (res) {
        this._toastService.success("ویرایش با موفقیت انجام شد");
        this._event.cast(Events.RefreshLetterDesignerTree);
      }
    });
  }

  cancelClickHandler() {
    this._location.back();
  }

  private _loadData(id: number) {
    this.isLoading = true;
    this.isEmpty = false;
    this._organizationUnitsService
      .getById(id)
      .pipe(
        takeUntilDestroyed(this._destroyRef),
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe({
        next: (res) => {
          this.title = "واحد سازمانی  " + res.data.name;
          this.model = res.data;
        },
        error: () => {
          this.isEmpty = true;
        },
      });
  }
}
