import {BasePage} from '../pages/BasePage';

export class AgeVerifyPrompt extends BasePage {
  get url(): string {
    return `${Cypress.config('baseUrl')}`;
  }

  get elements(): Locators {
    return new Locators();
  }

  bypassPromptWithCookie(): void {
    cy.bypassVerifyAgeViaCookie();
  }

  clickOnAgree(): void {
    this.elements.linkIAgree.click({force: true});
  }
}

class Locators {
  get id() {
    return cy.get('#first-visit');
  }

  get linkIAgree() {
    return this.id.contains('I Agree');
  }

  get linkNoThanks() {
    return this.id.contains('a', 'No thanks');
  }
}
