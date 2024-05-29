/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from "@angular/core";
import { Router } from "@angular/router";
import { NB_AUTH_OPTIONS, NbAuthSocialLink } from "../../auth.options";
import { getDeepFromObject } from "../../helpers";
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";

import { NbAuthService } from "../../services/auth.service";
import { NbAuthResult } from "../../services/auth-result";
import { BehaviorSubject, Subject } from "rxjs";
import { remainingTime } from "@persian-tools/persian-tools";
import {
  NbStepChangeEvent,
  NbStepComponent,
  NbStepperComponent,
} from "@nebular/theme";
import { VerificationCodeService } from "../../services/verification-code.service";
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
} from "rxjs/operators";

@Component({
  selector: "nb-register",
  styleUrls: ["./register.component.scss"],
  templateUrl: "./register.component.html",
  providers: [VerificationCodeService],
})
export class NbRegisterComponent implements OnInit {
  @ViewChild("stepper") stepperComponent: NbStepperComponent;
  firstForm: UntypedFormGroup;
  secondForm: UntypedFormGroup;
  thirdForm: UntypedFormGroup;

  redirectDelay: number = 0;
  showMessages: any = {};
  strategy: string = "";

  submitted = false;
  errors: string[] = [];
  messages: string[] = [];
  user: any = {
    mobile1: null,
    mobile2: "",
    firstName: null,
    lastName: null,
    nationalCode: null,
    isAcceptRule: true,
    comment: "",
    companyName: null,
  };
  expireSecound = 0;
  socialLinks: NbAuthSocialLink[] = [];
  otpTimer = 0;
  otpTimerTextAction$ = new BehaviorSubject("00:00");
  otpIntervalId: any;
  VerifyInput$ = new Subject<string>();
  mobileRequest: string;
  stepperNextMobile: boolean = true;
  loading: boolean = false;
  codeLoading: boolean = false;
  constructor(
    private _verificationCodeService: VerificationCodeService,
    protected service: NbAuthService,
    @Inject(NB_AUTH_OPTIONS) protected options = {},
    protected cd: ChangeDetectorRef,
    protected router: Router,
    private fb: UntypedFormBuilder
  ) {
    this.redirectDelay = this.getConfigValue("forms.register.redirectDelay");
    this.showMessages = this.getConfigValue("forms.register.showMessages");
    this.strategy = this.getConfigValue("forms.register.strategy");
    this.socialLinks = this.getConfigValue("forms.login.socialLinks");
    this.VerifyInput$.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      map((f, index) => {
        this.errors = [];
        this.showMessages.success = false;
        this.messages = [];
        if (f.length == 11) {
          return f;
        }
      })
    ).subscribe((res) => {
      if (res) {
        this.loading = true;
        this.verifyRequest(res);
      }
    });
  }
  ngOnInit() {
    this.firstForm = this.fb.group({
      firstCtrl: ["", Validators.required],
    });

    this.secondForm = this.fb.group({
      secondCtrl: ["", Validators.required],
    });

    this.thirdForm = this.fb.group({
      thirdCtrl: ["", Validators.required],
    });
  }
  verifyOtp(e) {
    this.codeLoading = true;
    this._verificationCodeService
      .verificationCode(this.mobileRequest, e)
      .subscribe({
        next: (res) => {
          this.codeLoading = false;
          if (res.isOk) {
            this.showMessages.success = res.isOk;
            this.messages.push(res.data.message);
            this.secondForm.setValue({ secondCtrl: e });
            this.user.mobile1 = this.mobileRequest;
            this.stepperComponent.next();
          } else {
            this.stepperComponent.previous;
          }
        },
        error: (err) => {
          this.stepperComponent.previous;
          this.showError(err.error.message);
          this.secondForm.markAsDirty();
          this.secondForm.setValue({ secondCtrl: null });
          this.stepperNextMobile = true;
          this.loading = false;
          this.codeLoading = false;
        },
        complete: () => {
          this.codeLoading = false;
        },
      });
  }
  runForm_otp() {
    this.otpTimer = Date.now() + 3 * this.expireSecound * 1000;
    this.otpTimerTextAction$.next("03:00");
    const numFormat = new Intl.NumberFormat("en", {
      minimumIntegerDigits: 2,
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
    });
    clearInterval(this.otpIntervalId);
    this.otpIntervalId = setInterval(() => {
      const { years, months, days, hours, minutes, seconds, isFinished } =
        remainingTime(this.otpTimer);
      if (isFinished) {
        this.otpTimer = 0;
        clearInterval(this.otpIntervalId);
      }
      this.otpTimerTextAction$.next(
        `${numFormat.format(minutes)}:${numFormat.format(seconds)}`
      );
    }, 1000);
  }
  handleStepChange(e: NbStepChangeEvent) {
    this.errors = [];
    this.showMessages.success = false;
    this.messages = [];
    if (e.index == 1) {
      this.runForm_otp();
    }
  }

  register(): void {
    this.errors = [];
    this.messages = [];
    this.submitted = true;
    if (this.user.mobile1 != this.mobileRequest) {
      this.showError("لطفا شماره همراه تایید شده را وارد نمایید");
      this.submitted = false;
    } else {
      this.service
        .register(this.strategy, this.user)
        .subscribe((result: NbAuthResult) => {
          this.submitted = false;
          if (result.isSuccess()) {
            this.messages = result.getMessages();
          } else {
            this.errors = result.getErrors();
            if (result.response.error) {
              this.errors = this.errors.concat(result.response.error.messages);
            }
          }

          const redirect = result.getRedirect();
          if (redirect) {
            setTimeout(() => {
              return this.router.navigateByUrl(redirect);
            }, this.redirectDelay);
          }
          this.cd.detectChanges();
        });
    }
  }
  verifyRequest(mobile: string) {
    this.loading = true;
    this._verificationCodeService.verifyRequest(mobile).subscribe({
      next: (res) => {
        if (res.isOk) {
          this.showSuccess(res.data.message);
          this.expireSecound = +res.data.expireSecound;
          this.stepperNextMobile = false;
          this.stepperComponent.next();
        } else {
          this.showError(res.messages);
        }
      },
      error: (res) => {
        this.showError(res.error.message);
        this.firstForm.markAsDirty();
        this.firstForm.setValue({ firstCtrl: null });
        this.stepperNextMobile = true;
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      },
    });
  }
  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }

  showError(msg) {
    this.showMessages.error = true;
    this.errors.push(msg);
  }
  showSuccess(msg) {
    this.showMessages.success = true;
    this.messages.push(msg);
  }
}
