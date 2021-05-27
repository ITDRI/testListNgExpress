import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Item, ItemInfo, Dictionary, TableItemInfo} from '../shared/interfaces';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class DbService {

  dictionary: Dictionary = {
    id: 'No',
    description: 'Описание',
    size: 'Размер',
    relation: 'Отношение',
    visibility: 'Видимость',
    color: 'Цвет'
  }

  constructor (private http$: HttpClient) { }

  getAllItems(): Observable<Item[]> {
    return this.http$.get(`${environment.apiUrl}/items`)
      .pipe(
        map((e: Item[]) => this.preparePlainDataToTree(e))
      )
  }

  getItemInfo(id: number): Observable<TableItemInfo[]> {
    return this.http$.get<ItemInfo>(`${environment.apiUrl}/item-info/${id}`).pipe(
      map(e => this.prepareInfoData(e))
    )
  }

  preparePlainDataToTree(items: Item[]): Item[] {
    const tree = []
    const childrensToParent = {}

    items.forEach(e => {
      childrensToParent[e.id] = e
      childrensToParent[e.id]['children'] = []
    })

    for (let id in childrensToParent) {
      const curElem = childrensToParent[id]

      if (childrensToParent.hasOwnProperty(id)) {

        if (curElem.parentId) {
          const parentOfCurElem = childrensToParent[curElem['parentId']]
          parentOfCurElem['children'].push(curElem)
        } else {
          tree.push(curElem)
        }

      }
    }
    return tree
  }

  prepareInfoData(data: ItemInfo): TableItemInfo[] {
    return Object.entries(data)
      .filter(e => !e[0].startsWith('_'))
      .reduce((res, e) => {
        const item = {}
        item['key'] = String(e[0])
        item['value'] = String(e[1])
        item['mappedKey'] = String(this.dictionary[e[0]])
        res.push(item)
        return res
      }, [])
  }
}
