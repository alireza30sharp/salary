import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmInterFace } from '../ki-components/ki-confirmation/confirm.interface';
import { ModalSizeEnum } from '../ki-components/ki-modal/modal-size-enum';
import { KiConfirmationComponent } from '../ki-components';
@Injectable({
  providedIn: 'root',
})
export class ModalService {
  constructor(private modalService: NgbModal) {}

  open(
    content: any,
    size: 'sm' | 'md' | 'lg' | 'xl',
    data?: any,
    preventClose?: boolean
  ): Promise<any> {
    const modalRef = this.modalService.open(content, {
      centered: true,
      size: size,
      backdrop: preventClose ? 'static' : true,
      keyboard: !preventClose,
    });

    if (data) {
      for (let fld in data) {
        modalRef.componentInstance[fld] = data[fld];
      }
    }

    return new Promise<any>((resolve, reject) => {
      modalRef.result.then(
        (result) => {
          resolve(result);
        },
        (reason) => {
          reject(reason);
        }
      );
    });
  }

  showConfirm(params: ConfirmInterFace, preventClose?: boolean) {
    return this.open(
      KiConfirmationComponent,
      ModalSizeEnum.Small,
      params,
      preventClose
    );
  }

  closeModal() {
    this.modalService.dismissAll();
  }
}
