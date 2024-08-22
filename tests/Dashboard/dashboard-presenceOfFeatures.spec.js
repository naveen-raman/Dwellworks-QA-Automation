// tests/eCoordGroupedTestCases.spec.js

const { test, expect } = require('@playwright/test');
const locators = require('../../locators/loginLocators'); // Load locators
const testData = require('../../testData/loadTestData'); // Load processed test data

test.describe('Ecoord Dashboard Functional Test Scenarios', () => {
  
  // Test Case 1: Verify if the user is able to view the login page when loading the URL
  // Test Case 2: Verify if the user is able to redirect to the home page on successful login
  // Combined Test Case 1 and Test Case 2 into one test case as beforeEach is executed before each test case 

  
  test.beforeEach('Verify if the user is able to redirect to the home page on successful login', async ({ page }) => {
    await page.goto(locators.loginPageUrl);
    await expect(page).toHaveTitle('Log in').catch(() => {
      throw new Error('The login page is not displayed.');
    });
    await page.goto(locators.loginPageUrl);
    await page.fill(locators.emailField, testData.loginTests.validUser.email);
    await page.fill(locators.passwordField, testData.loginTests.validUser.password);
    await page.click(locators.submitButton);
    await expect(page).toHaveURL(locators.dashboardPageUrl).catch(() => {
      throw new Error('User is not redirected to the Dashboard page after login.');
    });
    await page.waitForSelector(locators.authorizationRecords, { timeout: 10000 });

  });

  // Test Case 3: Verify if the user is able to view the list of authorizations on the dashboard page
  // Not feasible to automate
  test('Verify if the user is able to view the list of authorizations on the dashboard page', async ({ page }) => {
    
    await expect(page.locator(locators.authorizationRecords)).toBeVisible({ timeout: 5000 }).catch(() => {
      throw new Error('The list of authorizations is not visible on the dashboard page.');
    });
  });

  // Test Case 4: Verify if the user is able to view the Coordinator field on the dashboard page
  test('Verify if the user is able to view the Coordinator field on the dashboard page', async ({ page }) => {
    await expect(page.locator(locators.coordinatorField)).toBeVisible({ timeout: 5000 }).catch(() => {
      throw new Error('The Coordinator field is not visible on the dashboard page.');
    });
  });

   // Test Case 5: Verify if the Coordinator dropdown is present on the page
   test('Verify if the Coordinator dropdown is present on the page', async ({ page }) => {
   
    await expect(page.locator(locators.coordinatorDropdown)).toBeVisible({ timeout: 10000 }).catch(() => {
      throw new Error('Coordinator dropdown is not visible on the page.');
    });
    await page.click(locators.coordinatorDropdown);
    await expect(page.locator(locators.coordinatorDropdown)).toBeEnabled().catch(() => {
      throw new Error('Coordinator dropdown is not functional.');
    });
  });

  // Test Case 6: Verify if the user is able to view the Service delivery country field on the dashboard page
  test('Verify if the user is able to view the Service delivery country field on the dashboard page', async ({ page }) => {
    await expect(page.locator(locators.serviceDeliveryCountryField)).toBeVisible({ timeout: 5000 }).catch(() => {
      throw new Error('The Service delivery country field is not visible on the dashboard page.');
    });
  });

  // Test Case 7: Verify if the user is able to view the Authorization status field on the dashboard page
  test('Verify if the user is able to view the Authorization status field on the dashboard page', async ({ page }) => {
    await expect(page.locator(locators.authorizationStatusField)).toBeVisible({ timeout: 5000 }).catch(() => {
      throw new Error('The Authorization status field is not visible on the dashboard page.');
    });
  });

  // Test Case 8: Verify if the user is able to view the Search field on the dashboard page
  test('Verify if the user is able to view the Search field on the dashboard page', async ({ page }) => {
    await expect(page.locator(locators.searchField)).toBeVisible({ timeout: 5000 }).catch(() => {
      throw new Error('The Search field is not visible on the dashboard page.');
    });
  });

  // Test Case 9: Verify if the user is able to view the 'Create new authorization' button on the dashboard page
  test('Verify if the user is able to view the "Create new authorization" button on the dashboard page', async ({ page }) => {
    await expect(page.locator(locators.createAuthorizationButton)).toBeVisible({ timeout: 5000 }).catch(() => {
      throw new Error('"Create new authorization" button is not visible on the dashboard page.');
    });
  });

  // Test Case 10: Verify if the user is able to view the 'View accepted authorization' button on the dashboard page
  test('Verify if the user is able to view the "View accepted authorization" button on the dashboard page', async ({ page }) => {
    await expect(page.locator(locators.viewAcceptedAuthorizationButton)).toBeVisible({ timeout: 5000 }).catch(() => {
      throw new Error('"View accepted authorization" button is not visible on the dashboard page.');
    });
  });

  // Test Case 11: Verify if the user is able to view the 'View rejected/removed authorizations' button on the dashboard page
  test('Verify if the user is able to view the "View rejected/removed authorizations" button on the dashboard page', async ({ page }) => {
    await expect(page.locator(locators.viewRejectedAuthorizationButton)).toBeVisible({ timeout: 5000 }).catch(() => {
      throw new Error('"View rejected/removed authorizations" button is not visible on the dashboard page.');
    });
  });

  // Test Case 12: Verify if the 'Remove' button is displayed for each authorization
  test('Verify if the "Remove" button is displayed for each authorization', async ({ page }) => {
   

    await page.waitForTimeout(15000); // pause for 5 seconds
    await page.waitForSelector(locators.removeButton, { timeout: 10000 });
    const removeButtonsCount = await page.locator(locators.removeButton).count();
    expect(removeButtonsCount).toBeGreaterThan(0);
  throw new Error('"Remove" button is not displayed for authorizations.');
});
  });

 

