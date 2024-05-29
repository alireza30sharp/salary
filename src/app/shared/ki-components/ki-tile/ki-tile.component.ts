import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ki-tile',
  templateUrl: './ki-tile.component.html',
  styleUrls: ['./ki-tile.component.scss'],
})
export class UiTileComponent implements OnInit {
  @Input() header: string;
  @Input() text: string;
  @Input() image: any;

  constructor() {}

  ngOnInit() {}
}
