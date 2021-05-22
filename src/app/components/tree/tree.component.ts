import {Component, ComponentFactoryResolver, DoCheck, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {Item} from './../../shared/interfaces';


interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss']
})

export class TreeComponent implements OnInit {

  @Input() itemList: Item[] = []
  @Output() onShowInfo = new EventEmitter<number>()

  constructor () { }

  ngOnInit() {
    this.dataSource.data = this.itemList;
  }

  private _transformer = (node: Item, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
      id: node.id
    };
  }

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level, node => node.expandable
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer, node => node.level, node => node.expandable, node => node.children
  );

  dataSource = new MatTreeFlatDataSource(
    this.treeControl, this.treeFlattener
  );

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  showInfo($event) {
    this.onShowInfo.emit($event)
  }
}
