const base = require('@playwright/test');
const { LoginPage } = require('../page-objects/loginPage.js');
const { SignUpPage } = require('../page-objects/signUpPage.js');
const { ProfilePage } = require('../page-objects/profilePage.js');
const { PropertyListpage } = require('../page-objects/propertyListpage.js');
const { PropertyDetailsPage } = require('../page-objects/propertyDetailsPage.js');
const { SearchPage } = require('../page-objects/searchPage.js');

exports.test = base.test.extend({
	// navigationPage: async ({ browser, baseURL }, use) => {
	// 	const navigationContext = await browser.newContext();
	// 	const navigationPage = await navigationContext.newPage();
	// 	await Promise.all([
	// 		navigationPage.goto(baseURL),
	// 		navigationPage.waitForURL(baseURL),
	// 	]);
	// 	await use(navigationPage);
	// },
	loginPage: async ({ page }, use) => {
		await use(new LoginPage(page));
	},
	signUpPage: async ({ page }, use) => {
		await use(new SignUpPage(page));
	},
	profilePage: async ({ page }, use) => {
		await use(new ProfilePage(page));
	},
	propertyListpage: async ({ page }, use) => {
		await use(new PropertyListpage(page));
	},
	propertyDetailsPage: async ({ page }, use) => {
		await use(new PropertyDetailsPage(page));
	},
	searchPage: async ({ page }, use) => {
		await use(new SearchPage(page));
	},
});

exports.expect = base.expect;