import {AppPage} from './app.po'
import {browser, logging, $$, $} from 'protractor'

describe('workspace-project App', () => {
  let page: AppPage

  const ROOTS_COUNT = 5
  const INFOTABLE_ROWSCOUNT = 7

  beforeEach(() => {
    page = new AppPage()
  })

  it('Должен отображать спиннер до загрузки данных с бэкенда', async () => {
    await page.navigateTo()
    const spinner = await page.getSpinner()
    spinner.isDisplayed()
  })

  it('Должен отображать древовидный список элементов при загрузке приложения', async () => {
    await page.navigateTo()
    const root = await page.getRootElement()
    root.isDisplayed()

    let rootsCount = await $$('main mat-tree mat-tree-node').count();
    expect(rootsCount).toBe(ROOTS_COUNT);
  })

  it('Должен раскрывать древовидный список элементов по клику на элемент управления', async () => {
    await page.navigateTo();
    const root = await page.getRootElement()
    const expandBtn = await page.getExpandButton()
    await expandBtn.click()
    const attrExpanded = await root.getAttribute('aria-expanded')
    expect(attrExpanded).toEqual('true');
  })

  it('Должен скрывать древовидный список элементов по повторному клику на элемент управления', async () => {
    await page.navigateTo();
    const root = await page.getRootElement()
    const expandBtn = await page.getExpandButton()
    await expandBtn.click()
    await expandBtn.click()
    const attrExpanded = await root.getAttribute('aria-expanded')
    expect(attrExpanded).toEqual('false')
  })

  it('Должен загружать компонент инфо об элементе по клику на элемент', async () => {
    await page.navigateTo()
    const root = await page.getRootElement()
    await root.click()

    const tableInfoComponent = await page.getInfoComponent()
    expect(tableInfoComponent.isDisplayed())

    const tableInfoComponentRowsCount = await $$('app-item-info table tr').count();
    expect(await tableInfoComponentRowsCount).toBe(INFOTABLE_ROWSCOUNT);

  })

  it('Должен загружать в таблицу инфо информацию о конкретном элементе на который кликнули', async () => {
    await page.navigateTo()
    const roots = await $$('main mat-tree mat-tree-node')
    const count = await $$('main mat-tree mat-tree-node').count()
    const rand = Math.round(Math.random() * count)
    await roots[rand].click()

    const currentItemIdCell = await $('app-item-info table tbody tr:first-child .mat-column-value').getText();
    expect(currentItemIdCell).toBe(String(rand + 1));

  })




  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry))
  });
});
