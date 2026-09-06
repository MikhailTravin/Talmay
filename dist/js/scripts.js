const modules_flsModules = {};

//вспомогательные функции
let bodyLockStatus = true;
let bodyUnlock = (delay = 500) => {
  if (bodyLockStatus) {
    const lockPaddingElements = document.querySelectorAll("[data-lp]");
    setTimeout((() => {
      lockPaddingElements.forEach((lockPaddingElement => {
        lockPaddingElement.style.paddingRight = "";
      }));
      document.body.style.paddingRight = "";
      document.documentElement.classList.remove("lock");
    }), delay);
    bodyLockStatus = false;
    setTimeout((function () {
      bodyLockStatus = true;
    }), delay);
  }
};
let bodyLock = (delay = 500) => {
  if (bodyLockStatus) {
    const lockPaddingElements = document.querySelectorAll("[data-lp]");
    const lockPaddingValue = window.innerWidth - document.body.offsetWidth + "px";
    lockPaddingElements.forEach((lockPaddingElement => {
      lockPaddingElement.style.paddingRight = lockPaddingValue;
    }));
    document.body.style.paddingRight = lockPaddingValue;
    document.documentElement.classList.add("lock");
    bodyLockStatus = false;
    setTimeout((function () {
      bodyLockStatus = true;
    }), delay);
  }
};
function functions_FLS(message) {
  setTimeout((() => {
    if (window.FLS) console.log(message);
  }), 0);
}

let _slideUp = (target, duration = 500, showmore = 0) => {
  if (!target.classList.contains("_slide")) {
    target.classList.add("_slide");
    target.style.transitionProperty = "height, margin, padding";
    target.style.transitionDuration = duration + "ms";
    target.style.height = `${target.offsetHeight}px`;
    target.offsetHeight;
    target.style.overflow = "hidden";
    target.style.height = showmore ? `${showmore}px` : `0px`;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    window.setTimeout((() => {
      target.hidden = !showmore ? true : false;
      !showmore ? target.style.removeProperty("height") : null;
      target.style.removeProperty("padding-top");
      target.style.removeProperty("padding-bottom");
      target.style.removeProperty("margin-top");
      target.style.removeProperty("margin-bottom");
      !showmore ? target.style.removeProperty("overflow") : null;
      target.style.removeProperty("transition-duration");
      target.style.removeProperty("transition-property");
      target.classList.remove("_slide");
      document.dispatchEvent(new CustomEvent("slideUpDone", {
        detail: {
          target
        }
      }));
    }), duration);
  }
};
let _slideDown = (target, duration = 500, showmore = 0) => {
  if (!target.classList.contains("_slide")) {
    target.classList.add("_slide");
    target.hidden = target.hidden ? false : null;
    showmore ? target.style.removeProperty("height") : null;
    let height = target.offsetHeight;
    target.style.overflow = "hidden";
    target.style.height = showmore ? `${showmore}px` : `0px`;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    target.offsetHeight;
    target.style.transitionProperty = "height, margin, padding";
    target.style.transitionDuration = duration + "ms";
    target.style.height = height + "px";
    target.style.removeProperty("padding-top");
    target.style.removeProperty("padding-bottom");
    target.style.removeProperty("margin-top");
    target.style.removeProperty("margin-bottom");
    window.setTimeout((() => {
      target.style.removeProperty("height");
      target.style.removeProperty("overflow");
      target.style.removeProperty("transition-duration");
      target.style.removeProperty("transition-property");
      target.classList.remove("_slide");
      document.dispatchEvent(new CustomEvent("slideDownDone", {
        detail: {
          target
        }
      }));
    }), duration);
  }
};
let _slideToggle = (target, duration = 500) => {
  if (target.hidden) return _slideDown(target, duration); else return _slideUp(target, duration);
};

function getHash() {
  if (location.hash) { return location.hash.replace('#', ''); }
}

