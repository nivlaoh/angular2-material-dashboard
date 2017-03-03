import { Material2SeedPage } from './app.po';

describe('material2-seed App', () => {
  let page: Material2SeedPage;

  beforeEach(() => {
    page = new Material2SeedPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
