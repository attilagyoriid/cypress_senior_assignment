import {PageManager} from './page-objects/PageManager';

const pageManager = new PageManager();
describe('Home Page', () => {
  beforeEach(() => {
    cy.visit(pageManager.homePage.url);
  });

  it('prompts to verify age at first visit, ', () => {
    const expectedTerms = 'EPLAY.com - TERMS OF SERVICE';

    cy.log('Checking Age Verification Prompt appeared at first visit');
    pageManager.ageVerifyPrompt.elements.id.contains('a', expectedTerms);

    cy.log('Checking first time visit: cookie:first-visit is true');
    cy.getCookie('first-visit').should('have.property', 'value', 'true');
  });

  it('verify "No thanks, Ill leave" link redirection, ', () => {
    const expectedRedirectUrl = 'https://google.com';

    cy.log(
      'Checking redirection to google.com when selecting the No thanks, Ill leave link',
    );
    pageManager.ageVerifyPrompt.elements.linkNoThanks.should(
      'have.attr',
      'href',
      expectedRedirectUrl,
    );
  });

  it('verify state after clicking on "I Agree", ', () => {
    const homePageUrl = pageManager.homePage.url;

    cy.log('Entering page by clicking I Agree button');
    pageManager.ageVerifyPrompt.clickOnAgree();

    cy.log('Checking Age Verification Prompt disappeared');
    pageManager.ageVerifyPrompt.elements.id.should('not.exist');

    cy.log('Checking url points at home page');
    cy.location('href').should('equal', homePageUrl);

    cy.log('Checking first time visit: cookie:first-visit is false');
    cy.getCookie('first-visit').should('have.property', 'value', 'false');
  });
});
