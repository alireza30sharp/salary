import { Component, DestroyRef, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { ActivatedRoute, Router } from "@angular/router";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { finalize } from "rxjs";
import { ModalService, ToastService } from "./../../../../../shared/services";
import { GeneralActionType } from "../../../../../shared/types/general-action.type";
import { ConfirmInterFace } from "./../../../../../shared/ki-components/ki-confirmation/confirm.interface";
import { OrganizationUnitsService } from "../../../../../../app/salary/services/organization-units.service";
import {
  OrganizationUnitsDto,
  OrganizationUnitsModel,
} from "../../../../../../app/salary/models/organization-units.model";
import { Paths } from "./../../../../../shared/utilities/paths";
import { NgEventBus } from "../../../../../shared/event/bus/ng-event-bus";
import { Events } from "../../../../../shared/event/app.events";
@Component({
  templateUrl: "./organization-units-tree.component.html",
  styleUrls: ["./organization-units-tree.component.scss"],
  providers: [OrganizationUnitsService],
})
export class OrganizationUnitsTreeComponent implements OnInit {
  isProgressing?: boolean;
  showLoadingForm?: boolean;
  readonly submitButtonId = "navigation-submit-button-id";
  showInactive: boolean = false;
  clearFormTree: boolean = false;
  model = new OrganizationUnitsDto();
  isModeEdit?: boolean = false;
  isLoadingTree?: boolean = false;
  reloadNodeId = null;
  listNodeDto = new Array<OrganizationUnitsDto>();
  appliedTreeExpandedNode?: OrganizationUnitsDto["id"];
  currentDocumentIdShouldBeExpand?: OrganizationUnitsDto["id"];
  title?: string = "واحد سازمانی";
  items: GeneralActionType[] = [
    {
      text: "اضافه",
      click: (event, arg) => {
        this._router.navigateByUrl(
          Paths.organizationUnits.add(arg.data.id).url
        );
      },
    },
  ];
  itemsChild: GeneralActionType[] = [
    {
      text: "حذف",
      click: (event, arg) => {
        this._confirmRemoveActionTree(arg.data, arg.data.name);
      },
    },
    {
      text: "اضافه",
      click: (event, arg) => {
        this._router.navigateByUrl(
          Paths.organizationUnits.add(arg.data.id).url
        );
      },
    },
    {
      text: "ویرایش",
      click: (event, arg) => {
        this._router.navigateByUrl(
          Paths.organizationUnits.edit(arg.data.id).url
        );
      },
    },
  ];
  constructor(
    private readonly _location: Location,
    private readonly _toastService: ToastService,
    private readonly _router: Router,
    private readonly _event: NgEventBus,
    private _modalService: ModalService,
    private readonly _destroyRef: DestroyRef,
    private _organizationUnitsService: OrganizationUnitsService
  ) {}

  ngOnInit(): void {
    this._getTreeViewData();
    this._event
      .on(Events.ExpandLetterDesignerTreeDocumentNode)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe((args) => {
        this.currentDocumentIdShouldBeExpand = args.data;
        this._expandTree();
      });

    this._event
      .on(Events.RefreshLetterDesignerTree)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(() => {
        this.appliedTreeExpandedNode = null;
        this._getTreeViewData(true);
      });
  }
  removeActionTree(data) {
    this._confirmRemoveActionTree(data, data.name);
  }
  editActionTree(data) {
    this._router.navigateByUrl(Paths.organizationUnits.edit(data.id).url);
  }
  addActionTree(data) {
    this._router.navigateByUrl(Paths.organizationUnits.add(data.id).url);
  }
  private _expandTree() {
    if (!this.listNodeDto) return;
    this.appliedTreeExpandedNode = null;
    let item: OrganizationUnitsDto | null = null;
    if (this.currentDocumentIdShouldBeExpand) {
      item = this.listNodeDto?.find(
        (x) => x.id == this.currentDocumentIdShouldBeExpand
      );
    }
    // TODO: add other node type find by id
    if (item) {
      setTimeout(() => {
        this.appliedTreeExpandedNode = item.id;
      }, 0);
    }
  }
  private _getTreeViewData(isRefresh?: boolean) {
    if (!isRefresh) {
      this.isLoadingTree = true;
    }
    this._organizationUnitsService
      .getAllOrganizationUnits()
      .pipe(
        takeUntilDestroyed(this._destroyRef),
        finalize(() => {
          this.isLoadingTree = false;
        })
      )
      .subscribe((res) => {
        this.listNodeDto = res.data.data;
        this._expandTree();
      });
  }

  private _confirmRemoveActionTree(data: any, actionflow: string) {
    const params: ConfirmInterFace = {
      acceptText: "بله",
      declineText: "خیر",
      description: "آیا از عملیات مورد نظر اطمینان دارید؟",
      title: "حذف" + " " + `"${actionflow.toUpperCase()}"`,
      type: "Confirm",
    };

    this._modalService.showConfirm(params, false).then((res) => {
      if (res) {
        this._removeNavigationAction(data);
      }
    });
  }
  private _removeNavigationAction(data: any) {
    let model: OrganizationUnitsModel = {
      id: data.id,
      parentId: data.parentId,
      workShopId: 0,
    };
    this._organizationUnitsService.delete(model).subscribe({
      next: () => {
        this._toastService.success("حذف با موفقیت انجام شد");
        const findedIndex = this.listNodeDto.findIndex((x) => x.id == data.id);
        if (findedIndex != -1) {
          this.listNodeDto.splice(findedIndex, 1);
        }
        this.reloadNodeId = data.id;
      },
    });
  }
  menuClickHandler(event: Event) {
    event.stopPropagation();
  }

  selectNodeDropdown(event, data) {
    if (data.id != null) {
      event.stopImmediatePropagation();
      //this.getNavigationActionForEditByNavigation(data.id);
    }
  }

  cancelClickHandler() {
    this._location.back();
  }
}
