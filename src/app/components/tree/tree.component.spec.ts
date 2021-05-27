import {TestBed, ComponentFixture} from '@angular/core/testing';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';
import {MatTreeHarness} from '@angular/material/tree/testing';
import {HarnessLoader} from '@angular/cdk/testing';
import {MatTreeModule} from '@angular/material/tree';
import {MatIconModule} from '@angular/material/icon';
import {TreeComponent} from './tree.component';
import {expectedItemsWithSomeRoots, rootStructure, firstRootExpandedStructure} from 'src/app/shared/mockTestData';


describe('Treecomponent unit тесты', () => {
  let component: TreeComponent

  beforeEach(() => {
    component = new TreeComponent()
  });

  it('Должен иметь свойство с данными для построения дерева элементов', () => {
    expect(component.itemList).toBeDefined();
    expect(component.itemList).toEqual([]);
  });

  it('Должен иметь свойство для передачи выбранного элемента в компонент отрисовки инфо об элементе и корректно его обрабатывать', () => {
    expect(component.onShowInfo).toBeDefined();
    component.onShowInfo.subscribe(id => {
      expect(id).toBe(22)
    });
    component.showInfo(22)
  });


})




describe('Treecomponent интеграционные тесты', () => {
  let component: TreeComponent
  let fixture: ComponentFixture<TreeComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatTreeModule, MatIconModule],
      declarations: [TreeComponent]
    }).compileComponents();
    fixture = TestBed.createComponent(TreeComponent);
    component = fixture.componentInstance
    component.itemList = expectedItemsWithSomeRoots
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('Должен корректно определять количество корневых и дочерних элементов', async () => {

    const tree = await loader.getHarness(MatTreeHarness);
    const treeDescendants = await tree.getNodes();

    expect(treeDescendants.length).toBe(3);

    await treeDescendants[0].expand();

    expect((await tree.getNodes()).length).toBe(5);
  });

  it('Должен корректно отрисовывать узел с текстом', async () => {
    const tree = await loader.getHarness(MatTreeHarness);
    const treeNodes = await tree.getNodes({text: /some group/});
    expect(treeNodes.length).toBe(3);
    const secondGroup = treeNodes[0];

    expect(await secondGroup.getText()).toBe('some group A');
    expect(await secondGroup.getLevel()).toBe(1);
    expect(await secondGroup.isDisabled()).toBe(false);
    expect(await secondGroup.isExpanded()).toBe(false);
  });

  it('Должен корректно отрисовывать структуру дерева', async () => {
    const tree = await loader.getHarness(MatTreeHarness);

    expect(await tree.getTreeStructure()).toEqual(rootStructure);

    const firstGroup = (await tree.getNodes({text: /some group A/}))[0];
    await firstGroup.expand();

    expect(await tree.getTreeStructure()).toEqual(firstRootExpandedStructure);
  });



});