function dataMediaQueries(array, dataSetValue) {
  const media = Array.from(array).filter(function (item) {
    return item.dataset[dataSetValue];
  });

  if (media.length) {
    const breakpointsArray = media.map(item => {
      const params = item.dataset[dataSetValue];
      const paramsArray = params.split(",");
      return {
        value: paramsArray[0],
        type: paramsArray[1] ? paramsArray[1].trim() : "max",
        item: item
      };
    });

    const mdQueries = uniqArray(
      breakpointsArray.map(item => `(${item.type}-width: ${item.value}px),${item.value},${item.type}`)
    );

    const mdQueriesArray = mdQueries.map(breakpoint => {
      const [query, value, type] = breakpoint.split(",");
      const matchMedia = window.matchMedia(query);
      const itemsArray = breakpointsArray.filter(item => item.value === value && item.type === type);
      return { itemsArray, matchMedia };
    });

    return mdQueriesArray;
  }
}

function uniqArray(array) {
  return array.filter(function (item, index, self) {
    return self.indexOf(item) === index;
  });
}

//========================================================================================================================================================

// выбор языка
const langButtons = document.querySelectorAll('.header-lang__button');

langButtons.forEach(button => {
  const langContainer = button.closest('.header-lang');

  if (langContainer) {
    button.addEventListener('click', function (e) {
      e.stopPropagation();
      langContainer.classList.toggle('active');
    });

    document.addEventListener('click', function (e) {
      if (!langContainer.contains(e.target)) {
        langContainer.classList.remove('active');
      }
    });
  }
});

//========================================================================================================================================================

//меню
const iconMenu = document.querySelectorAll('.header__burger');
const headerBody = document.querySelector('.menu');

if (iconMenu.length) {
  iconMenu.forEach(burger => {
    burger.addEventListener("click", function (e) {
      e.stopPropagation();
      document.documentElement.classList.toggle("menu-open");
    });
  });
}

document.addEventListener("click", function (e) {
  const isClickInsideMenu = headerBody && headerBody.contains(e.target);
  const isClickOnBurger = Array.from(iconMenu).some(burger => burger.contains(e.target));

  if (!isClickInsideMenu && !isClickOnBurger) {
    document.documentElement.classList.remove("menu-open");
  }
});

const menuItems = document.querySelectorAll('.menu__item');
if (menuItems) {
  const breakpoint = 1300;

  function handleMenuToggle(e) {
    if (window.innerWidth > breakpoint) return;

    const button = e.currentTarget;
    const menuItem = button.closest('.menu__item');
    const link = button.querySelector('a');

    const isLinkClick = e.target.closest('a') !== null;

    if (isLinkClick) {
      return;
    }

    e.preventDefault();
    menuItem.classList.toggle('active');
  }

  menuItems.forEach(item => {
    const buttons = item.querySelectorAll('.menu__button');
    buttons.forEach(button => {
      button.addEventListener('click', handleMenuToggle);
    });
  });

  window.addEventListener('resize', function () {
    if (window.innerWidth > breakpoint) {
      menuItems.forEach(item => {
        item.classList.remove('active');
      });
    }
  });
}

//========================================================================================================================================================

