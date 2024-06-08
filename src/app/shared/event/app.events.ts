//https://github.com/cristiammercado/ng-event-bus pattern

export class Events {
  static readonly SelectedAccount = 'accounts:selected';
  static readonly ChangeSelectedAccount = 'accounts:change-selected';
  static readonly AccountQuickSearch = 'accounts:search:quick';
  static readonly AccountAdvanceSearch = 'accounts:search:advance';
  static readonly AccountSimpleSearch = 'accounts:search:simple';
  static readonly ActtivityTaskSearchPayLoad = 'accounts:activity:task';
  static readonly ActivityTabChanged = 'accounts:activity';
  static readonly TaskAdvcanceSeasrch = 'task:search:adavence';
  static readonly PaymentAdvcanceSeasrch = 'payment:search:adavence';

  static readonly ContactTabContactDone = 'ContactTabContactDone';
  static readonly ContactTabContactDoneFailed = 'ContactTabContactDoneFailed';
  static readonly ContactSaveCompleted = 'ContactSaveCompleted';
  static readonly ContactSaved = 'ContactSaved';
  static readonly ReloadSavedContact = 'ReloadSavedContact';
  static readonly ReloadContactDetails = 'ReloadContactDetails';
  static readonly ReloadContactAddresses = 'ReloadContactAddresses';

  static readonly TaskAdvanceSearchClicked = 'TaskAdvanceSearchClicked';
  static readonly AccountAdvanceSearchClicked = 'AccountAdvanceSearchClicked';
  static readonly PaymentAdvcanceSeasrchClicked = 'PaymentAdvcanceSeasrchClicked';
  static readonly ContactIncomeChanged = 'contactIncomeChanged';

  static readonly MasterWorkFlowChanged = 'MasterWorkFlowChanged';
  static readonly AccountBalanceToZero = 'AccountBalanceToZero';

  static readonly AddTaskToAccount = 'AddTaskToAccount';
  static readonly AddNoteToAccount = 'AddNoteToAccount';
  static readonly AddTaskToAccountDone = 'AddTaskToAccountDone';
  static readonly AddNoteToAccountDone = 'AddNoteToAccountDone';

  static readonly RefreshAccountSpecificListItem = 'RefreshAccountSpecificListItem';
  static readonly RefreshCorrespondenceSmsList = 'RefreshCorrespondenceSmsList';
  static readonly RefreshCorrespondenceEmailList = 'RefreshCorrespondenceEmailList';

  static readonly ShowAccountMoreContacts = 'ShowAccountMoreContacts';

  static readonly PrincipalChanged = 'PrincipalChanged';
  static readonly RefreshAccount = 'RefreshAccount';

  static readonly ExpandLetterDesignerTreeDocumentNode = 'ExpandLetterDesignerTreeDocumentNode';
  static readonly RefreshLetterDesignerTree = 'RefreshLetterDesignerTree';
  static readonly AddTab = 'AddTab';
}
