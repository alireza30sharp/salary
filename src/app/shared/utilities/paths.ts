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
}
