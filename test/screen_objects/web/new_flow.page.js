class newFlowPage{
    get idCaptureBtn(){
        return 'div.group.relative input'
    }

    get idValidationBtn(){
        return $('/html/body/div[1]/div/div/div/div[2]/div/div[2]/div[1]/div[2]/div[6]/div[1]/div[1]/div/div/input');
    }

    get faceCaptureBtn(){
        return 'div.group.relative input'
    }

     get closeBtn(){
        return 'svg.modal-dialog-close'
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


async clickOnCheckbox(selectorOrElement, index = undefined, timeout = 8000) {
  let el;

  if (typeof selectorOrElement === 'string') {
    if (typeof index === 'number') {
      const elements = await $$(selectorOrElement);
      if (!elements.length) {
        throw new Error(`clickOn: no elements found for selector "${selectorOrElement}"`);
      }
      if (index >= elements.length) {
        throw new Error(`clickOn: index ${index} out of bounds (found ${elements.length})`);
      }
      el = elements[index];
    } else {
      el = await $(selectorOrElement);
    }
  } else {
    el = selectorOrElement;
  }

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

    async getCheckboxByIndexIdCapture(index, timeout = 10000) {
  await browser.waitUntil(
    async () => {
      const els = await $$(this.idCaptureBtn);
      return els.length > index;
    },
    {
      timeout,
      timeoutMsg: `Expected at least ${index + 1} checkboxes to be present`
    }
  );

  const elements = await $$(this.idCaptureBtn);
  return elements[index];
}

  async getCheckboxByIndexIdValidation(index, timeout = 10000) {
  await browser.waitUntil(
    async () => {
      const els = await $$(this.idValidationBtn);
      return els.length > index;
    },
    {
      timeout,
      timeoutMsg: `Expected at least ${index + 1} checkboxes to be present`
    }
  );

  const elements = await $$(this.idValidationBtn);
  return elements[index];
}

  async getCheckboxByIndexFaceCapture(index, timeout = 10000) {
  await browser.waitUntil(
    async () => {
      const els = await $$(this.faceCaptureBtn);
      return els.length > index;
    },
    {
      timeout,
      timeoutMsg: `Expected at least ${index + 1} checkboxes to be present`
    }
  );

  const elements = await $$(this.faceCaptureBtn);
  return elements[index];
}
}

export default new newFlowPage();