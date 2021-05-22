import {Component, Input, OnInit} from '@angular/core';
import {TableItemInfo} from 'src/app/shared/interfaces';

@Component({
  selector: 'app-item-info',
  templateUrl: './item-info.component.html',
  styleUrls: ['./item-info.component.scss']
})
export class ItemInfoComponent {

  @Input() itemDescription: TableItemInfo[]
  displayedColumns: string[] = ['key', 'value'];

  constructor () { }

}
