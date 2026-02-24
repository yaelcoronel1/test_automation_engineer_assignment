const path = require('path');
const projectChromedir = path.resolve(__dirname, 'chromedrivers');
const mappingFile = path.join(projectChromedir, 'chromedriver_mapping.json');


exports.config = {
  runner: 'local',
  port: 4723,
  specs: [
    'test/specs/web/*identities.spec.js'
  ],
  exclude: [],
  maxInstances: 1, 
  capabilities: [{
    platformName: 'Android',
    browserName: 'Chrome',
    'appium:automationName': 'UiAutomator2',
    'appium:platformVersion': '15',
    'appium:deviceName': 'My_Device',
    'appium:udid': 'FY243361002F',
    'appium:noReset': true,
    'appium:autoGrantPermissions': true,
    'wdio:enforceWebDriverClassic': true,
    'appium:chromedriverAutodownload': true
  }],

  logLevel: 'info',
  bail: 0,
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,

  services: [
    ['appium', {
      command: 'appium',
      args: {
        relaxedSecurity: true, 
        allowInsecure: ['*:chromedriver_autodownload'],
      },
    }]
  ],

  framework: 'mocha',
  reporters: [['allure', {
    outputDir: 'allure-results',
    disableWebdriverStepsReporting: true,
    disableWebdriverScreenshotsReporting: true
  }]],
  mochaOpts: {
    ui: 'bdd',
    timeout: 60000
  },

  afterTest: async function (test, context, { error }) {
  if (error) {
    const screenshot = await browser.takeScreenshot();
    const allure = (await import('@wdio/allure-reporter')).default;

    allure.addAttachment(
      'Failure Screenshot',
      Buffer.from(screenshot, 'base64'),
      'image/png'
    );
  }
}
};