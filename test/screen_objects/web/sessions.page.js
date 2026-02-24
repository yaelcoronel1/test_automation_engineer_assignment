class SessionsPage{
    
    get fullName(){
        return $('//*[@class="session-row"]/td[5]');
    }

    get identificationCode(){
        return $('//*[@class="session-row"]/td[4]');
    } 

    async swipeRightUntilVisible(element, maxSwipes = 5) {
  for (let i = 0; i < maxSwipes; i++) {
    await element;
    if (await element.isDisplayed()) {
      return element;
    }
    await this.swipeRight();
  }
  throw new Error(`Element ${element} not found after ${maxSwipes} swipes`);
}

    async getTextFrom(element) {

    await element.waitForDisplayed();
    return (await element.getText()).trim();
    }

}

export default new SessionsPage();