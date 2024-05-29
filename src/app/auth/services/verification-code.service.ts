import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiUrlService } from '../../api-url.service';
import { response } from '../../shared/models';
@Injectable()
export class VerificationCodeService {
  constructor(
    private readonly $http: HttpClient,
    private readonly urlSvc: ApiUrlService
  ) {}
  verifyRequest(mobile: string) {
    return this.$http.post<response<any>>(
      this.urlSvc.Parents.ParentVerifyRequest,
      {
        mobile:mobile
      }
    );
  }
  verificationCode(mobile: string,code:string){
    return this.$http.post<response<any>>(
      this.urlSvc.Parents.VerificationCode,
      {
        mobile:mobile,
        code:code
      }
    );
  }
}
