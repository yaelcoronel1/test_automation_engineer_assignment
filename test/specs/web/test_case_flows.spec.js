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

        await new_flowPage.clickOnCheckbox(new_flowPage.idCaptureBtn);
        allure.addStep('Id Capture checkbox selected');
        expect(await new_flowPage.isCheckboxActive(new_flowPage.idCaptureBtn)).toBe(true); // Asserting that the checkbox is indeed active after clicking on it
        await takeScreenshot('Id Capture checkbox selected');
        await new_flowPage.clickOnCheckbox(new_flowPage.idValidationBtn);
        allure.addStep('Id Validation checkbox selected');
        expect(await new_flowPage.isCheckboxActive(new_flowPage.idValidationBtn)).toBe(true); // Asserting that the checkbox is indeed active after clicking on it
        await takeScreenshot('Id validation checkbox selected');
        await new_flowPage.clickOnCheckbox(new_flowPage.faceCaptureBtn);
        allure.addStep('Face Capture checkbox selected');
        expect(await new_flowPage.isCheckboxActive(new_flowPage.faceCaptureBtn)).toBe(true); // Asserting that the checkbox is indeed active after clicking on it
        await takeScreenshot('Face Capture checkbox selected');
        await homePage.clickOn(new_flowPage.editNameBtn); // Clicking on the edit name button, this step is included because sometimes when clicking the save changes button directly it does not respond consistenly, often times requiring multiple clicks or refreshes for it to activate        
        await homePage.hideKeyboardIfVisible();
        await homePage.clickOn(new_flowPage.saveNameBtn); // By saving the default name and then clicking on the save changes button it activates every time
        await homePage.clickOn(new_flowPage.saveChangesBtn);
        await homePage.clickOn(new_flowPage.xBtn);
        await homePage.clickOn(new_flowPage.activeFlowBtn);
        await homePage.clickOn(new_flowPage.saveChangesBtn);
        await homePage.clickOn(new_flowPage.goBackBtn);
        
        const activeStatus = await sessionsPage.getTextFrom(flowsPage.activeStatusText);
        const newFlowName = await sessionsPage.getTextFrom(flowsPage.newFlowName);
        allure.addStep('New flow creation validation');
        await expect(activeStatus).toEqual('ACTIVE'); // Asserting that the status of the new flow is indeed ACTIVE
        await expect(newFlowName).toEqual('New flow'); // Asserting that the name of the new flow corresponds with the default one
        await takeScreenshot('New flow creation validation');
    });
});