//Форма валидация
function formFieldsInit(options = { viewPass: true, autoHeight: false }) {
  document.body.addEventListener("focusin", function (e) {
    const targetElement = e.target;
    if ((targetElement.tagName === 'INPUT' || targetElement.tagName === 'TEXTAREA')) {
      if (!targetElement.hasAttribute('data-no-focus-classes')) {
        targetElement.classList.add('_form-focus');
        targetElement.parentElement.classList.add('_form-focus');
      }
      formValidate.removeError(targetElement);
      targetElement.hasAttribute('data-validate') ? formValidate.removeError(targetElement) : null;
    }
  });
  document.body.addEventListener("focusout", function (e) {
    const targetElement = e.target;
    if ((targetElement.tagName === 'INPUT' || targetElement.tagName === 'TEXTAREA')) {
      if (!targetElement.hasAttribute('data-no-focus-classes')) {
        targetElement.classList.remove('_form-focus');
        targetElement.parentElement.classList.remove('_form-focus');
      }
      targetElement.hasAttribute('data-validate') ? formValidate.validateInput(targetElement) : null;
      checkFilled(targetElement);
    }
  });
  document.body.addEventListener("input", function (e) {
    const targetElement = e.target;
    if ((targetElement.tagName === 'INPUT' || targetElement.tagName === 'TEXTAREA')) {
      checkFilled(targetElement);
    }
  });
  function checkFilled(element) {
    if (!element.disabled) {
      const hasValue = element.value && element.value.trim().length > 0;
      if (element.type === 'checkbox') {
        if (element.checked) {
          element.classList.add('filled');
          element.parentElement?.classList.add('filled');
        } else {
          element.classList.remove('filled');
          element.parentElement?.classList.remove('filled');
        }
      } else if (element.type === 'radio') {
        if (element.checked) {
          element.classList.add('filled');
          element.parentElement?.classList.add('filled');
        } else {
          element.classList.remove('filled');
          element.parentElement?.classList.remove('filled');
        }
      } else {
        if (hasValue) {
          element.classList.add('filled');
          element.parentElement?.classList.add('filled');
        } else {
          element.classList.remove('filled');
          element.parentElement?.classList.remove('filled');
        }
      }
    }
  }
  if (options.viewPass) {
    document.addEventListener("click", function (e) {
      const targetElement = e.target;
      if (targetElement.closest('.form__viewpass')) {
        const viewpassBlock = targetElement.closest('.form__viewpass');
        const input = viewpassBlock.closest('.form__input').querySelector('input');
        if (input) {
          const isActive = viewpassBlock.classList.contains('_viewpass-active');
          input.setAttribute("type", isActive ? "password" : "text");
          viewpassBlock.classList.toggle('_viewpass-active');
        } else {
          console.error('Input не найден!');
        }
      }
    });
  }
  if (options.autoHeight) {
    const textareas = document.querySelectorAll('textarea[data-autoheight]');
    if (textareas.length) {
      textareas.forEach(textarea => {
        const startHeight = textarea.hasAttribute('data-autoheight-min') ?
          Number(textarea.dataset.autoheightMin) : Number(textarea.offsetHeight);
        const maxHeight = textarea.hasAttribute('data-autoheight-max') ?
          Number(textarea.dataset.autoheightMax) : Infinity;
        setHeight(textarea, Math.min(startHeight, maxHeight))
        textarea.addEventListener('input', () => {
          if (textarea.scrollHeight > startHeight) {
            textarea.style.height = `auto`;
            setHeight(textarea, Math.min(Math.max(textarea.scrollHeight, startHeight), maxHeight));
          }
        });
      });
      function setHeight(textarea, height) {
        textarea.style.height = `${height}px`;
      }
    }
  }
}
formFieldsInit({
  viewPass: true,
  autoHeight: false
});
let formValidate = {
  getErrors(form) {
    let error = 0;
    let formRequiredItems = form.querySelectorAll('*[data-required]');
    if (formRequiredItems.length) {
      formRequiredItems.forEach(formRequiredItem => {
        if ((formRequiredItem.offsetParent !== null || formRequiredItem.tagName === "SELECT") && !formRequiredItem.disabled) {
          error += this.validateInput(formRequiredItem);
        }
      });
    }
    return error;
  },
  validateInput(formRequiredItem) {
    let error = 0;
    if (formRequiredItem.dataset.required === "email") {
      formRequiredItem.value = formRequiredItem.value.replace(" ", "");
      if (this.emailTest(formRequiredItem)) {
        this.addError(formRequiredItem);
        this.removeSuccess(formRequiredItem);
        error++;
      } else {
        this.removeError(formRequiredItem);
        this.addSuccess(formRequiredItem);
      }
    } else if (formRequiredItem.type === "checkbox" && !formRequiredItem.checked) {
      this.addError(formRequiredItem);
      this.removeSuccess(formRequiredItem);
      error++;
    } else if (formRequiredItem.dataset.validate === "password-confirm") {
      const passwordInput = document.getElementById('password');
      if (!passwordInput) return error;
      if (formRequiredItem.value !== passwordInput.value) {
        this.addError(formRequiredItem);
        this.removeSuccess(formRequiredItem);
        error++;
      } else {
        this.removeError(formRequiredItem);
        this.addSuccess(formRequiredItem);
      }
    } else {
      if (!formRequiredItem.value.trim()) {
        this.addError(formRequiredItem);
        this.removeSuccess(formRequiredItem);
        error++;
      } else {
        this.removeError(formRequiredItem);
        this.addSuccess(formRequiredItem);
      }
    }
    return error;
  },
  addError(formRequiredItem) {
    formRequiredItem.classList.add('_form-error');
    formRequiredItem.parentElement.classList.add('_form-error');
    let inputError = formRequiredItem.parentElement.querySelector('.form__error');
    if (inputError) formRequiredItem.parentElement.removeChild(inputError);
    if (formRequiredItem.dataset.error) {
      formRequiredItem.parentElement.insertAdjacentHTML('beforeend', `<div class="form__error">${formRequiredItem.dataset.error}</div>`);
    }
  },
  removeError(formRequiredItem) {
    formRequiredItem.classList.remove('_form-error');
    formRequiredItem.parentElement.classList.remove('_form-error');
    if (formRequiredItem.parentElement.querySelector('.form__error')) {
      formRequiredItem.parentElement.removeChild(formRequiredItem.parentElement.querySelector('.form__error'));
    }
  },
  addSuccess(formRequiredItem) {
    formRequiredItem.classList.add('_form-success');
    formRequiredItem.parentElement.classList.add('_form-success');
  },
  removeSuccess(formRequiredItem) {
    formRequiredItem.classList.remove('_form-success');
    formRequiredItem.parentElement.classList.remove('_form-success');
  },
  formClean(form) {
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
      if (input.type !== 'checkbox' && input.type !== 'radio' && input.type !== 'submit' && input.type !== 'button') {
        input.value = '';
      }
      input.classList.remove('_form-focus', '_form-success', '_form-error', 'filled');
      input.parentElement?.classList.remove('_form-focus', '_form-success', '_form-error', 'filled');
      if (input.classList.contains('telephone') && input.clearFilled) {
        input.clearFilled();
      }
    });

    const checkboxes = form.querySelectorAll('.checkbox__input');
    checkboxes.forEach(checkbox => {
      checkbox.checked = false;
      checkbox.classList.remove('_form-success', '_form-error', 'filled');
      checkbox.closest('.checkbox')?.classList.remove('_form-success', '_form-error', 'filled');
    });

    const radios = form.querySelectorAll('input[type="radio"]');
    radios.forEach(radio => {
      radio.checked = false;
      radio.classList.remove('_form-success', '_form-error', 'filled');
      radio.parentElement?.classList.remove('_form-success', '_form-error', 'filled');
    });

    const selects = form.querySelectorAll('select');
    selects.forEach(select => {
      select.selectedIndex = 0;
      select.classList.remove('_form-success', '_form-error', 'filled');
    });

    form.querySelectorAll('.form__error').forEach(el => el.remove());

    if (modules_flsModules.select) {
      let selectsDiv = form.querySelectorAll('div.select');
      if (selectsDiv.length) {
        for (let index = 0; index < selectsDiv.length; index++) {
          const select = selectsDiv[index].querySelector('select');
          modules_flsModules.select.selectBuild(select);
        }
      }
    }
  },
  emailTest(formRequiredItem) {
    return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(formRequiredItem.value);
  }
};

