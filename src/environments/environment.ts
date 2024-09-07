/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  //apiUrl: "http://matin.api.kiasystem.ir",
  //apiUrl: "http://37.156.14.41:2087",
   apiUrl: "http://192.168.1.80:2087",

  login: "/api/UserAuth/Login",
  register: "/api/Parents/Add",
  ReAuth: "/api/UserAuth/R eAuth",
};
