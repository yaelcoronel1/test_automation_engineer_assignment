import dashboardPage from '../../screen_objects/web/dashboard.page.js';
import homePage from '../../screen_objects/web/home.page.js';
import session_informationPage from '../../screen_objects/web/session_information.page.js';
import sessionsPage from '../../screen_objects/web/sessions.page.js';
import { takeScreenshot } from '../../helpers/allure.helper.js';
import allure from '@wdio/allure-reporter';

describe('Test Case Sessions', () => {
    let fullTableName;

    before('Home page login', async () => {
        await homePage.open();
        await homePage.rotateToLandscape();
        await homePage.enterEmail('qa.auto7@incode.com');
        await homePage.enterPass('nbx5peh*VCN1btg0bzx');
        await homePage.hideKeyboardIfVisible();
        await homePage.clickOn(homePage.loginBtn);
    });

    it('Session Page validation', async () => {
        await homePage.clickOn(dashboardPage.menuSlidingBtn);
        await homePage.clickOn(dashboardPage.sessionsLink);
        await homePage.clickOn(dashboardPage.closeMenuBtn);

        allure.addStep('Get full table name');
        await sessionsPage.swipeRightUntilVisible(sessionsPage.fullName);
        fullTableName = await sessionsPage.getTextFrom($(sessionsPage.fullName)); // Extracting the full table name
        await takeScreenshot('Get full table name');
        await homePage.clickOn($(sessionsPage.fullName));
        
        allure.addStep('Full OCR name and full table name validation');
        await session_informationPage.scrollToElement(session_informationPage.fullOcrName);
        await takeScreenshot('Full OCR name and full table name validation');
        const fullOcrName = await sessionsPage.getTextFrom(session_informationPage.fullOcrName); // Extracting the full ocr name
        expect(fullTableName.toLowerCase()).toEqual(fullOcrName.toLowerCase()); // Asserting that both the full table name and the full ocr name are the same, they do match but the full ocr name is in full caps while the full table name is not
    });

});