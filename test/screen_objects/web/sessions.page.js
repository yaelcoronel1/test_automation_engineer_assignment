class SessionsPage{
    
    get fullName(){
        return '//*[@id="root"]/div/div/div/div/div[3]/div/table/tbody/tr[1]/td[5]'
    }

    get identificationCode(){
        return '//*[@id="root"]/div/div/div/div/div[3]/div/table/tbody/tr[1]/td[4]'
    } 

    async swipeRightUntilVisible(selector, maxSwipes = 5) {
  for (let i = 0; i < maxSwipes; i++) {
    const elements = await $$(selector);
    if (elements.length && await elements[0].isDisplayed()) {
      return elements[0];
    }
    await this.swipeRight();
  }
  throw new Error(`Element ${selector} not found after ${maxSwipes} swipes`);
}

    async getTextFrom(element) {

    await element.waitForDisplayed();
    return (await element.getText()).trim();
    }

}

export default new SessionsPage();