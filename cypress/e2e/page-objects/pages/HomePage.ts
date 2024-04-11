import {BasePage} from './BasePage';

export class HomePage extends BasePage {
  get elements(): Locators {
    return new Locators();
  }

  get url(): string {
    return `${Cypress.config('baseUrl')}/`;
  }

  bypassPromptWithCookie(): void {
    cy.bypassVerifyAgeViaCookie();
  }

  clickOnAgree(): void {
    this.elements.linkIAgree.click();
  }
}

class Locators {
  get linkIAgree() {
    return cy.contains('I Agree');
  }

  get liveStreams() {
    return cy.get('#channel-grid > a').not(':contains("is OFFLINE")');
  }
}
