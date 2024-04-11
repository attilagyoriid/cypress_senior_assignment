import {ViewPortManager} from '../support/viewport/viewPortManager';
import {PageManager} from './page-objects/PageManager';

const pageManager = new PageManager();
const viewPortManager = ViewPortManager.getInstance();
describe(
  'Live Page',
  {
    retries: {
      runMode: 1,
      openMode: 0,
    },
  },
  () => {
    beforeEach(() => {
      cy.bypassVerifyAgeViaCookie();
      cy.visit(pageManager.livePage.url);
    });

    it(
      'chat button is on the bottom in portrait mobile',
      {execTimeout: 12000},
      () => {
        cy.viewport('iphone-8', 'portrait');

        // verifyViewportPositionOfElementTo works in this case, I suppose this is the default orientation of the viewport, so cypress wont change it runtime
        // this solution is dynamic to the actual dimensions of the viewport
        viewPortManager.verifyViewportPositionOfElementTo(
          'bottom',
          pageManager.livePage.elements.buttonSendChat,
        );

        viewPortManager.verifyElementPositionRelativeToOtherElement(
          'bottom',
          pageManager.livePage.elements.buttonSendChat,
          pageManager.livePage.elements.inputMessageType,
        );
      },
    );

    // cy.viewport change does not take effect
    it(
      'chat button is on the right side on landscape mobile',
      {execTimeout: 12000},
      () => {
        cy.viewport('iphone-8', 'landscape');
        cy.log(
          'After landscape rotate viewportWidth and viewportHeight doesnt reflect the proper values',
        );
        // After rotating viewport with cy.viewport at runtime, the actual width and height does not get reflected
        // viewPortManager.verifyViewportPositionOfElementTo(
        //   'right',
        //   pageManager.livePage.elements.buttonSendChat,
        // );

        // This function verifies element position relative to other element position - as a workaround for the viewport dimensions problem mentioned above
        viewPortManager.verifyElementPositionRelativeToOtherElement(
          'right',
          pageManager.livePage.elements.buttonSendChat,
          pageManager.livePage.elements.inputMessageType,
        );
      },
    );
  },
);
