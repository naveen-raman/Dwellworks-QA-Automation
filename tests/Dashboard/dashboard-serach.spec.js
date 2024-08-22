// // tests/eCoordSearchTestCases.spec.js

// const { test, expect } = require('@playwright/test');
// //const locators = require('../locators/loginLocators'); // Load locators
// //const testData = require('../testData/loadTestData'); // Load processed test data

// test.describe('Ecoord Dashboard Search Test Scenarios', () => {

//   //Testcase 1 
//   test('Verify if the search functionality filters the dropdown options', async ({ page }) => {
//     await page.goto(locators.dashboardPageUrl);
//     await page.click(locators.coordinatorDropdown);
//     await page.fill(locators.coordinatorSearchBox, testData.searchTerm);
//     const filteredOptions = testData.coordinatorOptions.filter(option => option.includes(testData.searchTerm));
//     for (let option of filteredOptions) {
//       await expect(page.locator(`text="${option}"`)).toBeVisible();
//     }
//   });

//   //Testcase 2

//   test('Verify behavior when search returns no results', async ({ page }) => {
//     await page.goto(locators.dashboardPageUrl);
//     await page.click(locators.coordinatorDropdown);
//     await page.fill(locators.coordinatorSearchBox, 'NoSuchOption');
//     await expect(page.locator('text="No results found"')).toBeVisible();
//   });

//   //Testcase 3

//   test('Verify if invalid characters are handled gracefully in the search box', async ({ page }) => {
//     await page.goto(locators.dashboardPageUrl);
//     await page.click(locators.coordinatorDropdown);
//     await page.fill(locators.coordinatorSearchBox, '@#$%^');
//     await expect(page.locator('text="No results found"')).toBeVisible();
//   });

//   //Testcase 4

//   test('Verify if the search is case-insensitive', async ({ page }) => {
//     await page.goto(locators.dashboardPageUrl);
//     await page.click(locators.coordinatorDropdown);
//     await page.fill(locators.coordinatorSearchBox, testData.searchTerm.toLowerCase());
//     const filteredOptions = testData.coordinatorOptions.filter(option => option.toLowerCase().includes(testData.searchTerm.toLowerCase()));
//     for (let option of filteredOptions) {
//       await expect(page.locator(`text="${option}"`)).toBeVisible();
//     }
//   });

//   //Testcase 5

//   test('Verify if clearing the search box restores all options', async ({ page }) => {
//     await page.goto(locators.dashboardPageUrl);
//     await page.click(locators.coordinatorDropdown);
//     await page.fill(locators.coordinatorSearchBox, testData.searchTerm);
//     await page.fill(locators.coordinatorSearchBox, '');
//     for (let option of testData.coordinatorOptions) {
//       await expect(page.locator(`text="${option}"`)).toBeVisible();
//     }
//   });

//   //Testcase 6

//   test('Verify if search works correctly with leading or trailing spaces', async ({ page }) => {
//     await page.goto(locators.dashboardPageUrl);
//     await page.click(locators.coordinatorDropdown);
//     await page.fill(locators.coordinatorSearchBox, ` ${testData.searchTerm} `);
//     const filteredOptions = testData.coordinatorOptions.filter(option => option.includes(testData.searchTerm));
//     for (let option of filteredOptions) {
//       await expect(page.locator(`text="${option}"`)).toBeVisible();
//     }
//   });

//   //Testcase 7

//   test('Verify if the search can handle numeric values', async ({ page }) => {
//     await page.goto(locators.dashboardPageUrl);
//     await page.click(locators.coordinatorDropdown);
//     await page.fill(locators.coordinatorSearchBox, testData.numericSearchTerm);
//     const filteredOptions = testData.coordinatorOptions.filter(option => option.includes(testData.numericSearchTerm));
//     for (let option of filteredOptions) {
//       await expect(page.locator(`text="${option}"`)).toBeVisible();
//     }
//   });

//   //Testcase 8

//   test('Verify that user can enter text in the Search field', async ({ page }) => {
//     await page.goto(locators.dashboardPageUrl);
//     await page.fill(locators.searchField, testData.searchTerm);
//     await expect(page.locator(locators.searchField)).toHaveValue(testData.searchTerm);
//   });

//   //Testcase 9

//   test('Verify that valid search queries return correct results', async ({ page }) => {
//     await page.goto(locators.dashboardPageUrl);
//     await page.fill(locators.searchField, testData.searchTerm);
//     const results = await page.locator(locators.searchResults);
//     for (let result of results) {
//       await expect(result).toContainText(testData.searchTerm);
//     }
//   });

//   //Testcase 10

//   test('Verify behavior when a non-existent search term is entered', async ({ page }) => {
//     await page.goto(locators.dashboardPageUrl);
//     await page.fill(locators.searchField, 'NonExistentTerm');
//     await expect(page.locator('text="No results found"')).toBeVisible();
//   });

//   //Testcase 11

//   test('Verify that search works correctly with leading or trailing spaces', async ({ page }) => {
//     await page.goto(locators.dashboardPageUrl);
//     await page.fill(locators.searchField, ` ${testData.searchTerm} `);
//     const results = await page.locator(locators.searchResults);
//     for (let result of results) {
//       await expect(result).toContainText(testData.searchTerm.trim());
//     }
//   });

//   //Testcase 12

//   test('Verify that the search is case insensitive', async ({ page }) => {
//     await page.goto(locators.dashboardPageUrl);
//     await page.fill(locators.searchField, testData.searchTerm.toUpperCase());
//     const results = await page.locator(locators.searchResults);
//     for (let result of results) {
//       await expect(result).toContainText(testData.searchTerm);
//     }
//   });

//   // tests/eCoordFilterTestCases.spec.js


// test.describe('Ecoord Filter Test Scenarios', () => {

//   //Testcase 1

//   test('Verify that "View Accepted Authorization" filter works as expected', async ({ page }) => {
//     await page.goto(locators.dashboardPageUrl);
//     await page.click(locators.viewAcceptedAuthorizationButton);
//     const authorizations = await page.locator(locators.authorizationList);
//     for (let auth of authorizations) {
//       await expect(auth).toContainText('Accepted');
//     }
//   });

//   //Testcase 2

//   test('Verify that "View removed/rejected authorization" filter works as expected', async ({ page }) => {
//     await page.goto(locators.dashboardPageUrl);
//     await page.click(locators.viewRejectedAuthorizationButton);
//     const authorizations = await page.locator(locators.authorizationList);
//     for (let auth of authorizations) {
//       await expect(auth).toContainText('Rejected').or.toContainText('Removed');
//     }
//   });

//   //Testcase 3

//   test('Verify that user can choose an option in the Authorization status dropdown and filter results', async ({ page }) => {
//     await page.goto(locators.dashboardPageUrl);
//     await expect(page.locator(locators.authorizationStatusDropdown)).toBeVisible();
//     await page.click(locators.authorizationStatusDropdown);
//     await page.click(`text="${testData.authorizationStatusOptions[0]}"`);
//     const authorizations = await page.locator(locators.authorizationList);
//     for (let auth of authorizations) {
//       await expect(auth).toContainText(testData.authorizationStatusOptions[0]);
//     }
//   });


// });




// });
