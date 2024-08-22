const { test, expect } = require('@playwright/test');
const locators = require('../../locators/loginLocators'); // Load locators
const testData = require('../../testData/loadTestData'); // Load processed test data

 
test.describe('Login Page Regression Test', { timeout: 15000 }, () => {
  const loginPageUrl = locators.loginPageUrl;

  test('Successful Login and Logout', async ({ page }) => {
    // Navigate to the login page
    await page.goto(locators.loginPageUrl);
  
    // Enter valid username and password
    await page.fill(locators.emailField, testData.loginTests.validUser.email);
    await page.fill(locators.passwordField, testData.loginTests.validUser.password);
  
    // Click the login button
    await page.click(locators.submitButton);

    await expect(page).toHaveURL(locators.redirectUrlAfterLogin).catch(() => {
      throw new Error('Registered user is not redirected to the correct page after login.');
    });
  
    // Verify successful login
    await expect(page.locator(locators.logoutDropdown)).toBeVisible();
  
    // Click the logout link
    await page.click(locators.logoutDropdown);
    await page.click(locators.logoutLink);
  
    // Verify successful logout
    await expect(page).toHaveURL(loginPageUrl).catch(() => {
      throw new Error('User is not redirected to the login page after logout.');
    });
  });

})