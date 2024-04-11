import {PageManager} from './page-objects/PageManager';

const pageManager = new PageManager();
describe('Login Page', () => {
  beforeEach(() => {
    cy.bypassVerifyAgeViaCookie();
    cy.visit(pageManager.loginPage.url);
  });

  before(function () {
    cy.fixture('login-credentials').then((user) => {
      this.username =
        user.username +
        user.username2part +
        user.username3part +
        user.username4part +
        user.username5part;
      this.password = user.password;
    });
  });

  it('username provided password not, login button disabled', function () {
    pageManager.loginPage.login(this.username, '');
    pageManager.loginPage.elements.buttonLogin.should('be.disabled');
  });

  it('password provided username not, login button disabled', function () {
    pageManager.loginPage.login('', this.password);
    pageManager.loginPage.elements.buttonLogin.should('be.disabled');
  });

  it('username and password not provided, login button disabled', function () {
    pageManager.loginPage.login('', '');
    pageManager.loginPage.elements.buttonLogin.should('be.disabled');
  });

  it('allows user alison_broadcaster:alison to log in', function () {
    pageManager.loginPage.login(this.username, this.password);
    pageManager.loginPage.checkVerifyHuman();
  });
});
