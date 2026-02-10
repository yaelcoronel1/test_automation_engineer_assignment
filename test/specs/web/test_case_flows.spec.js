import dashboardPage from '../../screen_objects/web/dashboard.page.js';
import flowsPage from '../../screen_objects/web/flows.page.js';
import homePage from '../../screen_objects/web/home.page.js';
import new_flowPage from '../../screen_objects/web/new_flow.page.js';
import sessionsPage from '../../screen_objects/web/sessions.page.js';
import { takeScreenshot } from '../../helpers/allure.helper.js';
import allure from '@wdio/allure-reporter';

describe('Test Case Flows', () => {
    before('Home page login', async () => {
        await homePage.open();
        await homePage.rotateToLandscape();
        await homePage.enterEmail('qa.auto7@incode.com');
        await homePage.enterPass('nbx5peh*VCN1btg0bzx');
        await homePage.hideKeyboardIfVisible();
        await homePage.clickOn(homePage.loginBtn);
    });

    it('New flow test', async () => {
        await homePage.clickOn(dashboardPage.menuSlidingBtn);
        await homePage.clickOn(dashboardPage.flowsLink);
        await homePage.clickOn(dashboardPage.closeMenuBtn);
        await homePage.clickOn(flowsPage.newFlowBtn);

        const idCapture = await new_flowPage.getCheckboxByIndexIdCapture(2);
        const faceCapture = await new_flowPage.getCheckboxByIndexFaceCapture(3);
        await new_flowPage.clickOnCheckbox(idCapture);
        allure.addStep('Id Capture checkbox selected');
        expect(await new_flowPage.isCheckboxActive(idCapture)).toBe(true);
        await takeScreenshot('Id Capture checkbox selected');
        await new_flowPage.idValidationBtn.click();
        allure.addStep('Id Validation checkbox selected');
        expect(await new_flowPage.isCheckboxActive(new_flowPage.idValidationBtn)).toBe(true);
        await takeScreenshot('Id validation checkbox selected');
        await new_flowPage.clickOnCheckbox(faceCapture);
        allure.addStep('Face Capture checkbox selected');
        expect(await new_flowPage.isCheckboxActive(faceCapture)).toBe(true);
        await takeScreenshot('Face Capture checkbox selected');
        await homePage.clickOn(new_flowPage.editNameBtn);
        await homePage.hideKeyboardIfVisible();
        await homePage.clickOn(new_flowPage.saveNameBtn);
        await homePage.clickOn(new_flowPage.saveChangesBtn);
        await homePage.clickOn(new_flowPage.xBtn);
        await homePage.clickOn(new_flowPage.activeFlowBtn);
        await homePage.clickOn(new_flowPage.saveChangesBtn);
        await homePage.clickOn(new_flowPage.goBackBtn);
        
        const activeStatus = await sessionsPage.getTextFrom(flowsPage.activeStatusText);
        const newFlowName = await sessionsPage.getTextFrom(flowsPage.newFlowName);
        allure.addStep('New flow creation validation');
        await expect(activeStatus).toEqual('ACTIVE');
        await expect(newFlowName).toEqual('New flow');
        await takeScreenshot('New flow creation validation');
    });
});