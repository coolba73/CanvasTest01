import { CanvasTest01Page } from './app.po';

describe('canvas-test01 App', () => {
  let page: CanvasTest01Page;

  beforeEach(() => {
    page = new CanvasTest01Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
