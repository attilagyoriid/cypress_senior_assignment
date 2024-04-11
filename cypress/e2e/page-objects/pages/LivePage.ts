import {BasePage} from './BasePage';

export class LivePage extends BasePage {
  get elements(): Locators {
    return new Locators();
  }

  get url(): string {
    return `${Cypress.config('baseUrl')}/cypress_live_test/live`;
  }
}

class Locators {
  get buttonSendChat() {
    return cy.get('button[aria-label="Send button"]', {timeout: 6000});
  }

  get inputMessageType() {
    return cy.get('input[placeholder="Type message"]', {timeout: 6000});
  }
}
