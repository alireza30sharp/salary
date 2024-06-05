import {
  Component,
  DestroyRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NgForm } from '@angular/forms';
import { ContactDetailTypeService } from '@proxy/contact-detail-type';
import { NavigationPackageDto } from '@proxy/dtos/navigation-action-package';
import { NavigationActionService } from '@proxy/entity-types';
import { OutComeService } from '@proxy/out-come';
import { ContactDetailTypeForListSpDto } from '@proxy/sp-dtos/contact-detail-type';
import { NavigationActionInputDto } from '@proxy/sp-dtos/navigation-actions';
import { OutcomeListItemSpDto } from '@proxy/sp-dtos/outcomes';
import { SystemContactDetailTypeService } from '@proxy/system-contact-detail-type';
import { WorkflowService } from '@proxy/workflows';
import { SelectOptionInterface } from '@share/interfaces/select-option.interface';
import { Observable, finalize, forkJoin, tap } from 'rxjs';
export enum SystemContactDetailType {
  Email = 0,
  Phone = 1,
  Fax = 2,
  WebSite_DX = 3,
}
export enum PromptType {
  None = 'none',
  ArrangementType = 'Arrangement_Type',
  PaymentMethod = 'Payment_Method',
  ContactType = 'Contact_Type',
  Address = 'Address',
}
@Component({
  selector: 'app-navigation-action-buttons-tree-form',
  templateUrl: './navigation-action-buttons-tree-form.component.html',
  styleUrls: ['./navigation-action-buttons-tree-form.component.scss'],
})
export class NavigationActionButtonsTreeFormComponent implements OnInit {
  @ViewChild('form') form!: NgForm;

  @Input() model?: NavigationActionInputDto = {};
  @Input() set isModeEdit(item: boolean) {
    if (item) {
      if (this.model.outcomeIDList && this.model.outcomeIDList != '') {
        this.model.outcomeIDList.split(',').map(str => {
          this.outComeDic[str] = true;
        });
      }
      if (this.model.phoneTypeExclusionIDList && this.model.phoneTypeExclusionIDList != '') {
        this.model.phoneTypeExclusionIDList.split(',').map(str => {
          this.contactDetailTypeDic[str] = true;
        });
      }
      this.setPromptRadioButton(this.model);
    }
  }
  @Input() set clearForm(isClear) {
    if (this.form != undefined) {
      this.outComeDic = {};
      this.contactDetailTypeDic = {};
      this.form.resetForm();
    }
  }
  @Input() readonly?: boolean;
  @Input() submitButtonId?: string = 'navigation-submit-button-id';
  @Input() showLoading?: boolean;
  @Input() accountAllocationRuleOptions?: SelectOptionInterface<number>[];
  @Input() contactTypeOptions?: SelectOptionInterface<number>[];
  @Input() listOutCome?: OutcomeListItemSpDto[];
  @Input() listContactDetailType?: ContactDetailTypeForListSpDto[];

  @Output() submitEvent = new EventEmitter<NavigationActionInputDto>();
  columnClassNumber?: number = 6;
  lockupsIsLoading?: boolean;
  promptType = PromptType;
  promptTypeSelect = PromptType.None;

  outComeDic: { [key: OutcomeListItemSpDto['outcomeID']]: boolean } = {};
  contactDetailTypeDic: {
    [key: ContactDetailTypeForListSpDto['contactDetailTypeID']]: boolean;
  } = {};

