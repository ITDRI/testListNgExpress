import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {MatTreeModule} from '@angular/material/tree';
import {MatIconModule} from '@angular/material/icon';
import {By} from '@angular/platform-browser';
import {of, throwError} from 'rxjs';
import {AppComponent} from './app.component';
import {ItemInfoComponent} from './components/item-info/item-info.component';
import {TreeComponent} from './components/tree/tree.component';
import {DbService} from './services/db.service';
import {expectedItemsWithSomeRoots, mockItemInfo} from './shared/mockTestData';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatCardModule} from '@angular/material/card';
import {HttpErrorResponse} from '@angular/common/http';








describe('AppComponent', () => {
  let component: AppComponent
  let fixture: ComponentFixture<AppComponent>
  let dbService: DbService
  const fakeError = 'Fake error'
  const fakeDbService = jasmine.createSpyObj(['getAllItems', 'getItemInfo'])

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatTreeModule,
        MatIconModule,
        MatButtonModule,
        MatTableModule,
        MatSortModule,
        MatProgressSpinnerModule,
        MatCardModule
      ],
      declarations: [AppComponent, TreeComponent, ItemInfoComponent],
      providers: [{provide: DbService, useValue: fakeDbService}]
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance
    dbService = TestBed.inject(DbService)
    fakeDbService.getItemInfo.calls.reset()
  });




  it('Должен создавать экземпляр класса', () => {
    expect(component).toBeDefined();
  });

  it('Должен иметь свойство с данными для построения дерева элементов', () => {
    expect(component.itemList).toBeDefined();
    expect(component.itemList).toEqual([]);
  });


  it('Должен загружать данные для построения дерева при инициализации', () => {
    fakeDbService.getAllItems.and.returnValue(of(expectedItemsWithSomeRoots))
    fixture.detectChanges()
    expect(component.itemList).toEqual(expectedItemsWithSomeRoots)
  });


  it('Должен отрисовывать дерево после получения данных', () => {
    fakeDbService.getAllItems.and.returnValue(of(expectedItemsWithSomeRoots))
    fixture.detectChanges()
    const tree = fixture.debugElement.queryAll(By.css('mat-tree-node'))
    expect(tree.length).toBe(expectedItemsWithSomeRoots.length)
  });


  it('Должен отрисовывать ошибку при проблемах с получением данных для построения дерева', () => {
    fakeDbService.getAllItems.and.returnValue(throwError(new HttpErrorResponse({error: {message: fakeError}})))
    fixture.detectChanges()
    const tree = fixture.debugElement.queryAll(By.css('.error_text'))[1]
    expect(tree.nativeElement.textContent).toContain(fakeError)
  });


  it('Должен создавать компонент отрисовки информации об элементе по клику на элемент дерева', () => {
    fakeDbService.getAllItems.and.returnValue(of(expectedItemsWithSomeRoots))
    fakeDbService.getItemInfo.and.returnValue(of(mockItemInfo))
    fixture.detectChanges()

    const element = fixture.debugElement.queryAll(By.css('mat-tree-node'))[1]
    element.triggerEventHandler('click', null)
    fixture.detectChanges()

    expect(fakeDbService.getItemInfo.calls.count()).toBe(1)

    const ItemInfoComponent = fixture.debugElement.queryAll(By.css('app-item-info table tbody tr'))
    expect(ItemInfoComponent.length).toBe(mockItemInfo.length)
  });


  it('Должен отрисовывать ошибку при проблемах в получении данных о выбранном элементе', () => {
    fakeDbService.getAllItems.and.returnValue(of(expectedItemsWithSomeRoots))
    fakeDbService.getItemInfo.and.returnValue(throwError(new HttpErrorResponse({error: {message: fakeError}})))
    fixture.detectChanges()
    const element = fixture.debugElement.queryAll(By.css('mat-tree-node'))[1]
    element.triggerEventHandler('click', null)
    fixture.detectChanges()
    const tree = fixture.debugElement.queryAll(By.css('.error_text'))[1]
    expect(tree.nativeElement.textContent).toContain(fakeError)
  });




});
