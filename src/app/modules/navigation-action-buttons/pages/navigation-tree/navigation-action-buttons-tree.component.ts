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
import { ConfirmInterFace } from '@share/ui-components/ui-confirmation/confirm.interface';
import { ModalService } from '@share/services/modal.service';
import {
  NavigationActionInputDto,
  NavigationActionSelectByNavigationActionIdSpDto,
} from '@proxy/sp-dtos/navigation-actions';
import { Mapper } from '@share/utilities/mapper';
@Component({
  templateUrl: './navigation-action-buttons-tree.component.html',
  styleUrls: ['./navigation-action-buttons-tree.component.scss'],
})
export class NavigationActionButtonsTreeComponent implements OnInit {
  isProgressing?: boolean;
  showLoadingForm?: boolean;
  readonly submitButtonId = 'navigation-submit-button-id';
  showInactive: boolean = false;
  clearFormTree: boolean = false;
  navigationActionPackageID: number = 0;
  model?: NavigationPackageDto = {
    navigationActionPackage: null,
    hideForAdmin: null,
  };
  modelTreeForm?: NavigationActionInputDto = {};
  isModeEdit?: boolean = false;
  isLoadingTree?: boolean = false;
  reloadNodeId = null;
  listNodeDto: NavigationActionNode[];
  selectNode: NavigationActionNode;
  title?: string;
  items: GeneralActionType[] = [
    {
      text: this._localizationService.instant('::Add_Button'),
      click: (event, arg) => {
        this.clearFormTree = Object.assign(false, true);
        this.modelTreeForm = {};
        this.isModeEdit = Object.assign(false, false);
        this.modelTreeForm.parent_NavigationActionID = arg.data.id;
        this.modelTreeForm.navigationActionPackageID = this.navigationActionPackageID;
        this.selectNode = arg.data;
      },
    },
  ];
  itemsChild: GeneralActionType[] = [
    {
      text: this._localizationService.instant('::Remove'),
      click: (event, arg) => {
        this._confirmRemoveActionTree(arg.data.id, arg.data.name);
      },
    },

    {
      text: this._localizationService.instant('::Add_Button'),
      click: (event, arg) => {
        this.clearFormTree = Object.assign(false, true);
        this.isModeEdit = Object.assign(false, false);
        this.modelTreeForm = {};
        this.modelTreeForm.parent_NavigationActionID = arg.data.id;
        this.modelTreeForm.navigationActionPackageID = this.navigationActionPackageID;
        this.selectNode = arg.data;
      },
    },
  ];
  constructor(
    private readonly _location: Location,
    private readonly _toastService: ToastService,
    private readonly _router: Router,
    private readonly _localizationService: LocalizationService,
    private _modalService: ModalService,
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
  listButtonClickHandler() {
    this._router.navigateByUrl(Paths.navigationActionButtons.list().url);
  }
  getByNavigationActionPackageID() {
    this.showLoadingForm = true;
    this._navigationActionPackageService
      .get(this.navigationActionPackageID, this.showInactive)
      .subscribe({
        next: res => {
          if (res) {
            this.title = this._localizationService.instant('::Navigation_Action_Buttons_Tree');
            this.title += ' - ' + res.navigationActionPackage;
            this.model = res;
          }
        },
        complete: () => {
          this.showLoadingForm = false;
        },
      });
  }

  private _confirmRemoveActionTree(navigationActionID: number, actionflow: string) {
    const params: ConfirmInterFace = {
      acceptText: this._localizationService.instant('::YES'),
      declineText: this._localizationService.instant('::NO'),
      description: this._localizationService.instant('::DELETE_COINFIRM'),
      title: this._localizationService.instant('::Remove') + ' ' + `"${actionflow.toUpperCase()}"`,
      type: 'Confirm',
    };

    this._modalService.showConfirm(params, false).then(res => {
      if (res) {
        this._removeNavigationAction(navigationActionID);
      }
    });
  }
  private _removeNavigationAction(navigationActionID: number) {
    this._navigationActionService.deactivateByNavigationActionId(navigationActionID).subscribe({
      next: () => {
        this._toastService.success(
          this._localizationService.instant('::Navigation_Action_Package_Removed_Successfully')
        );
        this.removeNavigationTree(navigationActionID, this.listNodeDto);
        this.reloadNodeId = navigationActionID;
      },
    });
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
      this.modelTreeForm.navigationActionPackageID = this.navigationActionPackageID;
      this.selectNode = data;
      this.getNavigationActionForEditByNavigation(data.id);
    }
  }
  getNavigationActionForEditByNavigation(id) {
    this.showLoadingForm = true;
    this._navigationActionService.getNavigationActionForEditByNavigationActionId(id).subscribe({
      next: res => {
        if (res.navigationAction) {
          res.navigationAction.workflowID =
            res.navigationAction.workflowID && res.navigationAction.workflowID != 0
              ? res.navigationAction.workflowID
              : null;
          this.modelTreeForm = {
            hideOnExclusion: false,
            isPrompt_Address: false,
            isPrompt_ArrangementType: false,
            navigationAction: '',
            outcomeIDList: '',
            isPrompt_PaymentMethod: false,
            navigationActionID: null,
            parent_NavigationActionID: null,
            navigationActionPackageID: null,
            phoneTypeExclusionIDList: '',
            systemContactDetailTypeID: null,
            workflowID: null,
          };

          this.modelTreeForm = Mapper.map<
            NavigationActionSelectByNavigationActionIdSpDto,
            NavigationActionInputDto
          >(res.navigationAction, this.modelTreeForm);

          this.modelTreeForm.outcomeIDList = res.outComes.map(f => f.outcomeID).toString();
          this.modelTreeForm.phoneTypeExclusionIDList = res.exclusions
            .map(f => f.contactDetailTypeID)
            .toString();

          this.isModeEdit = Object.assign(false, true);
        }
      },
      complete: () => {
        this.showLoadingForm = false;
      },
    });
  }
  removeNavigationTree(id: number, nodes: NavigationActionNode[]) {
    for (let i = 0; i < nodes.length; i++) {
      const findedIndex = nodes.findIndex(x => x.id == id);
      if (findedIndex != -1) {
        nodes.splice(findedIndex, 1);
        return nodes;
      } else {
        if (nodes[i]?.children && nodes[i].children.length > 0) {
          this.removeNavigationTree(id, nodes[i]?.children);
        }
      }
    }
  }
  submitHandler(data: NavigationActionInputDto) {
    this.isProgressing = true;
    data.displayOrder = 0;
    data.statusID = 1;
    this._navigationActionService
      .saveByInput(data)
      .pipe(
        finalize(() => {
          this.isProgressing = false;
        })
      )
      .subscribe({
        next: res => {
          if (!data.navigationActionID) {
            let newNode: NavigationActionNode = {
              children: [],
              id: res as any,
              name: data.navigationAction,
            };
            this.selectNode.children.push(newNode);
          } else {
            this.selectNode.name = data.navigationAction;
          }

          this.reloadNodeId = res;
          this._toastService.success('::Navigation_Action_Buttons_Saved'); // TODO: add translation
          this.isProgressing = false;
          this.modelTreeForm = {};
        },
      });
  }

  cancelClickHandler() {
    this._location.back();
  }
}
