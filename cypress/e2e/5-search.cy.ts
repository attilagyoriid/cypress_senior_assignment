import {PageManager} from './page-objects/PageManager';

const pageManager = new PageManager();
describe('Search Page', () => {
  beforeEach(() => {
    cy.bypassVerifyAgeViaCookie();
    cy.visit(pageManager.homePage.url);
  });
  it('we display the same number of live results as what we receive from the search API', () => {
    cy.task('getLiveStreamsCount').then((expectedLiveStreamCount) => {
      cy.log(`Number of live streams via reponse: ${expectedLiveStreamCount}`);
      pageManager.homePage.elements.liveStreams.should(
        'have.length',
        expectedLiveStreamCount,
      );
    });
  });
});
