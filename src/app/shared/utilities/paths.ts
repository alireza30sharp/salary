class Uri {
  private _host: string;
  private _url: string;
  private _path: string;

  get absoluteUri(): string {
    return this._host + this._path;
  }
  get url(): string {
    return this._url;
  }
  get path(): string {
    return this._path;
  }

  constructor(host: string, url: string, path: string) {
    this._host = host;
    this._url = url;
    this._path = path;
  }
}

export class Paths {
  static organizationUnits = class {
    static base: string = "salary/organization-units";
    static domain: string = "http://localhost:4200";
    static list(): Uri {
      return new Uri(this.domain, `/${this.base}/list`, "list");
    }
    static edit(id?: number): Uri {
      return new Uri(this.domain, `/${this.base}/edit/${id ?? ""}`, "edit/:id");
    }
    static add(id?: number): Uri {
      return new Uri(
        this.domain,
        `/${this.base}/add/${id ?? ""}`,
        "add/:parentId"
      );
    }
  };
  static wageOrders = class {
    static base: string = "salary/wage-orders";
    static domain: string = "http://localhost:4200";
    static list(): Uri {
      return new Uri(this.domain, `/${this.base}/list`, "list");
    }
    static edit(id?: number): Uri {
      return new Uri(this.domain, `/${this.base}/edit/${id ?? ""}`, "edit/:id");
    }
    static add(): Uri {
      return new Uri(this.domain, `/${this.base}/add`, "add");
    }
  };
  static MonthlyPerformance = class {
    static base: string = "salary/system-operation/monthly-performance";
    static domain: string = "http://localhost:4200";

    static edit(id?: number): Uri {
      return new Uri(this.domain, `/${this.base}/edit/${id ?? ""}`, "edit/:id");
    }
    static add(): Uri {
      return new Uri(this.domain, `/${this.base}/add`, "add");
    }
  };
  static SalaryCalculation = class {
    static base: string = "salary/system-operation/salary-calculation";
    static domain: string = "http://localhost:4200";

    static edit(id?: number): Uri {
      return new Uri(this.domain, `/${this.base}/edit/${id ?? ""}`, "edit/:id");
    }
    static add(): Uri {
      return new Uri(this.domain, `/${this.base}/add`, "add");
    }
  };
  static advance = class {
    static base: string = "salary/advance"; //آدرسی که روی کروم میفته
    static domain: string = "http://localhost:4200";
    static list(): Uri {
      return new Uri(this.domain, `/${this.base}/list`, "list");
    }
    static edit(id?: number): Uri {
      return new Uri(this.domain, `/${this.base}/edit/${id ?? ""}`, "edit/:id");
    }
    static add(): Uri {
      return new Uri(this.domain, `/${this.base}/add`, "add");
    }
  };
  static InsuranceType = class {
    static base: string = "salary/insurance-type";
    static domain: string = "http://localhost:4200";
    static list(): Uri {
      return new Uri(this.domain, `/${this.base}/list`, "list");
    }
    static edit(id?: number): Uri {
      return new Uri(this.domain, `/${this.base}/edit/${id ?? ""}`, "edit/:id");
    }
    static add(): Uri {
      return new Uri(this.domain, `/${this.base}/add`, "add");
    }
  };
  static ExemptionTypes = class {
    static base: string = "salary/exemption-types";
    static domain: string = "http://localhost:4200";
    static list(): Uri {
      return new Uri(this.domain, `/${this.base}/list`, "list");
    }
    static edit(id?: number): Uri {
      return new Uri(this.domain, `/${this.base}/edit/${id ?? ""}`, "edit/:id");
    }
    static add(): Uri {
      return new Uri(this.domain, `/${this.base}/add`, "add");
    }
  };
  static WorkShops = class {
    static base: string = "salary/work-shops";
    static domain: string = "http://localhost:4200";
    static list(): Uri {
      return new Uri(this.domain, `/${this.base}/list`, "list");
    }
    static edit(id?: number): Uri {
      return new Uri(this.domain, `/${this.base}/edit/${id ?? ""}`, "edit/:id");
    }
    static add(): Uri {
      return new Uri(this.domain, `/${this.base}/add`, "add");
    }
  };
  static EducationEvidences = class {
    static base: string = "salary/education-evidences";
    static domain: string = "http://localhost:4200";
    static list(): Uri {
      return new Uri(this.domain, `/${this.base}/list`, "list");
    }
    static edit(id?: number): Uri {
      return new Uri(this.domain, `/${this.base}/edit/${id ?? ""}`, "edit/:id");
    }
    static add(): Uri {
      return new Uri(this.domain, `/${this.base}/add`, "add");
    }
  };
  static EducationFields = class {
    static base: string = "salary/education-fields";
    static domain: string = "http://localhost:4200";
    static list(): Uri {
      return new Uri(this.domain, `/${this.base}/list`, "list");
    }
    static edit(id?: number): Uri {
      return new Uri(this.domain, `/${this.base}/edit/${id ?? ""}`, "edit/:id");
    }
    static add(): Uri {
      return new Uri(this.domain, `/${this.base}/add`, "add");
    }
  };
  static EmploymentTypes = class {
    static base: string = "salary/employment-types";
    static domain: string = "http://localhost:4200";
    static list(): Uri {
      return new Uri(this.domain, `/${this.base}/list`, "list");
    }
    static edit(id?: number): Uri {
      return new Uri(this.domain, `/${this.base}/edit/${id ?? ""}`, "edit/:id");
    }
    static add(): Uri {
      return new Uri(this.domain, `/${this.base}/add`, "add");
    }
  };
  static OrganizationPost = class {
    static base: string = "salary/organization-post";
    static domain: string = "http://localhost:4200";
    static list(): Uri {
      return new Uri(this.domain, `/${this.base}/list`, "list");
    }
    static edit(id?: number): Uri {
      return new Uri(this.domain, `/${this.base}/edit/${id ?? ""}`, "edit/:id");
    }
    static add(): Uri {
      return new Uri(this.domain, `/${this.base}/add`, "add");
    }
  };
  static PaymentLocation = class {
    static base: string = "salary/payment-location";
    static domain: string = "http://localhost:4200";
    static list(): Uri {
      return new Uri(this.domain, `/${this.base}/list`, "list");
    }
    static edit(id?: number): Uri {
      return new Uri(this.domain, `/${this.base}/edit/${id ?? ""}`, "edit/:id");
    }
    static add(): Uri {
      return new Uri(this.domain, `/${this.base}/add`, "add");
    }
  };
  static BenefitDeduction = class {
    static base: string = "salary/benefit-deduction";
    static domain: string = "http://localhost:4200";
    static list(): Uri {
      return new Uri(this.domain, `/${this.base}/list`, "list");
    }
    static edit(id?: number): Uri {
      return new Uri(this.domain, `/${this.base}/edit/${id ?? ""}`, "edit/:id");
    }
    static add(): Uri {
      return new Uri(this.domain, `/${this.base}/add`, "add");
    }
  };
  static Tax = class {
    static base: string = "salary/tax";
    static domain: string = "http://localhost:4200";
    static list(): Uri {
      return new Uri(this.domain, `/${this.base}/list`, "list");
    }
    static edit(id?: number): Uri {
      return new Uri(this.domain, `/${this.base}/edit/${id ?? ""}`, "edit/:id");
    }
    static add(): Uri {
      return new Uri(this.domain, `/${this.base}/add`, "add");
    }
  };

  static Employes = class {
    static base: string = "salary/employes";
    static domain: string = "http://localhost:4200";
    static list(): Uri {
      return new Uri(this.domain, `/${this.base}/list`, "list");
    }
    static edit(id?: number): Uri {
      return new Uri(this.domain, `/${this.base}/edit/${id ?? ""}`, "edit/:id");
    }
    static add(): Uri {
      return new Uri(this.domain, `/${this.base}/add`, "add");
    }
  };
  static BenefitDeductionEmployees = class {
    static base: string = "salary/system-operation/benefit-deduction-employees";
    static domain: string = "http://localhost:4200";
    static list(): Uri {
      return new Uri(this.domain, `/${this.base}/list`, "list");
    }
    static edit(id?: number): Uri {
      return new Uri(this.domain, `/${this.base}/edit/${id ?? ""}`, "edit/:id");
    }
    static add(): Uri {
      return new Uri(this.domain, `/${this.base}/add`, "add");
    }
  };
}