//Форма отправка
function formSubmit() {
  const forms = document.forms;
  if (forms.length) {
    for (const form of forms) {
      form.addEventListener('submit', function (e) {
        const form = e.target;
        formSubmitAction(form, e);
      });
      form.addEventListener('reset', function (e) {
        const form = e.target;
        formValidate.formClean(form);
      });
    }
  }

  document.addEventListener('click', function (e) {
    const clearButton = e.target.closest('.btn-clear');
    if (clearButton) {
      e.preventDefault();
      const form = clearButton.closest('form');
      if (form) {
        formValidate.formClean(form);
      }
    }
  });

  async function formSubmitAction(form, e) {
    const error = !form.hasAttribute('data-no-validate') ? formValidate.getErrors(form) : 0;
    if (error === 0) {
      const ajax = form.hasAttribute('data-ajax');
      if (ajax) {
        e.preventDefault();
        const formAction = form.getAttribute('action') ? form.getAttribute('action').trim() : '#';
        const formMethod = form.getAttribute('method') ? form.getAttribute('method').trim() : 'GET';
        const formData = new FormData(form);
        form.classList.add('_sending');
        const response = await fetch(formAction, {
          method: formMethod,
          body: formData
        });
        if (response.ok) {
          let responseResult = await response.json();
          form.classList.remove('_sending');
          formSent(form, responseResult);
        } else {
          alert("Помилка");
          form.classList.remove('_sending');
        }
      } else if (form.hasAttribute('data-dev')) {
        e.preventDefault();
        formSent(form);
      }
    } else {
      e.preventDefault();
      if (form.querySelector('._form-error') && form.hasAttribute('data-goto-error')) {
        const formGoToErrorClass = form.dataset.gotoError ? form.dataset.gotoError : '._form-error';
        gotoBlock(formGoToErrorClass, true, 1000);
      }
    }
  }

  function formSent(form, responseResult = ``) {
    document.dispatchEvent(new CustomEvent("formSent", {
      detail: {
        form: form
      }
    }));
    const telephoneInputs = form.querySelectorAll('.telephone');
    telephoneInputs.forEach(input => {
      const parent = input.closest('.form__input');
      if (parent) {
        parent.classList.remove('filled');
        input.classList.remove('filled');
      }
    });

    showThanksBlock(form);

    setTimeout(() => {
      if (modules_flsModules.popup) {
        const popup = form.dataset.popupMessage;
        popup ? modules_flsModules.popup.open(popup) : null;
      }
    }, 0);
    formValidate.formClean(form);
  }

  function showThanksBlock(form) {
    const thanksId = form.getAttribute('data-thanks');
    if (thanksId) {
      const thanksBlock = document.querySelector(thanksId);
      if (thanksBlock) {
        thanksBlock.classList.add('active');

        setTimeout(() => {
          thanksBlock.classList.remove('active');
        }, 5000);
      }
    }
  }
}
formSubmit();


