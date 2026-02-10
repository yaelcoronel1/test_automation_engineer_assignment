class SessionInformationPage{
    get fullOcrName(){
        return $('span.content');
    }

    get addToDatabase(){
        return $('button.button.title-button.white.md.icon');
    }

    get xButton(){
        return $('button.Toastify__close-button.Toastify__close-button--colored');
    }
    
    async scrollToElement(element) {

  await element.scrollIntoView();
  await element.waitForDisplayed();
  return element;
}

    async scrollToTop() {
  await browser.execute(() => {
    window.scrollTo(0, 0);
  });
}
}

export default new SessionInformationPage();