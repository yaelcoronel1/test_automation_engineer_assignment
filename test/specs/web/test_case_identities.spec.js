import dashboardPage from '../../screen_objects/web/dashboard.page.js';
import homePage from '../../screen_objects/web/home.page.js';
import identitiesPage from '../../screen_objects/web/identities.page.js';
import session_informationPage from '../../screen_objects/web/session_information.page.js';
import sessionsPage from '../../screen_objects/web/sessions.page.js';
import { takeScreenshot } from '../../helpers/allure.helper.js';
import allure from '@wdio/allure-reporter';

describe('Test Case Identities', () => {
    let identificationCode;

    before('Home page login', async () => {
        await homePage.open();
        await homePage.rotateToLandscape();
        await homePage.enterEmail('qa.auto7@incode.com');
        await homePage.enterPass('nbx5peh*VCN1btg0bzx');
        await homePage.hideKeyboardIfVisible();
        await homePage.clickOn(homePage.loginBtn);
    });

    it('Identity confirmation test', async () => {
        await homePage.clickOn(dashboardPage.menuSlidingBtn);
        await homePage.clickOn(dashboardPage.sessionsLink);
        await homePage.clickOn(dashboardPage.closeMenuBtn);

        allure.addStep('Get identification code (CURP)');
        await sessionsPage.swipeRightUntilVisible(sessionsPage.identificationCode);
        identificationCode = await sessionsPage.getTextFrom($(sessionsPage.identificationCode));
        await takeScreenshot('Get identification code');
        await homePage.clickOn($(sessionsPage.identificationCode));

        allure.addStep('Add face to database');
        await homePage.clickOn(session_informationPage.addToDatabase);
        await homePage.clickOn(session_informationPage.xButton);
        await takeScreenshot('Add face to database');
        await session_informationPage.scrollToTop();
        await homePage.clickOn(dashboardPage.menuSlidingBtn);
        await homePage.clickOn(dashboardPage.identitiesLink);
        await homePage.clickOn(dashboardPage.closeMenuBtn);
        
        await identitiesPage.refreshPage();
        await homePage.clickOn(identitiesPage.filterBtn);
        await homePage.clickOn(identitiesPage.idNumberBtn);
        await homePage.enterValue(identitiesPage.idNumberInput, identificationCode)
        allure.addStep('Filtering by identification code (CURP)');
        await homePage.clickOn(identitiesPage.applyFilterBtn);
        await expect(identitiesPage.notFoundText).not.toBeDisplayed();
        const fullName = await sessionsPage.getTextFrom(identitiesPage.fullName);
        await takeScreenshot('Filtering by identification code');
        await expect(fullName).toEqual('Yael Isay Rodriguez Coronel');
    });
});