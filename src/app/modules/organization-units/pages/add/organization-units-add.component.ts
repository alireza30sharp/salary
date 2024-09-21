import { Location } from "@angular/common";
import { Component, DestroyRef, OnInit } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { ActivatedRoute, Router } from "@angular/router";
import { finalize, of, switchMap } from "rxjs";
import { OrganizationUnitsDto } from "../../../../salary/models/organization-units.model";
import { OrganizationUnitsService } from "../../../../salary/services/organization-units.service";
import { ToastService } from "../../../../shared/services";
import { NgEventBus } from "../../../../shared/event/bus/ng-event-bus";
import { Events } from "../../../../shared/event/app.events";

@Component({
  templateUrl: "./organization-units-add.component.html",
  styleUrls: ["./organization-units-add.component.scss"],
  providers: [OrganizationUnitsService],
})
export class OrganizationUnitsAddComponent implements OnInit {
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
      this.model = new OrganizationUnitsDto();
      this.model.parentId = res.parentId;
      this._loadData(res.parentId);
      this._event.cast(
        Events.ExpandLetterDesignerTreeDocumentNode,
        res.parentId
      );
    });
  }

  submitHandler(data: OrganizationUnitsDto) {
    this.isProgressing = true;
    this._organizationUnitsService
      .create(data)
      .pipe(
        finalize(() => {
          this.isProgressing = false;
        })
      )
      .subscribe((res) => {
        if (res) {
          this._toastService.success("عملیات مورد نظر با موفقیت انجام شد");
          this._event.cast(Events.RefreshLetterDesignerTree);
        }
      });
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
        },
        error: () => {
          this.isEmpty = true;
        },
      });
  }
  cancelClickHandler() {
    this._location.back();
  }
}
