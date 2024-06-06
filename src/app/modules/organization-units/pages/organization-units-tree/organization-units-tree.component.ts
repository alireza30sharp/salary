import { Component, DestroyRef, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { ActivatedRoute, Router } from "@angular/router";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { finalize } from "rxjs";
import { ModalService, ToastService } from "../../../../shared/services";
import { GeneralActionType } from "../../../../shared/types/general-action.type";
import { ConfirmInterFace } from "../../../../shared/ki-components/ki-confirmation/confirm.interface";
import { OrganizationUnitsService } from "../../../../../app/base/services/organization-units.service";
import { OrganizationUnitsDto } from "../../../../../app/base/models/organization-units.model";

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
  model?: any = {
    navigationActionPackage: null,
    hideForAdmin: null,
  };
  modelTreeForm?: any = {};
  isModeEdit?: boolean = false;
  isLoadingTree?: boolean = false;
  reloadNodeId = null;
  listNodeDto: any;
  selectNode: any;
  title?: string = "OrganizationUnits";
  items: GeneralActionType[] = [
    {
      text: "Add_Button",
      click: (event, arg) => {
        this.clearFormTree = Object.assign(false, true);
        this.modelTreeForm = {};
        this.isModeEdit = Object.assign(false, false);
        this.modelTreeForm.parent_NavigationActionID = arg.data.id;

        this.selectNode = arg.data;
      },
    },
  ];
  itemsChild: GeneralActionType[] = [
    {
      text: "Remove",
      click: (event, arg) => {
        this._confirmRemoveActionTree(arg.data.id, arg.data.name);
      },
    },

    {
      text: "Add_Button",
      click: (event, arg) => {
        this.clearFormTree = Object.assign(false, true);
        this.isModeEdit = Object.assign(false, false);
        this.modelTreeForm = {};
        this.modelTreeForm.parent_NavigationActionID = arg.data.id;
        this.selectNode = arg.data;
      },
    },
  ];
  constructor(
    private readonly _location: Location,
    private readonly _toastService: ToastService,
    private readonly _router: Router,
    private _modalService: ModalService,
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _destroyRef: DestroyRef,
    private _organizationUnitsService: OrganizationUnitsService
  ) {}

  ngOnInit(): void {
    debugger;
    this._getTreeViewData();
  }

  private _getTreeViewData() {
    this.isLoadingTree = true;
    this._organizationUnitsService
      .getAllOrganizationUnits()
      .pipe(
        takeUntilDestroyed(this._destroyRef),
        finalize(() => {
          this.isLoadingTree = false;
        })
      )
      .subscribe((res) => {
        debugger;
        this.listNodeDto = res.data.data;
      });
  }
  listButtonClickHandler() {
    // this._router.navigateByUrl(Paths.navigationActionButtons.list().url);
  }

  private _confirmRemoveActionTree(
    navigationActionID: number,
    actionflow: string
  ) {
    const params: ConfirmInterFace = {
      acceptText: "YES",
      declineText: "NO",
      description: "DELETE_COINFIRM",
      title: "Remove" + " " + `"${actionflow.toUpperCase()}"`,
      type: "Confirm",
    };

    this._modalService.showConfirm(params, false).then((res) => {
      if (res) {
        this._removeNavigationAction(navigationActionID);
      }
    });
  }
  private _removeNavigationAction(navigationActionID: number) {
    // this._navigationActionService
    //   .deactivateByNavigationActionId(navigationActionID)
    //   .subscribe({
    //     next: () => {
    //       this._toastService.success(
    //         "Navigation_Action_Package_Removed_Successfully"
    //       );
    //       this.removeNavigationTree(navigationActionID, this.listNodeDto);
    //       this.reloadNodeId = navigationActionID;
    //     },
    //   });
  }
  menuClickHandler(event: Event) {
    event.stopPropagation();
  }

  selectNodeDropdown(event, data) {
    if (data.id != null) {
      event.stopImmediatePropagation();
      this.clearFormTree = Object.assign(false, true);
      this.modelTreeForm = {};
      this.modelTreeForm.parent_NavigationActionID = data.id;

      this.selectNode = data;
      //this.getNavigationActionForEditByNavigation(data.id);
    }
  }
  // getNavigationActionForEditByNavigation(id) {
  //   this.showLoadingForm = true;
  //   this._navigationActionService
  //     .getNavigationActionForEditByNavigationActionId(id)
  //     .subscribe({
  //       next: (res) => {
  //         if (res.navigationAction) {
  //           res.navigationAction.workflowID =
  //             res.navigationAction.workflowID &&
  //             res.navigationAction.workflowID != 0
  //               ? res.navigationAction.workflowID
  //               : null;
  //           this.modelTreeForm = {
  //             hideOnExclusion: false,
  //             isPrompt_Address: false,
  //             isPrompt_ArrangementType: false,
  //             navigationAction: "",
  //             outcomeIDList: "",
  //             isPrompt_PaymentMethod: false,
  //             navigationActionID: null,
  //             parent_NavigationActionID: null,
  //             navigationActionPackageID: null,
  //             phoneTypeExclusionIDList: "",
  //             systemContactDetailTypeID: null,
  //             workflowID: null,
  //           };

  //           this.modelTreeForm = Mapper.map<
  //             NavigationActionSelectByNavigationActionIdSpDto,
  //             NavigationActionInputDto
  //           >(res.navigationAction, this.modelTreeForm);

  //           this.modelTreeForm.outcomeIDList = res.outComes
  //             .map((f) => f.outcomeID)
  //             .toString();
  //           this.modelTreeForm.phoneTypeExclusionIDList = res.exclusions
  //             .map((f) => f.contactDetailTypeID)
  //             .toString();

  //           this.isModeEdit = Object.assign(false, true);
  //         }
  //       },
  //       complete: () => {
  //         this.showLoadingForm = false;
  //       },
  //     });
  // }
  removeNavigationTree(id: number, nodes: OrganizationUnitsDto[]) {
    // for (let i = 0; i < nodes.length; i++) {
    //   const findedIndex = nodes.findIndex((x) => x.id == id);
    //   if (findedIndex != -1) {
    //     nodes.splice(findedIndex, 1);
    //     return nodes;
    //   } else {
    //     if (nodes[i]?.children && nodes[i].children.length > 0) {
    //       this.removeNavigationTree(id, nodes[i]?.children);
    //     }
    //   }
    // }
  }
  submitHandler(data: OrganizationUnitsDto) {
    // this.isProgressing = true;
    // data.displayOrder = 0;
    // data.statusID = 1;
    // this._navigationActionService
    //   .saveByInput(data)
    //   .pipe(
    //     finalize(() => {
    //       this.isProgressing = false;
    //     })
    //   )
    //   .subscribe({
    //     next: (res) => {
    //       if (!data.navigationActionID) {
    //         let newNode: NavigationActionNode = {
    //           children: [],
    //           id: res as any,
    //           name: data.navigationAction,
    //         };
    //         this.selectNode.children.push(newNode);
    //       } else {
    //         this.selectNode.name = data.navigationAction;
    //       }
    //       this.reloadNodeId = res;
    //       this._toastService.success("::Navigation_Action_Buttons_Saved"); // TODO: add translation
    //       this.isProgressing = false;
    //       this.modelTreeForm = {};
    //     },
    //   });
  }

  cancelClickHandler() {
    this._location.back();
  }
}
