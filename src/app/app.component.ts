import {HttpErrorResponse} from '@angular/common/http';
import {Component, ComponentFactoryResolver, Injectable, OnDestroy, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {Subscription} from 'rxjs';
import {ItemInfoComponent} from './components/item-info/item-info.component';
import {DbService} from './services/db.service';
import {Item, TableItemInfo} from './shared/interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  @ViewChild('itemInfo', {read: ViewContainerRef}) private itemInfoContainer: ViewContainerRef
  itemList: Item[] = []
  itemsSub: Subscription
  itemInfoSub: Subscription
  errSub: Subscription
  error: HttpErrorResponse

  constructor (
    private db$: DbService,
    private resolver: ComponentFactoryResolver
  ) { }

  ngOnInit() {
    this.drawItemList()
  }

  drawItemList() {
    this.itemsSub = this.db$.getAllItems().subscribe(items => {
      this.itemList = items
    },
      err => this.error = err
    )
  }

  showItemInfo($event: number) {
    this.itemInfoSub = this.db$.getItemInfo($event).subscribe(data => {
      const itemInfoFactory = this.resolver.resolveComponentFactory(ItemInfoComponent)
      this.itemInfoContainer.clear()
      const itemInfoComponent = this.itemInfoContainer.createComponent(itemInfoFactory)
      itemInfoComponent.instance.itemDescription = data
    },
      err => this.error = err
    )
  }


  ngOnDestroy() {
    if (this.itemsSub) this.itemsSub.unsubscribe()
    if (this.itemInfoSub) this.itemInfoSub.unsubscribe()
  }
}
