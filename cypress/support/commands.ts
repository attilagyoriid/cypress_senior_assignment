/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

// Cypress.Commands.add('command', () => {});

import {PageManager} from '../e2e/page-objects/PageManager';

const pageManager = new PageManager();
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      agreeVerifyAge(): Chainable<Element>;
      bypassVerifyAgeViaCookie(): Chainable<Element>;
      waitForViewportChange(width: number, height: number): Chainable<Element>;
    }
  }
}
/**
 * Accepting Age Verification Prompt by clicking on "I Agree" link
 */
Cypress.Commands.add('agreeVerifyAge', () => {
  pageManager.ageVerifyPrompt.clickOnAgree();
  pageManager.ageVerifyPrompt.elements.id.should('not.exist');
});

/**
 * Bypassing Age Verification Prompt by setting cookie "first-visit" to be false
 */
Cypress.Commands.add('bypassVerifyAgeViaCookie', () => {
  const cookieKey = 'first-visit';
  const cookieValue = 'true';
  cy.setCookie(cookieKey, 'false', {
    domain: 'cypress-test.eplay.com',
  });
  cy.log(
    `Setting cookie: ${cookieKey} to be ${cookieValue} bypassing Verify Age Prompt`,
  );
});

/**
 * Wait for viewport to reflect proper height and width after changing viewport parameters
 */
Cypress.Commands.add(
  'waitForViewportChange',
  (width: number, height: number) => {
    cy.then(() => {
      return new Cypress.Promise<void>((resolve) => {
        const checkViewport = () => {
          if (
            Cypress.config('viewportWidth') === width &&
            Cypress.config('viewportHeight') === height
          ) {
            resolve();
          } else {
            setTimeout(checkViewport, 2000);
          }
        };
        checkViewport();
      });
    });
  },
);
