import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-skeleton-form-loading',
  templateUrl: './skeleton-form-loading.component.html',
  styleUrls: ['./skeleton-form-loading.component.scss'],
})
export class SkeletonFormLoadingComponent implements OnInit {
  constructor() {}
  @Input() count: number = 1;
  countArray: number[] = [];
  ngOnInit() {
    this.countArray = Array(this.count)
      .fill(0)
      .map((x, i) => i);
  }
}
