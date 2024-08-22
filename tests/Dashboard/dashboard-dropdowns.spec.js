// // tests/eCoordDropdownTestCases.spec.js

// const { test, expect } = require('@playwright/test');
// //const locators = require('../locators/loginLocators'); // Load locators
// //const testData = require('../testData/loadTestData'); // Load processed test data

// test.describe('Ecoord Dashboard Dropdown Test Scenarios', () => {

//   //Testcase 1
//   test('Verify if the Coordinator dropdown is present on the page', async ({ page }) => {
//     await page.goto(locators.dashboardPageUrl);
//     await expect(page.locator(locators.coordinatorDropdown)).toBeVisible();
//     await page.click(locators.coordinatorDropdown);
//     await expect(page.locator(locators.coordinatorDropdown)).toBeEnabled();
//   });

//   //Testcase 2
//   test('Verify if the dropdown contains all the coordinator options', async ({ page }) => {
//     await page.goto(locators.dashboardPageUrl);
//     await expect(page.locator(locators.coordinatorDropdown)).toBeVisible();
//     await page.click(locators.coordinatorDropdown);
//     for (let option of testData.coordinatorOptions) {
//       await expect(page.locator(`text="${option}"`)).toBeVisible();
//     }
//   });

//   //Testcase 3
//   test('Verify if selecting an option from the dropdown works correctly', async ({ page }) => {
//     await page.goto(locators.dashboardPageUrl);
//     await expect(page.locator(locators.coordinatorDropdown)).toBeVisible();
//     await page.click(locators.coordinatorDropdown);
//     await page.click(`text="${testData.coordinatorOptions[0]}"`);
//     await expect(page.locator(locators.coordinatorDropdown)).toHaveText(testData.coordinatorOptions[0]);
//   });

//   //Testcase 4
//   test('Verify the default value of the dropdown', async ({ page }) => {
//     await page.goto(locators.dashboardPageUrl);
//     await expect(page.locator(locators.coordinatorDropdown)).toBeVisible();
//     await expect(page.locator(locators.coordinatorDropdown)).toHaveText('Select Coordinator');
//   });

//   //Testcase 5
//   test('Verify if the Coordinator field remains empty when no option is chosen', async ({ page }) => {
//     await page.goto(locators.dashboardPageUrl);
//     await expect(page.locator(locators.coordinatorDropdown)).toBeVisible();
//     await expect(page.locator(locators.coordinatorDropdown)).toHaveText('Select Coordinator');
//   });

//   //Testcase 6
//   test('Verify if the Service delivery country dropdown is present on the page', async ({ page }) => {
//     await page.goto(locators.dashboardPageUrl);
//     await expect(page.locator(locators.serviceDeliveryCountryDropdown)).toBeVisible();
//     await page.click(locators.serviceDeliveryCountryDropdown);
//     await expect(page.locator(locators.serviceDeliveryCountryDropdown)).toBeEnabled();
//   });

//   //Testcase 7
//   test('Verify behavior when an invalid country is selected', async ({ page }) => {
//     await page.goto(locators.dashboardPageUrl);
//     await expect(page.locator(locators.serviceDeliveryCountryDropdown)).toBeVisible();
//     await page.click(locators.serviceDeliveryCountryDropdown);
//     await expect(page.locator(`text="${testData.invalidCountry}"`)).not.toBeVisible();
//   });

//   //Testcase 8
//   test('Verify that user can choose an option in the Authorization status dropdown', async ({ page }) => {
//     await page.goto(locators.dashboardPageUrl);
//     await expect(page.locator(locators.authorizationStatusDropdown)).toBeVisible();
//     await page.click(locators.authorizationStatusDropdown);
//     await page.click(`text="${testData.authorizationStatusOptions[0]}"`);
//     await expect(page.locator(locators.authorizationStatusDropdown)).toHaveText(testData.authorizationStatusOptions[0]);
//   });

//   //Testcase 9
//   test('Verify the page is filtered based on the option chosen in Authorization status dropdown', async ({ page }) => {
//     await page.goto(locators.dashboardPageUrl);
//     await page.click(locators.authorizationStatusDropdown);
//     await page.click(`text="${testData.authorizationStatusOptions[0]}"`);
//     const authorizations = await page.locator(locators.authorizationList);
//     for (let auth of authorizations) {
//       await expect(auth).toContainText(testData.authorizationStatusOptions[0]);
//     }
//   });

//   //Testcase 10
//   test('Verify that user can choose multiple options in the Authorization status dropdown', async ({ page }) => {
//     await page.goto(locators.dashboardPageUrl);
//     await expect(page.locator(locators.authorizationStatusDropdown)).toBeVisible();
//     await page.click(locators.authorizationStatusDropdown);
//     await page.click(`text="${testData.authorizationStatusOptions[0]}"`);
//     await page.click(`text="${testData.authorizationStatusOptions[1]}"`);
//     await expect(page.locator(locators.authorizationStatusDropdown)).toHaveText(testData.authorizationStatusOptions[0]);
//     await expect(page.locator(locators.authorizationStatusDropdown)).not.toHaveText(testData.authorizationStatusOptions[1]);
//   });

//   // Add more dropdown related test cases here...

// });

