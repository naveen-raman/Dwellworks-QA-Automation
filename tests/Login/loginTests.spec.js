// tests/loginPOM.spec.js
 
const { test, expect } = require('@playwright/test');
const locators = require('../../locators/loginLocators'); // Load locators
const testData = require('../../testData/loadTestData'); // Load processed test data
 
test.describe('Login Page Test Scenarios', () => {
  const loginPageUrl = locators.loginPageUrl;
 
  test('Verify presence of Email and Password fields', async ({ page }) => {
    await page.goto(loginPageUrl);
    await expect(page.locator(locators.emailField)).toBeVisible({ timeout: 5000 }).catch(() => {
      throw new Error('Email field is not visible on the login page.');
    });
    await expect(page.locator(locators.passwordField)).toBeVisible({ timeout: 5000 }).catch(() => {
      throw new Error('Password field is not visible on the login page.');
    });
  });
 
  test('Verify login fails when both fields are empty', async ({ page }) => {
    await page.goto(loginPageUrl);
    await page.click(locators.submitButton);
    await expect(page.locator(locators.emailError)).toBeVisible().catch(() => {
      throw new Error('Error message for missing email is not displayed.');
    });
    await expect(page.locator(locators.passwordError)).toBeVisible().catch(() => {
      throw new Error('Error message for missing password is not displayed.');
    });
  });
 
  test('Verify login fails when Email field is empty', async ({ page }) => {
    await page.goto(loginPageUrl);
    await page.fill(locators.passwordField, testData.loginTests.validUser.password);
    await page.click(locators.submitButton);
    await expect(page.locator(locators.emailError)).toBeVisible().catch(() => {
      throw new Error('Error message for missing email is not displayed when password is provided.');
    });
  });
 
  test('Verify login fails when Password field is empty', async ({ page }) => {
    await page.goto(loginPageUrl);
    await page.fill(locators.emailField, testData.loginTests.validUser.email);
    await page.click(locators.submitButton);
    await expect(page.locator(locators.passwordError)).toBeVisible().catch(() => {
      throw new Error('Error message for missing password is not displayed when email is provided.');
    })
  });
 
  test('Verify login fails for invalid Email and Password', async ({ page }) => {
    await page.goto(loginPageUrl);
    await page.fill(locators.emailField, testData.loginTests.invalidUser.email);
    await page.fill(locators.passwordField, testData.loginTests.invalidUser.password);
    await page.click(locators.submitButton);
    await expect(page.locator(locators.invalidLoginError)).toBeVisible().catch(() => {
      throw new Error('Error message for invalid login attempt is not displayed.');
    });
  });
 
  test('Verify login fails for unregistered user', async ({ page }) => {
    await page.goto(loginPageUrl);
    await page.fill(locators.emailField, testData.loginTests.unregisteredUser.email);
    await page.fill(locators.passwordField, testData.loginTests.unregisteredUser.password);
    await page.click(locators.submitButton);
    await expect(page.locator(locators.invalidLoginError)).toBeVisible().catch(() => {
      throw new Error('Error message for unregistered user login attempt is not displayed.');
    });
  });

  test('Verify presence of Remember me button with checkbox', async ({ page }) => {
    await page.goto(loginPageUrl);
    await expect(page.locator(locators.rememberMeCheckbox)).toBeVisible({ timeout: 5000 }).catch(() => {
      throw new Error('Remember Me checkbox is not visible on the login page.');
    });
  });
 
  test('Verify user can enter text in both Email and Password fields', async ({ page }) => {
    await page.goto(loginPageUrl);
    await page.fill(locators.emailField, testData.loginTests.validUser.email);
    await page.fill(locators.passwordField, testData.loginTests.validUser.password);
    await expect(page.locator(locators.emailField)).toHaveValue(testData.loginTests.validUser.email).catch(() => {
      throw new Error('Email field does not retain the entered value.');
    });
    await expect(page.locator(locators.passwordField)).toHaveValue(testData.loginTests.validUser.password).catch(() => {
      throw new Error('Password field does not retain the entered value.');
    });
  });
 
 test('Verify login fails for a locked user account', async ({ page }) => {
   await page.goto(loginPageUrl);
   await page.fill(locators.emailField, testData.loginTests.lockedUser.email);
   await page.fill(locators.passwordField, testData.loginTests.lockedUser.password);
   await page.click(locators.submitButton);
   await expect(page.locator(locators.lockedUserAccountError)).toBeVisible().catch(() => {
     throw new Error('Error message for locked user account is not displayed.');
   });
 });
 
  test('Verify registered user can successfully log in', async ({ page }) => {
    await page.goto(loginPageUrl);
    await page.fill(locators.emailField, testData.loginTests.validUser.email);
    await page.fill(locators.passwordField, testData.loginTests.validUser.password);
    await page.click(locators.submitButton);
    await expect(page).toHaveURL(locators.redirectUrlAfterLogin).catch(() => {
      throw new Error('Registered user is not redirected to the correct page after login.');
    });
  });
 
  test('Verify that user can log out successfully', async ({ page }) => {
    // First, log in
    await page.goto(loginPageUrl);
    await page.fill(locators.emailField, testData.loginTests.validUser.email);
    await page.fill(locators.passwordField, testData.loginTests.validUser.password);
    await page.click(locators.submitButton);
    await expect(page).toHaveURL(locators.redirectUrlAfterLogin);
 
    // Perform logout
    await page.click(locators.logoutDropdown).catch(() => {
      throw new Error('Dropdown for logout is not visible.');
    });
    await page.click(locators.logoutLink).catch(() => {
      throw new Error('Logout link is not functional.');
    });
 
    // Verify user is redirected to the login page
    await expect(page).toHaveURL(loginPageUrl).catch(() => {
      throw new Error('User is not redirected to the login page after logout.');
    });
  });
 
  test('Verify Remember Me functionality after logout', async ({ page }) => {
    // First, log in with Remember Me checked
    await page.goto(loginPageUrl);
    await page.fill(locators.emailField, testData.loginTests.validUser.email);
    await page.fill(locators.passwordField, testData.loginTests.validUser.password);
    await page.check(locators.rememberMeCheckbox);
    await page.click(locators.submitButton);
    await expect(page).toHaveURL(locators.redirectUrlAfterLogin);
 
    // Perform logout
    await page.click(locators.logoutDropdown);
    await page.click(locators.logoutLink);
    await expect(page).toHaveURL(loginPageUrl);
 
    // Simulate returning to the login page later
    await page.goto(loginPageUrl);
 
    // Verify that the credentials are already filled in
    const email = await page.locator(locators.emailField).inputValue();
    const password = await page.locator(locators.passwordField).inputValue();
 
    try {
      expect(email).toBe(testData.loginTests.validUser.email);
      expect(password).toBe(testData.loginTests.validUser.password);
    } catch (error) {
      throw new Error(`Remember Me scenario failed: Expected email and password to be pre-populated, but found email: ${email} and password: ${password}`);
    }
  });
});