  PromptType: any;
  constructor(
    private readonly _destroyRef: DestroyRef,
    private readonly _workflowService: WorkflowService,
    private readonly _systemContactDetailTypeService: SystemContactDetailTypeService,
    private readonly _contactDetailTypeService: ContactDetailTypeService,
    private readonly _outComeService: OutComeService,
    private readonly _navigationActionService: NavigationActionService
  ) {}
  ngOnInit(): void {
    this._loadData();
  }
  outComeDicCheckedHandler(state: boolean, outCome: OutcomeListItemSpDto) {
    this.outComeDic[outCome.outcomeID] = state;
  }
  contactDetailTypeDicCheckedHandler(state: boolean, detailTypeDic: ContactDetailTypeForListSpDto) {
    this.contactDetailTypeDic[detailTypeDic.contactDetailTypeID] = state;
  }
  systemContactDetailChanged() {
    if (this.model.systemContactDetailTypeID != 1) {
      this.contactDetailTypeDic = {};
    }
  }
  selectionPromptChanged(select: PromptType) {
    this.promptTypeSelect = select;
    this.model.systemContactDetailTypeID = null;
    switch (select) {
      case this.promptType.None:
        this.model.isPrompt_Address = false;
        this.model.isPrompt_ArrangementType = false;
        this.model.isPrompt_PaymentMethod = false;
        break;
      case this.promptType.Address:
        this.model.isPrompt_Address = true;
        this.model.isPrompt_ArrangementType = false;
        this.model.isPrompt_PaymentMethod = false;
        break;
      case this.promptType.ArrangementType:
        this.model.isPrompt_Address = false;
        this.model.isPrompt_ArrangementType = true;
        this.model.isPrompt_PaymentMethod = false;
        break;
      case this.promptType.ContactType:
        this.model.isPrompt_Address = false;
        this.model.isPrompt_ArrangementType = false;
        this.model.isPrompt_PaymentMethod = false;
        break;
      case this.promptType.PaymentMethod:
        this.model.isPrompt_Address = false;
        this.model.isPrompt_ArrangementType = false;
        this.model.isPrompt_PaymentMethod = true;
        break;
    }
  }
  setPromptRadioButton(item: NavigationActionInputDto) {
    if (item.systemContactDetailTypeID == 1) {
      this.promptTypeSelect = PromptType.ContactType;
    } else if (item.isPrompt_Address) {
      this.promptTypeSelect = PromptType.Address;
    } else if (item.isPrompt_ArrangementType) {
      this.promptTypeSelect = PromptType.ArrangementType;
    } else if (item.isPrompt_PaymentMethod) {
      this.promptTypeSelect = PromptType.PaymentMethod;
    } else {
      this.promptTypeSelect = PromptType.None;
    }
  }
  submitHandler(form: NgForm) {
    this.model.outcomeIDList = null;
    this.model.phoneTypeExclusionIDList = null;
    if (this.outComeDic) {
      this.model.outcomeIDList = Object.keys(this.outComeDic)
        .filter(f => this.outComeDic[f] != false)
        .join(',');
    }
    if (this.contactDetailTypeDic) {
      this.model.phoneTypeExclusionIDList = Object.keys(this.contactDetailTypeDic)
        .filter(f => this.contactDetailTypeDic[f] != false)
        .join(',');
    }
    this.submitEvent.emit(this.model);
  }
  private _loadData() {
    const services: Observable<unknown>[] = [];

    if (!this.accountAllocationRuleOptions) {
      const service = this._workflowService.workflowByShowInactive(false).pipe(
        tap(res => {
          this.accountAllocationRuleOptions = res.map(item => ({
            label: item.workflow,
            value: item.workflowID,
          }));
        })
      );

      services.push(service);
    }
    if (!this.contactTypeOptions) {
      const service = this._systemContactDetailTypeService
        .systemContactDetailTypeByShowInactive(false)
        .pipe(
          tap(res => {
            this.contactTypeOptions = res.map(item => ({
              label: item.systemContactDetailType,
              value: item.systemContactDetailTypeID,
            }));
          })
        );

      services.push(service);
    }
    if (services.length) {
      this.lockupsIsLoading = true;
      forkJoin(services)
        .pipe(
          takeUntilDestroyed(this._destroyRef),
          finalize(() => {
            this.lockupsIsLoading = false;
          })
        )
        .subscribe();
    }

    this._outComeService.outcomeByShowInactive(false).subscribe(res => {
      this.listOutCome = res;
    });
    this._contactDetailTypeService
      .contactDetailTypeBySystemContactDetailTypeIdBySystemContactDetailTypeIdAndShowInactive(
        SystemContactDetailType.Phone,
        false
      )
      .subscribe(res => {
        this.listContactDetailType = res;
      });
  }
}
