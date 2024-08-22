// locators/loginLocators.js
 
 const loginLocators = {
  emailField: '#Email',
  passwordField: '#Password',
  submitButton: 'input[type="submit"]',
  emailError: 'text="The Email field is required."',
  passwordError: 'text="The Password field is required."',
  invalidLoginError: 'text="Invalid login attempt. Please try again."',
  lockedUserAccountError: 'text="Invalid login attempt. Please try again."',
  rememberMeCheckbox: '#RememberMe',
  logoutDropdown: 'a[class="dropdown-toggle"]',
  logoutLink: 'a[href="javascript:document.getElementById(\'logoutForm\').submit()"]',
  redirectUrlAfterLogin: 'http://dc00-dev01:8080/Authorizations/Index',
  loginPageUrl: 'http://dc00-dev01:8080/Account/Login',
};

const dashboardLocators = {
  dashboardPageUrl: 'http://dc00-dev01:8080/Authorizations/Index',
  dashboardTitle: 'text="Dashboard"',
  dashboardSubtitle: 'text="View your authorizations here."',
  authorizationList: '//tbody', //tr[10]//td[8]
  coordinatorField: '#coord',
  coordinatorDropdown: '#coordDropdown',
  serviceDeliveryCountryField: '#countryInput',
  countryList: '#countryList',
  authorizationStatusField: '#authStatus',
  searchField: '#authorizations_filter input[type="search"]',
  removeButton: '//input[@name="remove-authorization"]',
  createAuthorizationButton: '.index-button',
  viewAcceptedAuthorizationButton: '.btn-primary[value="View Accepted Authorizations"]',
  viewRejectedAuthorizationButton: '.btn-danger[value="View Rejected/Removed Authorizations"]',

};

const paginationLocators = {
  paginationButton: '#authorizations_paginate',
  showEntriesDropdown: '//div[@class="dataTables_info"]',
  showEntriesText: 'select[name="accepted-authorizations_length"]',
  nextButton: '//a[contains(text(),"Next")]',
  authorizationRecords: '//tbody',
  previousButton: '//a[contains(text(),"Previous")]',
  specificPageNumberButton:'a[data-dt-idx="2"]',
  firstPageButton: 'a[data-dt-idx="2"]',
  lastPageButton: '//a[@data-dt-idx="7"]',
  records: '#authorizations_info',
  viewAcceptedAuthorizationPageUrl: 'http://dc00-dev01:8080/Authorizations/Accepted',
  viewRejectedAuthorizationPageUrl: 'http://dc00-dev01:8080/Authorizations/Rejected',
  firstPageUrl: 'http://dc00-dev01:8080/Authorizations/Index',
  secondPageUrl: 'http://dc00-dev01:8080/Authorizations/Index',
  lastPageUrl: 'http://dc00-dev01:8080/Authorizations/Index',
};
 
 module.exports = { ...loginLocators, ...dashboardLocators, ...paginationLocators }; 