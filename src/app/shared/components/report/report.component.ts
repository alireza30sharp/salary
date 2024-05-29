import { AfterViewInit, Component, Input, OnInit } from "@angular/core";
import { VariablesReportInterFace } from "../../interfaces/variables-report.interface";
declare var Stimulsoft: any;
@Component({
  selector: "app-report",
  templateUrl: "./report.component.html",
  styleUrls: ["./report.component.scss"],
})
export class ReportComponent implements OnInit, AfterViewInit {
  constructor() {
    Stimulsoft.Base.StiLicense.Key =
      "6vJhGtLLLz2GNviWmUTrhSqnOItdDwjBylQzQcAOiHkgpgFGkUl79uxVs8X+uspx6K+tqdtOB5G1S6PFPRrlVNvMUiSiNYl724EZbrUAWwAYHlGLRbvxMviMExTh2l9xZJ2xc4K1z3ZVudRpQpuDdFq+fe0wKXSKlB6okl0hUd2ikQHfyzsAN8fJltqvGRa5LI8BFkA/f7tffwK6jzW5xYYhHxQpU3hy4fmKo/BSg6yKAoUq3yMZTG6tWeKnWcI6ftCDxEHd30EjMISNn1LCdLN0/4YmedTjM7x+0dMiI2Qif/yI+y8gmdbostOE8S2ZjrpKsgxVv2AAZPdzHEkzYSzx81RHDzZBhKRZc5mwWAmXsWBFRQol9PdSQ8BZYLqvJ4Jzrcrext+t1ZD7HE1RZPLPAqErO9eo+7Zn9Cvu5O73+b9dxhE2sRyAv9Tl1lV2WqMezWRsO55Q3LntawkPq0HvBkd9f8uVuq9zk7VKegetCDLb0wszBAs1mjWzN+ACVHiPVKIk94/QlCkj31dWCg8YTrT5btsKcLibxog7pv1+2e4yocZKWsposmcJbgG0";
  }
  ngAfterViewInit(): void {}
  @Input() set data(list: any) {
    this._data = list;
    this.renderReport(this._data);
  }
  @Input() dataSetName: string;
  @Input() reportName: string;
  @Input() variablesInReport: Array<VariablesReportInterFace> =
    new Array<VariablesReportInterFace>();
  _data: any;
  ngOnInit(): void {}
  async renderReport(data) {
    var options = new Stimulsoft.Viewer.StiViewerOptions();
    options.toolbar.showDesignButton = true;
    var viewer = new Stimulsoft.Viewer.StiViewer(options, "StiViewer", false);
    var report = new Stimulsoft.Report.StiReport();
    var json = data;
    var dataSet = new Stimulsoft.System.Data.DataSet(this.dataSetName);
    dataSet.readJson(JSON.stringify(json));
    report.dictionary.databases.clear();
    report.regData(this.dataSetName, "", dataSet);
    report.dictionary.connect(false);
    report.dictionary.synchronize();
    report.loadFile(`assets/reports/${this.reportName}.mrt`);
    await this.setVariable(report);
    viewer.report = report;
    viewer.renderHtml("viewerContent");
  }
  async setVariable(report) {
    if (this.variablesInReport.length) {
      for (let i = 0; i < this.variablesInReport.length; i++) {
        report.dictionary.variables.getByName(
          this.variablesInReport[i].paramName
        ).valueObject = this.variablesInReport[i].paramValue;
      }
    }
  }
}
