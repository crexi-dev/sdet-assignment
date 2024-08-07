/* eslint-disable @typescript-eslint/no-explicit-any */
import { test, expect, type Locator } from '@playwright/test';
import { LogInPage } from '../pages/login.page';
import { PropertiesPage } from '../pages/properties.page';
import {
  readJsonFile,
  containsAnySubstrings,
  isFiveDigitNumber,
  getStateCode,
} from '../utils/helpers';
import path from 'path';
const env = process.env.ENV || 'prod';
//loading the search.json to create the parameterized tests
const logins = readJsonFile(path.join(__dirname, `../test_data/${env}/logins.json`));
const searchTestData = readJsonFile(path.join(__dirname, `../test_data/${env}/search.json`));

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
  minimumFractionDigits: 0,
});

test.describe('Search by Location Tests', () => {
  test.slow();
  searchTestData.sale.forEach(({ name, locations, expectedCount }) => {
    test.describe(() => {
      test.beforeEach(async ({ page }) => {
        await page.goto(process.env.BASE_URL!);
        const loginPage = new LogInPage(page);
        await loginPage.logIn(logins.logins[1].email, logins.logins[1].password);
      });

      test(name, async ({ page }) => {
        const propertiesPage = new PropertiesPage(page);

        //First make sure the request is the correct one
        //checking for the 'locations' key
        const requestPromise = page.waitForRequest(
          (req) =>
            req.url().includes('/assets/search') &&
            req.method() === 'POST' &&
            req.postData() != null &&
            req.postData()!.includes('locations')
        );
        //This does the search on the website.
        await propertiesPage.search(locations);
        await page.waitForLoadState('domcontentloaded');
        //After doing the search and pressing the applyFilter button
        //we capture the response here.
        const request = await requestPromise;
        const response = await request.response();
        const responseJson = await response!.json();

        //verify the results are filtered correctly
        const filtered = await verifySearchFilter(locations, responseJson.data);
        expect(filtered).toEqual(0);
        if (expectedCount) {
          expect(responseJson.totalCount).toEqual(expectedCount);
        }

        await propertiesPage.searchResults.last().waitFor({ state: 'visible' });
        const searchResuls = await propertiesPage.searchResults.all();

        await verifySearchData(searchResuls, responseJson.data);
      });
    });
  });
});

/*
    This function checks for the location type (city, zipcode, county, state)
    based on the search term
      - if it cointains a comma but its not a county it's a city.
      - if it countains county, parish, Borough, Census Area it's a county.
      - for a state it checks if its one of the 50 states.
      - 5 digit number is a zipcode

      It would probably be better to just have the location type in search.json
      to prevent any possible issues infering the type.

      Filters the '/assets/search' response array if it matches one of the
      locations.

      returns the size of the filtered apiResponse.
      Should always be 0 as we want every item to match at least one location.
  */

async function verifySearchFilter(locations: string[], apiResponse: Record<string, any>) {
  //iterate locations
  let filteredResp = apiResponse;
  for (const location of locations) {
    //if true then the location search string is a county
    if (containsAnySubstrings(location, ['County', 'Parish', 'Borough', 'Census Area'])) {
      filteredResp = filteredResp.filter((item) => {
        item.locations.some((loc) => loc.county === location);
      });
    }
    //if true then the location search string is a city
    else if (location.includes(',')) {
      filteredResp = filteredResp.filter((item) => {
        item.locations.some((loc) => loc.city === location);
      });
    }
    //if true then the location search string is a zip
    else if (isFiveDigitNumber(location)) {
      filteredResp = filteredResp.filter((item) => {
        item.locations.some((loc) => loc.zip === location);
      });
    }
    //if true then the location search string is a state
    else if (!getStateCode(location)) {
      filteredResp = filteredResp.filter((item) => {
        item.locations.some((loc) => loc.state.name === location);
      });
    }
  }
  return filteredResp.length;
}

/*
  This function gets all the searchResults from the page and compares the
  property details under tileContent and compares it to the api response.
  Have to format some results from the response to be the same as on the UI.
*/
async function verifySearchData(uiSearchResults: Locator[], apiResponse: Record<string, any>) {
  for (let i = 0; i < uiSearchResults.length; ++i) {
    const tileContent = uiSearchResults[i];
    const responseItem = apiResponse[i];
    const propertyPrice = await tileContent.getByTestId('propertyPrice').textContent();
    const propertyName = await tileContent.getByTestId('propertyName').textContent();
    const propertyDesc = await tileContent.getByTestId('propertyDescription').textContent();
    const propertyAddress = await tileContent.getByTestId('propertyAddress').textContent();
    //console.log(responseItem);
    if (responseItem.hasOwnProperty.call('askingPrice')) {
      expect(propertyPrice).toEqual(formatter.format(responseItem.askingPrice));
    }
    if (responseItem.hasOwnProperty.call('propertyName')) {
      expect(propertyName).toEqual(responseItem.name);
    }
    if (responseItem.hasOwnProperty.call('propertyDescription')) {
      expect(propertyDesc?.replace('|', '•')).toEqual(responseItem.description);
    }

    let fullAddress: string;
    //if there are more than 1 location it says the amount + LOCATIONS;
    if (responseItem.locations.length > 1) {
      fullAddress = responseItem.locations.length + ' LOCATIONS';
      //create the full address from the response
    } else {
      const location = responseItem.locations[0];
      fullAddress =
        location.address + ' ' + location.city + ', ' + location.state.code + ' ' + location.zip;
    }

    expect(propertyAddress?.trim()).toEqual(fullAddress);
  }
}
