import {BasePage} from './BasePage';

export class LoginPage extends BasePage {
  get elements(): Locators {
    return new Locators();
  }

  get url(): string {
    return `${Cypress.config('baseUrl')}/login`;
  }

  login(username: string, password: string): void {
    if (username) {
      this.elements.inputUsername.type(username);
    } else {
      this.elements.inputUsername.clear();
    }
    if (password) {
      this.elements.inputPassword.type(password);
    } else {
      this.elements.inputPassword.clear();
    }
  }

  checkVerifyHuman() {
    cy.log('I am a Robot not a Human 😔');
  }
}

class Locators {
  get inputUsername() {
    return cy.get('input[name="emailOrUsername"]');
  }

  get inputPassword() {
    return cy.get('input[name="password"]');
  }

  get buttonLogin() {
    return cy.get('button[data-testid="submitButton"]');
  }
}
