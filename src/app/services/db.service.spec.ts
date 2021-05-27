import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {DbService} from './db.service';
import {environment} from 'src/environments/environment';
import * as MOCKDATA from '../shared/mockTestData';


describe('DbService', () => {
  let dbService: DbService
  let httpTestingController: HttpTestingController

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DbService]
    })

    dbService = TestBed.inject(DbService)
    httpTestingController = TestBed.inject(HttpTestingController)
    dbService.dictionary = MOCKDATA.mockDictionary

  });

  it('Должен создавать экземпляр класса DbService', () => {
    expect(dbService).toBeDefined();
  });


  it('Должен содержать свойство с локализаций инфо об элементе дерева', () => {
    expect(dbService.dictionary).toBeDefined()
  });


  it('Метод preparePlainDataToTree() должен трансформировать список элементов в древовидный объект - (Один корневой узел)', () => {
    expect(dbService.preparePlainDataToTree(MOCKDATA.mockHttpItemsWithsOneRoot)).toEqual(MOCKDATA.expectedItemsWithsOneRoot)
  });


  it('Метод preparePlainDataToTree() должен трансформировать список элементов в древовидный объект - (Несколько корневых узлов)', () => {
    expect(dbService.preparePlainDataToTree(MOCKDATA.mockHttpItemsWithSomeRoots)).toEqual(MOCKDATA.expectedItemsWithSomeRoots)
  });


  it('Метод preparePlainDataToTree() должен трансформировать список элементов в древовидный объект - (Все узлы корневые)', () => {
    expect(dbService.preparePlainDataToTree(MOCKDATA.mockHttpItemsWithAllroots)).toEqual(MOCKDATA.expectedItemsWithAllroots)
  });


  it('Метод prepareInfoData() должен трансформировать инфо об элементе в таблицу свойств', () => {
    expect(dbService.prepareInfoData(MOCKDATA.mockHttpItemInfoData)).toEqual(MOCKDATA.mockItemInfo)
  });


  it('Метод getAllItems() должен совершать один запрос и возвращать элементы дерева', () => {
    const fakepreparePlainDataToTree = spyOn(dbService, 'preparePlainDataToTree').and.returnValue(MOCKDATA.expectedItemsFromMethod)
    dbService.getAllItems().subscribe(
      items => {
        expect(fakepreparePlainDataToTree).toHaveBeenCalledWith(MOCKDATA.mockHttpItemsDataToMethod)
        expect(items).toEqual(MOCKDATA.expectedItemsFromMethod)
      },
      fail
    );
    const request = httpTestingController.expectOne(`${environment.apiUrl}/items`)
    expect(request.cancelled).toBeFalsy()
    expect(request.request.responseType).toBe('json')
    request.flush(MOCKDATA.mockHttpItemsDataToMethod)
  });


  it('Метод getItemInfo() должен совершать один запрос и возвращать информацию об элементе дерева по id элемента', () => {
    const fakeprepareInfoData = spyOn(dbService, 'prepareInfoData').and.returnValue(MOCKDATA.mockItemInfo)
    dbService.getItemInfo(1).subscribe(
      items => {
        expect(fakeprepareInfoData).toHaveBeenCalledWith(MOCKDATA.mockHttpInfoDataToMethod)
        expect(items).toEqual(MOCKDATA.mockItemInfo)
      },
      fail
    );
    const request = httpTestingController.expectOne(`${environment.apiUrl}/item-info/1`)
    expect(request.cancelled).toBeFalsy()
    expect(request.request.responseType).toEqual('json')
    request.flush(MOCKDATA.mockHttpInfoDataToMethod)
    httpTestingController.verify()
  });

});
