import { JrFrontendCodeChallengeXkaindlPage } from './app.po';

describe('jr-frontend-code-challenge-xkaindl App', () => {
  let page: JrFrontendCodeChallengeXkaindlPage;

  beforeEach(() => {
    page = new JrFrontendCodeChallengeXkaindlPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
