class HomePage {

    get url() {
        return 'https://demo-dashboard.incode.com/'
    }

    get incodeLogo(){
        return $('logo-incode');
    }

    get emailInput(){
        return $('input.full');
    }

    get passwordInput(){
        return $('input.password-input');
    }

    get loginBtn(){
        return $('button.button.green.full');
    }
  
    async open() {
        await browser.url(this.url);
    }

    async enterEmail(email) {
    const element = await (this.emailInput);
    await element.waitForDisplayed();
    await element.setValue(email);
    }

    async enterPass(pass) {
    const element = await (this.passwordInput);
    await element.waitForDisplayed();
    await element.setValue(pass);
    }

    async enterValue(element, value) {
    await element.waitForDisplayed();
    await element.setValue(value);
    }


    async clickOn(element) {

      await element.waitForDisplayed();
      await element.waitForClickable();
      await element.scrollIntoView();
      await element.click();
    }

    async hideKeyboardIfVisible() {
  try {
    await driver.hideKeyboard();
  } catch (error) {
    'Keyboard was not visible → ignore'
  }
}

    async rotateToLandscape() {
    await driver.setOrientation('LANDSCAPE');
}
}

export default new HomePage();