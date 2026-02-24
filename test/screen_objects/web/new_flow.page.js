class newFlowPage{
    get idCaptureBtn(){
        return $$('div.group.relative input')[2];
    }

    get idValidationBtn(){
        return $('/html/body/div[1]/div/div/div/div[2]/div/div[2]/div[1]/div[2]/div[6]/div[1]/div[1]/div/div/input');
    }

    get faceCaptureBtn(){
        return $$('div.group.relative input')[3];
    }

    get saveChangesBtn(){
        return $('.flex.flex-row.items-center.justify-end.gap-16 button.bg-blue-500.text-white');
    }

    get editNameBtn(){
        return $('span.font-typography + button.text-grey-500');
    }

     get saveNameBtn(){
        return $('button.bg-blue-500.text-white');
    }

      get xBtn(){
        return $('button.Toastify__close-button.Toastify__close-button--colored');
    }

    get activeFlowBtn(){
        return $('button.bg-white.text-grey-800.border-grey-200');
    }

    get goBackBtn(){
        return $('div.fixed button.text-grey-500');
    }

    async isCheckboxActive(checkbox) {
  const value = await checkbox.getAttribute('data-active');
  return value === 'true';
}


async clickOnCheckbox(element, timeout = 8000) {
  let el;
  el = element;

  await el.waitForExist({ timeout });
  await el.scrollIntoView();
  await el.waitForDisplayed({ timeout });

  try {
    await el.waitForClickable({ timeout });
    await el.click();
  } catch (err) {
    try {
      await browser.execute((element) => element.click(), el);
    } catch (jsErr) {
      throw new Error(
        `clickOn failed.\n` +
        `Original error: ${err.message}\n` +
        `JS click error: ${jsErr.message}`
      );
    }
  }
}
}  

export default new newFlowPage();