import { test, expect, BrowserContext } from '@playwright/test';
import { readJsonFile } from '../utils/helpers';
import { LogInPage } from '../pages/login.page';
import { PropertiesPage } from '../pages/properties.page';
import path from 'path';
const env = process.env.ENV || 'prod';

const logins = readJsonFile(path.join(__dirname, `../test_data/${env}/logins.json`));

test.beforeEach(async ({ page }) => {
  await page.goto(process.env.BASE_URL!);
  const loginPage = new LogInPage(page);
  await loginPage.logIn(logins.logins[0].email, logins.logins[0].password);
});

test('View Property Details', async ({ page, context }) => {
  test.slow();
  const propertiesPage = new PropertiesPage(page);
  const requestPromise = page.waitForRequest(
    (req) =>
      req.url().includes('/assets/search') &&
      req.method() === 'POST' &&
      req.postData() != null &&
      req.postData()!.includes('locations')
  );

  await propertiesPage.search(['Redondo Beach']);
  await requestPromise;
  //clicks a search result based on index zero based
  await clickSearchItem(0, propertiesPage, context);
});

/*
  Clicks a link and opens search result in a new tab
  verifies the info on the property page matches the search item clicked.
*/
async function clickSearchItem(
  index: number,
  propertyPage: PropertiesPage,
  context: BrowserContext
) {
  await propertyPage.searchResults.last().waitFor({ state: 'visible' });
  const results = await propertyPage.searchResults.all();
  const tileContent = results[index];

  let propertyAddress = await tileContent.getByTestId('propertyAddress').textContent();
  const spanAddress = await tileContent
    .getByTestId('propertyAddress')
    .locator('span')
    .textContent();

  //the location from the search card is on two lines and missing a comma so add the comma
  //to compare it to the location from the page title
  const spanIndex = propertyAddress!.indexOf(spanAddress!);
  if (spanIndex !== -1) {
    // Insert a comma before the span text
    propertyAddress =
      propertyAddress!.slice(0, spanIndex).trim() + ', ' + propertyAddress!.slice(spanIndex).trim();
  }
  //opens in a new tab so chained with promise
  const newPagePromise = context.waitForEvent('page');
  await results[index].locator('..').getByRole('link').click();

  const newPage = await newPagePromise;
  await newPage.waitForLoadState();
  //firefox wasn't waiting load event
  await newPage.waitForLoadState('networkidle');

  let title = await newPage.title();
  title = title.split('|')[0].trim(); //remove the | Crexi.com

  //verify the correct item was opened by comparing the page title to the address
  expect(title).toEqual(propertyAddress);

  //to fully verify the property page details we would check the api response
  //and compare to the ui details but that would probably be another test.
}