//========================================================================================================================================================

//Попап
class Popup {
  constructor(options) {
    let config = {
      logging: true,
      init: true,
      attributeOpenButton: "data-popup",
      attributeCloseButton: "data-close",
      fixElementSelector: "[data-lp]",
      youtubeAttribute: "data-popup-youtube",
      youtubePlaceAttribute: "data-popup-youtube-place",
      setAutoplayYoutube: true,
      classes: {
        popup: "popup",
        popupContent: "popup__content",
        popupActive: "popup_show",
        bodyActive: "popup-show",
        nestingClass: "popup-nesting"
      },
      focusCatch: true,
      closeEsc: true,
      bodyLock: true,
      hashSettings: {
        goHash: true
      },
      on: {
        beforeOpen: function () { },
        afterOpen: function () { },
        beforeClose: function () { },
        afterClose: function () { }
      }
    };
    this.youTubeCode;
    this.isOpen = false;
    this.targetOpen = {
      selector: false,
      element: false
    };
    this.previousOpen = {
      selector: false,
      element: false
    };
    this.lastClosed = {
      selector: false,
      element: false
    };
    this._dataValue = false;
    this.hash = false;
    this._reopen = false;
    this._selectorOpen = false;
    this.lastFocusEl = false;
    this._focusEl = ["a[href]", 'input:not([disabled]):not([type="hidden"]):not([aria-hidden])', "button:not([disabled]):not([aria-hidden])", "select:not([disabled]):not([aria-hidden])", "textarea:not([disabled]):not([aria-hidden])", "area[href]", "iframe", "object", "embed", "[contenteditable]", '[tabindex]:not([tabindex^="-"])'];
    this.options = {
      ...config,
      ...options,
      classes: {
        ...config.classes,
        ...options?.classes
      },
      hashSettings: {
        ...config.hashSettings,
        ...options?.hashSettings
      },
      on: {
        ...config.on,
        ...options?.on
      }
    };
    this.bodyLock = false;
    this.previousMenuState = false;
    this.popupStack = [];
    this.options.init ? this.initPopups() : null;
  }
  initPopups() {
    this.eventsPopup();
  }
  eventsPopup() {
    document.addEventListener("click", function (e) {
      const buttonOpen = e.target.closest(`[${this.options.attributeOpenButton}]`);
      if (buttonOpen) {
        e.preventDefault();
        this._dataValue = buttonOpen.getAttribute(this.options.attributeOpenButton) ? buttonOpen.getAttribute(this.options.attributeOpenButton) : "error";
        this.youTubeCode = buttonOpen.getAttribute(this.options.youtubeAttribute) ? buttonOpen.getAttribute(this.options.youtubeAttribute) : null;
        if ("error" !== this._dataValue) {
          if (!this.isOpen) this.lastFocusEl = buttonOpen;
          this.targetOpen.selector = `${this._dataValue}`;
          this._selectorOpen = true;
          this.open();
          return;
        }
        return;
      }
      const buttonClose = e.target.closest(`[${this.options.attributeCloseButton}]`);
      if (buttonClose || !e.target.closest(`.${this.options.classes.popupContent}`) && this.isOpen) {
        e.preventDefault();
        const popupElement = buttonClose ? buttonClose.closest(`.${this.options.classes.popup}`) : null;
        if (popupElement) {
          this.closePopup(popupElement);
        } else {
          this.close();
        }
        return;
      }
    }.bind(this));
    document.addEventListener("keydown", function (e) {
      if (this.options.closeEsc && 27 == e.which && "Escape" === e.code && this.isOpen) {
        e.preventDefault();
        this.close();
        return;
      }
      if (this.options.focusCatch && 9 == e.which && this.isOpen) {
        this._focusCatch(e);
        return;
      }
    }.bind(this));
    if (this.options.hashSettings.goHash) {
      window.addEventListener("hashchange", function () {
        if (window.location.hash) this._openToHash();
        else this.close(this.targetOpen.selector);
      }.bind(this));
      window.addEventListener("load", function () {
        if (window.location.hash) this._openToHash();
      }.bind(this));
    }
  }
  closePopup(popupElement) {
    if (!popupElement) return;
    const isNesting = popupElement.classList.contains(this.options.classes.nestingClass);
    if (isNesting) {
      const allOpened = document.querySelectorAll(`.${this.options.classes.popupActive}`);
      if (allOpened.length > 1) {
        const lastOpened = allOpened[allOpened.length - 1];
        if (lastOpened === popupElement || popupElement.contains(lastOpened)) {
          lastOpened.classList.remove(this.options.classes.popupActive);
          lastOpened.setAttribute("aria-hidden", "true");
          const youtubePlace = lastOpened.querySelector(`[${this.options.youtubePlaceAttribute}]`);
          if (youtubePlace) youtubePlace.innerHTML = "";
          if (this.popupStack.length > 0) {
            this.popupStack.pop();
          }
          if (allOpened.length === 2) {
            const parentPopup = allOpened[0];
            if (parentPopup) {
              parentPopup.setAttribute("aria-hidden", "false");
            }
          }
          this.options.on.afterClose(this);
          document.dispatchEvent(new CustomEvent("afterPopupClose", {
            detail: { popup: this }
          }));
          return;
        }
      }
      popupElement.classList.remove(this.options.classes.popupActive);
      popupElement.setAttribute("aria-hidden", "true");
      const youtubePlace = popupElement.querySelector(`[${this.options.youtubePlaceAttribute}]`);
      if (youtubePlace) youtubePlace.innerHTML = "";
      if (this.popupStack.length > 0) {
        this.popupStack.pop();
      }
      const remainingPopups = document.querySelectorAll(`.${this.options.classes.popupActive}`);
      if (remainingPopups.length === 0) {
        document.documentElement.classList.remove(this.options.classes.bodyActive);
        !this.bodyLock ? bodyUnlock() : null;
        this.isOpen = false;
      } else {
        const parentPopup = remainingPopups[remainingPopups.length - 1];
        if (parentPopup) {
          parentPopup.setAttribute("aria-hidden", "false");
        }
      }
      this.options.on.afterClose(this);
      document.dispatchEvent(new CustomEvent("afterPopupClose", {
        detail: { popup: this }
      }));
    } else {
      this.close();
    }
  }
  open(selectorValue) {
    if (bodyLockStatus) {
      this.bodyLock = document.documentElement.classList.contains("lock") && !this.isOpen ? true : false;
      if (selectorValue && "string" === typeof selectorValue && "" !== selectorValue.trim()) {
        this.targetOpen.selector = selectorValue;
        this._selectorOpen = true;
      }
      const targetElement = document.querySelector(selectorValue);
      const isNesting = targetElement ? targetElement.classList.contains(this.options.classes.nestingClass) : false;
      if (this.isOpen && isNesting) {
        if (this.targetOpen.element) {
          this.popupStack.push({
            selector: this.targetOpen.selector,
            element: this.targetOpen.element
          });
        }
      }
      if (this.isOpen && !isNesting) {
        this._reopen = true;
        this.close();
      }
      if (!this._selectorOpen) this.targetOpen.selector = this.lastClosed.selector;
      if (!this._reopen) this.previousActiveElement = document.activeElement;
      this.targetOpen.element = document.querySelector(this.targetOpen.selector);
      if (this.targetOpen.element) {
        this.previousMenuState = document.documentElement.classList.contains('menu-open');
        if (this.previousMenuState) {
          if (typeof menuClose === 'function') {
            menuClose();
          } else {
            document.documentElement.classList.remove("menu-open");
            if (typeof bodyUnlock === 'function') bodyUnlock();
          }
        }
        if (this.youTubeCode) {
          const codeVideo = this.youTubeCode;
          const urlVideo = `https://www.youtube.com/embed/${codeVideo}?rel=0&showinfo=0&autoplay=1`;
          const iframe = document.createElement("iframe");
          iframe.setAttribute("allowfullscreen", "");
          const autoplay = this.options.setAutoplayYoutube ? "autoplay;" : "";
          iframe.setAttribute("allow", `${autoplay}; encrypted-media`);
          iframe.setAttribute("src", urlVideo);
          if (!this.targetOpen.element.querySelector(`[${this.options.youtubePlaceAttribute}]`)) {
            this.targetOpen.element.querySelector(".popup__text").setAttribute(`${this.options.youtubePlaceAttribute}`, "");
          }
          this.targetOpen.element.querySelector(`[${this.options.youtubePlaceAttribute}]`).appendChild(iframe);
        }
        if (this.options.hashSettings.location) {
          this._getHash();
          this._setHash();
        }
        this.options.on.beforeOpen(this);
        document.dispatchEvent(new CustomEvent("beforePopupOpen", {
          detail: { popup: this }
        }));
        this.targetOpen.element.classList.add(this.options.classes.popupActive);
        document.documentElement.classList.add(this.options.classes.bodyActive);
        if (!isNesting || this.popupStack.length <= 1) {
          if (!this._reopen) !this.bodyLock ? bodyLock() : null;
          else this._reopen = false;
        }
        this.targetOpen.element.setAttribute("aria-hidden", "false");
        this.previousOpen.selector = this.targetOpen.selector;
        this.previousOpen.element = this.targetOpen.element;
        this._selectorOpen = false;
        this.isOpen = true;
        this.options.on.afterOpen(this);
        document.dispatchEvent(new CustomEvent("afterPopupOpen", {
          detail: { popup: this }
        }));
      }
    }
  }
  close(selectorValue) {
    if (selectorValue && "string" === typeof selectorValue && "" !== selectorValue.trim()) {
      this.previousOpen.selector = selectorValue;
    }
    if (!this.isOpen || !bodyLockStatus) return;
    const allNested = document.querySelectorAll(`.${this.options.classes.nestingClass}.${this.options.classes.popupActive}`);
    if (allNested.length > 0) {
      for (let i = allNested.length - 1; i >= 0; i--) {
        allNested[i].classList.remove(this.options.classes.popupActive);
        allNested[i].setAttribute("aria-hidden", "true");
        const youtubePlace = allNested[i].querySelector(`[${this.options.youtubePlaceAttribute}]`);
        if (youtubePlace) youtubePlace.innerHTML = "";
      }
      this.popupStack = [];
    }
    this.options.on.beforeClose(this);
    document.dispatchEvent(new CustomEvent("beforePopupClose", {
      detail: { popup: this }
    }));
    if (this.youTubeCode) {
      if (this.targetOpen.element.querySelector(`[${this.options.youtubePlaceAttribute}]`)) {
        this.targetOpen.element.querySelector(`[${this.options.youtubePlaceAttribute}]`).innerHTML = "";
      }
    }
    this.previousOpen.element.classList.remove(this.options.classes.popupActive);
    const videoElement = this.previousOpen.element.querySelector("video");
    if (videoElement) videoElement.pause();
    this.previousOpen.element.setAttribute("aria-hidden", "true");
    if (!this._reopen) {
      document.documentElement.classList.remove(this.options.classes.bodyActive);
      !this.bodyLock ? bodyUnlock() : null;
      this.isOpen = false;
      this.popupStack = [];
      if (this.previousMenuState) {
        if (typeof menuOpen === 'function') {
          menuOpen();
        } else {
          document.documentElement.classList.add("menu-open");
          if (typeof bodyLock === 'function') bodyLock();
        }
      }
    }
    document.dispatchEvent(new CustomEvent("afterPopupClose", {
      detail: { popup: this }
    }));
    this.options.on.afterClose(this);
  }
  _getHash() {
    if (this.options.hashSettings.location) {
      this.hash = this.targetOpen.selector.includes("#") ? this.targetOpen.selector : this.targetOpen.selector.replace(".", "#");
    }
  }
  _openToHash() {
    let classInHash = document.querySelector(`.${window.location.hash.replace("#", "")}`) ? `.${window.location.hash.replace("#", "")}` : document.querySelector(`${window.location.hash}`) ? `${window.location.hash}` : null;
    const buttons = document.querySelector(`[${this.options.attributeOpenButton} = "${classInHash}"]`) ? document.querySelector(`[${this.options.attributeOpenButton} = "${classInHash}"]`) : document.querySelector(`[${this.options.attributeOpenButton} = "${classInHash.replace(".", "#")}"]`);
    if (buttons && classInHash) this.open(classInHash);
  }
  _setHash() {
    history.pushState("", "", this.hash);
  }
  _removeHash() {
    history.pushState("", "", window.location.href.split("#")[0]);
  }
  _focusCatch(e) {
    const focusable = this.targetOpen.element.querySelectorAll(this._focusEl);
    const focusArray = Array.prototype.slice.call(focusable);
    const focusedIndex = focusArray.indexOf(document.activeElement);
    if (e.shiftKey && 0 === focusedIndex) {
      focusArray[focusArray.length - 1].focus();
      e.preventDefault();
    }
    if (!e.shiftKey && focusedIndex === focusArray.length - 1) {
      focusArray[0].focus();
      e.preventDefault();
    }
  }
}
modules_flsModules.popup = new Popup({});
function menuOpen() {
  bodyLock();
  document.documentElement.classList.add("menu-open");
}
function menuClose() {
  bodyUnlock();
  document.documentElement.classList.remove("menu-open");
}




