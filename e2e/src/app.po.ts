import {$, $$, browser, by, element, WebElement} from 'protractor';

export class AppPage {
  async navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl);
  }

  async getRootElement(): Promise<WebElement> {
    return $$('main mat-tree mat-tree-node').first()
  }

  async getExpandButton(): Promise<WebElement> {
    return $$('main mat-tree mat-tree-node button').first()
  }

  async getSpinner(): Promise<WebElement> {
    return $('.spinner');
  }

  async getInfoComponent(): Promise<WebElement> {
    return $('app-item-info table');
  }

}
