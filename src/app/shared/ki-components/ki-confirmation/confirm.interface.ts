import { SafeHtml } from '@angular/platform-browser';

export type ConfirmType = 'ErrorMessage' | 'Confirm';

export class ConfirmInterFace {
  type?: ConfirmType;
  description?: string | SafeHtml;
  title?: string;
  acceptText?: string;
  declineText?: string;
}
