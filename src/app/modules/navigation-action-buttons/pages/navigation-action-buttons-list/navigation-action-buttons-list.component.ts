import { LocalizationService } from '@abp/ng.core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GetActionFlowsResponse } from '@proxy/dtos/workflows';
import { FileDocument } from '@proxy/sp-dtos/letter';
import { WorkflowService } from '@proxy/workflows';
import { ModalService } from '@share/services/modal.service';
import { GeneralActionType } from '@share/types/general-action.type';
import { ConfirmInterFace } from '@share/ui-components/ui-confirmation/confirm.interface';
import {
  UiGridColumn,
  UiGridSummaryInterface,
} from '@share/ui-components/ui-grid/ui-grid-column.interface';
import { SearchOptionsBuilder } from '@share/utilities/SearchOptionsBuilder';
import { ArrayUtilities } from '@share/utilities/array-utilities';
import { downloadFile } from '@share/utilities/download-file';
import { propertyOf } from '@share/utilities/property-of';
import { DataSource } from 'devexpress-dashboard/model';
import { LoadOptions } from 'devextreme/data';
import CustomStore from 'devextreme/data/custom_store';
import { firstValueFrom } from 'rxjs';
import { Paths } from '@share/utilities/paths';
import { NavigationActionPackageService } from '@proxy/navigation-action-packages';
import { NavigationActionPackageForListSpDto } from '@proxy/sp-dtos/navigation-action-package';
import { ToastService } from '@share/services/toast.service';

@Component({
  selector: 'app-navigation-action-buttons-list',
  templateUrl: './navigation-action-buttons-list.component.html',
  styleUrls: ['./navigation-action-buttons-list.component.scss'],
})
export class NavigationActionButtonsListComponent implements OnInit {
  dataSource: DataSource | CustomStore;
  summaries: UiGridSummaryInterface[] = [{ column: 'actionflowID', summaryType: 'count' }];
  showInactive: boolean = false;
  searchPayLoad: any;
  gridColumns: UiGridColumn[] = [
    {
      caption: '',
      dataField: '',
      cellTemplate: 'dynamicTemplate',
      fixed: true,
      width: '100',
    },
    {
      caption: this._translate.instant('::ID'),
      dataField: propertyOf<NavigationActionPackageForListSpDto>('navigationActionPackageID'),
      dataType: 'number',
      width: '200',
    },
    {
      caption: this._translate.instant('::Hide_For_Admin'),
      dataField: propertyOf<NavigationActionPackageForListSpDto>('hideForAdmin'),
      dataType: 'boolean',
      width: '200',
    },
    {
      caption: this._translate.instant('::Package_Name'),
      dataField: propertyOf<NavigationActionPackageForListSpDto>('navigationActionPackage'),
      dataType: 'string',
    },
  ];

  items: GeneralActionType[] = [
    {
      items: [
        {
          text: this._translate.instant('::Remove'),
          click: (event, args) => {
            this._confirmRemoveActionFlow(
              args.data.navigationActionPackageID,
              args.data.navigationActionPackage
            );
          },
        },
        {
          text: this._translate.instant('::Copy'),
          click: (event, args) => {
            this._copyNavigationAction(args.data.navigationActionPackageID);
          },
        },
        {
          text: this._translate.instant('::Hide_For_Admin'),
          click: (event, args) => {
            this._router.navigateByUrl(
              Paths.navigationActionButtons.edit(args.data.navigationActionPackageID).url
            );
          },
        },
        {
          text: this._translate.instant('::EDIT'),
          click: (event, args) => {
            this._router.navigateByUrl(
              Paths.navigationActionButtons.edit(args.data.navigationActionPackageID).url
            );
          },
        },

        {
          text: this._translate.instant('::Navigation_Action_Buttons_Tree'),
          click: (event, args) => {
            this._router.navigateByUrl(
              Paths.navigationActionButtons.navigationTree(args.data.navigationActionPackageID).url
            );
          },
        },
      ],
    },
  ];
  addButtonClickHandler() {
    this._router.navigateByUrl(Paths.navigationActionButtons.add().url);
  }
  ngOnInit(): void {
    this._loadList();
  }
  rowClickHandler(data: NavigationActionPackageForListSpDto) {
    this._router.navigateByUrl(
      Paths.navigationActionButtons.navigationTree(data.navigationActionPackageID).url
    );
  }
  constructor(
    private readonly _navigationActionPackageService: NavigationActionPackageService,
    private _translate: LocalizationService,
    private _modalService: ModalService,
    private readonly _router: Router,
    private toastService: ToastService
  ) {}

  searchPayLoadEventHandler($event) {
    this.searchPayLoad = $event;
    this.showInactive = $event.showInactive;
    this._loadList($event.showInactive);
  }

  onExporting(event) {
    var loadOptions = event.loadOptions;
    var filters = event.filters;
    const builder = new SearchOptionsBuilder()
      .withRequireTotalCount(true)
      .withSkip(0)
      .withTake(0)
      .withSort(loadOptions ? loadOptions.sort : null)
      .withFilter(filters ? filters : null);

    const options = builder.build();

    this._navigationActionPackageService
      .exportToExcel({
        showInactive: this.showInactive,
        searchOptions: options,
      })
      .subscribe((response: FileDocument) => {
        downloadFile(response.content.toString(), response.name);
      });
  }

  private _loadList(showInactive: boolean = false) {
    this.dataSource = new CustomStore({
      load: async (loadOptions: LoadOptions) => {
        let sortOption = loadOptions.sort
          ? ArrayUtilities.ConvertSortExpressionToSortItem(loadOptions.sort as any[])
          : undefined;
        const builder = new SearchOptionsBuilder()
          .withRequireTotalCount(true)
          .withSkip(loadOptions.skip)
          .withTake(loadOptions.take)
          .withSort(sortOption)
          .withFilter(loadOptions.filter);

        const options = builder.build();
        return firstValueFrom(
          this._navigationActionPackageService.getListByEf({
            showInactive: showInactive,
            searchOptions: options,
          })
        )
          .then(res => {
            return {
              data: res.items,
              totalCount: res.totalCount,
              summary: [res.totalCount],
              groupCount: 0,
            };
          })
          .catch(err => {
            return {
              data: [],
              totalCount: 0,
              summary: '',
              groupCount: 0,
            };
          });
      },
    });
  }

  private _removeNavigationAction(navigationActionPackageID: number) {
    this._navigationActionPackageService.remove(navigationActionPackageID).subscribe({
      next: () => {
        this.toastService.success(
          this._translate.instant('::Navigation_Action_Package_Removed_Successfully')
        );

        this._loadList();
      },
    });
  }
  private _copyNavigationAction(navigationActionPackageID: number) {
    this._navigationActionPackageService.makeCopy(navigationActionPackageID).subscribe({
      next: () => {
        this.toastService.success(
          this._translate.instant('::Navigation_Action_Package_Copied_Successfully')
        );

        this._loadList();
      },
    });
  }
  private _confirmRemoveActionFlow(navigationActionPackageID: number, actionflow: string) {
    const params: ConfirmInterFace = {
      acceptText: this._translate.instant('::YES'),
      declineText: this._translate.instant('::NO'),
      description: this._translate.instant('::DELETE_COINFIRM'),
      title: this._translate.instant('::Remove') + ' ' + `"${actionflow.toUpperCase()}"`,
      type: 'Confirm',
    };

    this._modalService.showConfirm(params, false).then(res => {
      if (res) {
        this._removeNavigationAction(navigationActionPackageID);
      }
    });
  }
}
