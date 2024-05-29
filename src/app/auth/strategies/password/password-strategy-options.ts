/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NbAuthSimpleToken, NbAuthTokenClass } from '../../services';
import { NbAuthStrategyOptions } from '../auth-strategy-options';
import { getDeepFromObject } from '../../helpers';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

export interface NbPasswordStrategyModule {
  alwaysFail?: boolean;
  endpoint?: string;
  method?: string;
  redirect?: {
    success?: string | null;
    failure?: string | null;
  };
  requireValidToken?: boolean;
  defaultErrors?: string[];
  defaultMessages?: string[];
}

export interface NbPasswordStrategyReset extends NbPasswordStrategyModule {
  resetPasswordTokenKey?: string;
}

export interface NbPasswordStrategyToken {
  class?: NbAuthTokenClass,
  key?: string,
  getter?: Function,
}

export interface NbPasswordStrategyMessage {
  key?: string,
  getter?: Function,
}

export class NbPasswordAuthStrategyOptions extends NbAuthStrategyOptions {
  baseEndpoint? = '/api/auth/';
  login?: boolean | NbPasswordStrategyModule = {
    alwaysFail: false,
    endpoint: 'login',
    method: 'post',
    requireValidToken: false,
    redirect: {
      success: '/salary',
      failure: null,
    },
    defaultErrors: [' لطفاً مجدداً تلاش کنید'],
    defaultMessages: ['شما با موفقیت وارد شدید.'],
  };
  register?: boolean | NbPasswordStrategyModule = {
    alwaysFail: false,
    endpoint: 'register',
    method: 'post',
    requireValidToken: false,
    redirect: {
      success: '/',
      failure: null,
    },
    defaultErrors: ['مشکلی پیش آمده است، لطفاً مجدداً تلاش کنید.'],
    defaultMessages: ['اطلاعات با موفقیت ثبت شد نام کاربری و رمز عبور شما شماره موبایل 1 شما میباشد'],
    

  };
  requestPass?: boolean | NbPasswordStrategyModule = {
    endpoint: 'request-pass',
    method: 'post',
    redirect: {
      success: '/',
      failure: null,
    },
    defaultErrors: ['متأسفانه یک مشکلی رخ داده است، لطفاً مجدداً تلاش کنید.'],
    defaultMessages: ['دستورالعمل بازنشانی رمز عبور به ایمیل شما ارسال شده است.'],
  };
  resetPass?: boolean | NbPasswordStrategyReset = {
    endpoint: 'reset-pass',
    method: 'put',
    redirect: {
      success: '/',
      failure: null,
    },
    resetPasswordTokenKey: 'reset_password_token',
    defaultErrors: ['متأسفانه یک مشکلی پیش آمده است، لطفاً مجدداً تلاش کنید.'],
    defaultMessages: ['رمز عبور شما با موفقیت تغییر یافت.'],
  };
  logout?: boolean | NbPasswordStrategyReset = {
    alwaysFail: false,
   // endpoint: 'logout',
    //method: 'delete',
    redirect: {
      success: '/login',
      failure: null,
    },
    defaultErrors: ['متأسفانه یک مشکلی پیش آمده است، لطفاً مجدداً تلاش کنید.'],
    defaultMessages: ['شما با موفقیت خارج شده‌اید.'],
  };
  refreshToken?: boolean | NbPasswordStrategyModule = {
    endpoint: 'refresh-token',
    method: 'post',
    requireValidToken: false,
    redirect: {
      success: null,
      failure: null,
    },
    defaultErrors: ['متأسفانه یک مشکلی پیش آمده است، لطفاً مجدداً تلاش کنید.'],
    defaultMessages: ['Your token has been successfully refreshed.'],
  };
  token?: NbPasswordStrategyToken = {
    class: NbAuthSimpleToken,
    key: 'data.token',
    getter: (module: string, res: HttpResponse<Object>, options: NbPasswordAuthStrategyOptions) => getDeepFromObject(
      res.body,
      options.token.key,
    ),
  };
  errors?: NbPasswordStrategyMessage = {
    key: 'data.errors',
    getter: (module: string, res: HttpErrorResponse, options: NbPasswordAuthStrategyOptions) => getDeepFromObject(
      res.error,
      options.errors.key,
      options[module].defaultErrors,
    ),
  };
  messages?: NbPasswordStrategyMessage = {
    key: 'data.messages',
    getter: (module: string, res: HttpResponse<Object>, options: NbPasswordAuthStrategyOptions) => getDeepFromObject(
      res.body,
      options.messages.key,
      options[module].defaultMessages,
    ),
  };
  validation?: {
    password?: {
      required?: boolean;
      minLength?: number | null;
      maxLength?: number | null;
      regexp?: string | null;
    };
    email?: {
      required?: boolean;
      regexp?: string | null;
    };
    fullName?: {
      required?: boolean;
      minLength?: number | null;
      maxLength?: number | null;
      regexp?: string | null;
    };
  };
}

export const passwordStrategyOptions: NbPasswordAuthStrategyOptions = new NbPasswordAuthStrategyOptions();
