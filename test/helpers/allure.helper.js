import allure from '@wdio/allure-reporter';

export async function takeScreenshot(name = 'screenshot') {
  const screenshot = await browser.takeScreenshot();

  allure.addAttachment(
    name,
    Buffer.from(screenshot, 'base64'),
    'image/png'
  );
}