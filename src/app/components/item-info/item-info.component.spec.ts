import {TestBed, ComponentFixture} from '@angular/core/testing';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';
import {MatTableHarness} from '@angular/material/table/testing';
import {HarnessLoader, parallel} from '@angular/cdk/testing';
import {MatTableModule} from '@angular/material/table';
import {ItemInfoComponent} from './item-info.component';
import {TableItemInfo} from 'src/app/shared/interfaces';

const mockItemInfo: TableItemInfo[] = [
  {key: 'id', value: '1', mappedKey: 'test local id'},
  {key: 'description', value: 'test description ', mappedKey: 'test local description'},
  {key: 'size', value: 'test size', mappedKey: 'test local size'},
  {key: 'relation', value: 'test relation', mappedKey: 'test local relation'},
  {key: 'visibility', value: 'test visibility', mappedKey: 'test local visibility'},
  {key: 'color', value: 'test color', mappedKey: 'test local color'},
]


describe('ItemInfoComponent unit тесты', () => {
  let component: ItemInfoComponent

  beforeEach(() => {
    component = new ItemInfoComponent()
  });

  it('Должен иметь свойство с данными для построения таблицы', async () => {
    expect(component.itemDescription).toEqual([]);
  });

  it('Должен иметь свойство, содержащее конфигурацию отрисовываемых колонок', async () => {
    expect(component.displayedColumns).toEqual(['key', 'value']);
  });

})



describe('ItemInfoComponent интеграционные тесты', () => {
  let component: ItemInfoComponent
  let fixture: ComponentFixture<ItemInfoComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatTableModule],
      declarations: [ItemInfoComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ItemInfoComponent)
    component = fixture.componentInstance
    component.itemDescription = mockItemInfo
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('Должен отрисовывать таблицу', async () => {
    const tables = await loader.getAllHarnesses(MatTableHarness);
    expect(tables.length).toBe(1);
  });

  it('Должен корректно отрисовывать строки в таблице', async () => {
    const table = await loader.getHarness(MatTableHarness);
    const headerRows = await table.getHeaderRows();
    const rows = await table.getRows();
    expect(headerRows.length).toBe(1);
    expect(rows.length).toBe(6);
  });

  it('Должен корректно отрисовывать ячейки ряда', async () => {
    const table = await loader.getHarness(MatTableHarness);
    const headerRows = await table.getHeaderRows();
    const rows = await table.getRows();
    const headerCells = (await parallel(() => headerRows.map(row => row.getCells())))
      .map(row => row.length);
    const cells = (await parallel(() => rows.map(row => row.getCells())))
      .map(row => row.length);

    expect(headerCells).toEqual([2]);
    expect(cells).toEqual([2, 2, 2, 2, 2, 2]);
  });

  it('Должен корректно отрисовывать текст ячеек', async () => {
    const table = await loader.getHarness(MatTableHarness);
    const secondRow = (await table.getRows())[1];
    const cells = await secondRow.getCells();
    const cellTexts = await parallel(() => cells.map(cell => cell.getText()));
    expect(cellTexts).toEqual(['test local description', 'test description']);
  });

  it('Должен корректно отрисовывать имя столбцов с учетом локализации', async () => {
    const table = await loader.getHarness(MatTableHarness);
    const fifthRow = (await table.getRows())[1];
    const cells = await fifthRow.getCells();
    const cellColumnNames = await parallel(() => cells.map(cell => cell.getColumnName()));
    expect(cellColumnNames).toEqual(['key', 'value']);
  });


});

