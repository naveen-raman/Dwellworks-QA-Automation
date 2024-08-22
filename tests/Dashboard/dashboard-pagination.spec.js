// tests/eCoordPaginationTestCases.spec.js

const { test, expect } = require('@playwright/test');
const locators = require('../../locators/loginLocators'); // Load locators
const testData = require('../../testData/loadTestData'); // Load processed test data

test.describe('Ecoord Dashboard Pagination and Navigation Test Scenarios', () => {

  test.beforeEach('Verify if the user is able to redirect to the home page on successful login', async ({ page }) => {
    await page.goto(locators.loginPageUrl);
    await expect(page).toHaveTitle('Log in', { timeout: 10000 }).catch(() => {
      throw new Error('The login page is not displayed.');
    });
    await page.goto(locators.loginPageUrl);
    await page.fill(locators.emailField, testData.loginTests.validUser.email);
    await page.fill(locators.passwordField, testData.loginTests.validUser.password);
    await page.click(locators.submitButton);
    await expect(page).toHaveURL(locators.dashboardPageUrl, { timeout: 10000 }).catch(() => {
      throw new Error('User is not redirected to the Dashboard page after login.');
    });
    await page.waitForSelector(locators.authorizationRecords, { timeout: 10000 });
  });

  // Test Case 1: Verify the default selection and the number of records displayed when the page loads
 test('Verify the default selection and the number of records displayed when the page loads', async ({ page }) => {
    
  await page.waitForSelector(locators.removeButton, { timeout: 10000 });
    const defaultRecords = await page.locator('//tr//td[1]').count();
    console.log(defaultRecords);
    expect(defaultRecords).toBe(10);

});

   // Test Case 2: Verify that the default page is loaded correctly
  test('Verify that the default page is loaded correctly', async ({ page }) => {

    await page.click(locators.paginationButton);
    await expect(page).toHaveURL(locators.firstPageUrl).catch(() => {
      throw new Error('The first page of the results is not displayed by default.');
    });
  });
 
  
  // Test Case 3: Verify if the user is able to view the Pagination button on the dashboard page
  test('Verify if the user is able to view the Pagination button on the dashboard page', async ({ page }) => {

    await expect(page.locator(locators.paginationButton)).toBeVisible({ timeout: 10000 }).catch(() => {
      throw new Error('Pagination button is not visible on the dashboard page.');
    });
  });


   // Test Case 4: Verify that user can see entries count in the 'Show entries' field
  test('Verify that user can see Show entries values', async ({ page }) => {
    
    await expect(page.locator(locators.showEntriesDropdown)).toBeVisible({ timeout: 10000 }).catch(() => {
      throw new Error('"Show entries" value field is not visible.');
   });
    const showEntriesText = await page.locator(locators.showEntriesDropdown).innerText();
    console.log(showEntriesText)
   
  });

//   // Test Case 5: Verify that clicking 'Next' loads the next set of results
  test('Verify that clicking "Next" loads the next set of results', async ({ page }) => {
   
    await page.click(locators.nextButton);
    await expect(page).toHaveURL(locators.secondPageUrl).catch(() => {
      throw new Error('Next set of results is not displayed after clicking "Next".');
    });
  });

//   // Test Case 6: Verify that clicking 'Previous' loads the previous set of results
  test('Verify that clicking "Previous" loads the previous set of results', async ({ page }) => {

    await page.click(locators.nextButton, { timeout: 5000 });
    await page.click(locators.previousButton, { timeout: 5000 });
    await expect(page).toHaveURL(locators.firstPageUrl).catch(() => {
      throw new Error('Previous set of results is not displayed after clicking "Previous".');
    });
  });

    // Test Case 7: Verify that clicking 'First' loads the first page of results
    test('Verify that clicking "First" loads the first page of results', async ({ page }) => {
    
      await page.click(locators.nextButton, { timeout: 5000 });
      await page.click(locators.firstPageButton);
      await expect(page).toHaveURL(locators.firstPageUrl).catch(() => {
        throw new Error('The first page of results is not displayed after clicking "First".');
      });
    });

//   // Test Case 8: Verify that clicking a specific page number loads that page's results
  test('Verify that clicking a specific page number loads that page results', async ({ page }) => {
   
    await page.click(locators.specificPageNumberButton);
    await expect(page).toHaveURL(locators.secondPageUrl).catch(() => {
      throw new Error('The specific page results is not displayed after clicking the page number.');
    });
  });


//   // Test Case 9: Verify that 'Previous' is disabled on the first page
test('Verify that "Previous" is disabled on the first page', async ({ page }) => {
  const previousButton = await page.$(locators.previousButton);
  const color = await previousButton.evaluate((element) => {
    return window.getComputedStyle(element).borderColor;
  });
  if (color !== 'rgb(221, 221, 221)') { // grey color
    throw new Error('"Previous" button is not disabled on the first page.');
  }
});

//    // Test Case 10: Verify that clicking 'Last' loads the last page of results
   test('Verify that clicking "Last" loads the last page of results', async ({ page }) => {
  
    await page.click(locators.lastPageButton, { timeout: 5000 });
    await expect(page).toHaveURL(locators.lastPageUrl).catch(() => {
      throw new Error('The last page of results is not displayed after clicking "Last".');
    });
  });

//   // Test Case 11: Verify that 'Next' is disabled on the last page
  test('Verify that "Next" is disabled on the last page', async ({ page }) => {
    
  await page.click(locators.lastPageButton, { timeout: 5000 });
  const nextButton = await page.$(locators.nextButton);
  const color = await nextButton.evaluate((element) => {
    return window.getComputedStyle(element).borderColor;
  });
  if (color !== 'rgb(221, 221, 221)') { // grey color
    throw new Error('"Next" button is not disabled on the last page.');
  }
});

   // Test Case 12: Verify the total "tr" count is same

    // Test Case 12: Verify the total "tr" count is same
   // Test Case 12: Verify the total "tr" count is same as when we click the options in the dropdown of show entries

test('Verify that selecting "10/25/50/100" from the "Show entries" dropdown displays corresponding records', async ({ page }) => {

  await page.click(locators.viewAcceptedAuthorizationButton, { timeout: 5000 });

 //const showEntriesDropdown = await page.waitForSelector(locators.showEntriesDropdown, { timeout: 10000 });
  const tableRow = '//tr//td[1]';

  const showEntriesOptions = ['25', '50', '100'];

  for (let option of showEntriesOptions) {
    await page.selectOption(locators.showEntriesText, { label: option });
    await page.waitForLoadState('networkidle');
    const tableRows = await page.$$(tableRow);
    const expectedTrCount = parseInt(option);
    expect(tableRows.length).toBe(expectedTrCount);
  }
});


//   // Test Case 13: Verify that 'Show entries' dropdown is displayed on the top of Dashboard/View accepted authorization/view rejected/remove authorization page
  test('Verify that "Show entries" dropdown is displayed on the top of View accepted authorization and view rejected/remove authorization page', async ({ page }) => {
    const buttons = [ locators.viewRejectedAuthorizationButton , locators.viewAcceptedAuthorizationButton  ];
    for (let button of buttons) {
      await page.waitForSelector(locators.authorizationRecords, { timeout: 10000 });
      await page.click(button, { timeout: 5000 });
      await expect(page.locator(locators.showEntriesDropdown)).toBeVisible({ timeout: 10000 }).catch(() => {
        throw new Error(`"Show entries" dropdown is not visible on the top of the page ${button}.`);
      });
    }
  });

  // Test Case 14: Verify that dropdown does not allow entering custom values
  test('Verify that dropdown does not allow entering custom values', async ({ page }) => {
    await expect(page.locator(locators.showEntriesDropdown)).toBeVisible({ timeout: 10000 });
  
    // Check that there is no input tag inside the dropdown
    const inputTag = await page.$('select[name="rejected-authorizations_length"] input');
    expect(inputTag).toBeNull();
  });


});

