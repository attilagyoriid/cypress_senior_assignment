export class ViewPortManager {
  private static instance: ViewPortManager;
  private constructor() {}

  public static getInstance(): ViewPortManager {
    if (!ViewPortManager.instance) {
      ViewPortManager.instance = new ViewPortManager();
    }
    return ViewPortManager.instance;
  }

  /**
   * verifies elements proximity to viewport dimensions
   * @param position 'right' | 'bottom' of viewport
   * @param locator cypress locator
   * @param threshold proximity accepted to viewport side
   */
  public verifyViewportPositionOfElementTo(
    position: position,
    locator: Cypress.Chainable<JQuery<HTMLElement>>,
    threshold: number = 100,
  ): void {
    const viewportHeight = Cypress.config('viewportHeight');
    const viewportWidth = Cypress.config('viewportWidth');
    cy.log(
      `Actual viewport width:${viewportWidth} and height:${viewportHeight}`,
    );
    locator.then((targetElement) => {
      const elementRect = targetElement[0].getBoundingClientRect();

      switch (position) {
        case 'bottom': {
          expect(viewportHeight - elementRect.bottom).to.be.lessThan(threshold);
          break;
        }
        case 'right': {
          expect(viewportWidth - elementRect.right).to.be.lessThan(threshold);
          break;
        }
        default: {
          break;
        }
      }
    });
  }

  /**
   * verifies element position relative to other element
   * @param position verifies element position relative to other element
   * @param locatorOfElementToVerifyPosition cypress locator of element to verify its position relative to other locator
   * @param locatorOfRelativeElementToCompare cypress locator of element as a reference element to compare its relative position to the element to verify
   */
  public verifyElementPositionRelativeToOtherElement(
    position: position,
    locatorOfElementToVerifyPosition: Cypress.Chainable<JQuery<HTMLElement>>,
    locatorOfRelativeElementToCompare: Cypress.Chainable<JQuery<HTMLElement>>,
  ): void {
    locatorOfElementToVerifyPosition.then((elemToVerifyLocation) => {
      // Get the second element
      locatorOfRelativeElementToCompare.then((relativeElement) => {
        // Get the position of both elements
        const elementToVerifyPosition = elemToVerifyLocation.position();
        const relativeElementPosition = relativeElement.position();
        switch (position) {
          case 'bottom': {
            expect(relativeElementPosition.top).to.be.lessThan(
              elementToVerifyPosition.top,
            );
            break;
          }
          case 'right': {
            expect(relativeElementPosition.left).to.be.lessThan(
              elementToVerifyPosition.left,
            );
            break;
          }
          default: {
            break;
          }
        }
      });
    });
  }
}

type position = 'right' | 'bottom';
