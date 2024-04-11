import {AgeVerifyPrompt} from './components/AgeVerifyPrompt';
import {HomePage} from './pages/HomePage';
import {LivePage} from './pages/LivePage';
import {LoginPage} from './pages/LoginPage';

export class PageManager {
  private readonly _ageVerifyPrompt: AgeVerifyPrompt;
  private readonly _homePage: HomePage;
  private readonly _loginPage: LoginPage;
  private readonly _livePage: LivePage;

  constructor() {
    this._ageVerifyPrompt = new AgeVerifyPrompt();
    this._homePage = new HomePage();
    this._loginPage = new LoginPage();
    this._livePage = new LivePage();
  }

  get ageVerifyPrompt() {
    return this._ageVerifyPrompt;
  }

  get homePage() {
    return this._homePage;
  }

  get loginPage() {
    return this._loginPage;
  }

  get livePage() {
    return this._livePage;
  }
}
