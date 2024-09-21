import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { finalize } from "rxjs";
import { Router } from "@angular/router";
import { ListViewFilterInterFace } from "../../../../../shared/interfaces/list-view-filter-config.interface";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  configViewFilter: ListViewFilterInterFace = {};
  constructor(private _router: Router) {}
  ngOnInit(): void {}

  searchPayLoadEventHandler(e) {}
}
