export const getScrollTop = (elt) => (
  elt.scrollY != null ? elt.scrollY : elt.scrollTop
);

export const setScrollTop = (elt, nextStep) => {
  const step = nextStep <= 0 ? 0 : nextStep;

  elt.scrollTo ? elt.scrollTo(0, step) : elt.scrollTop = step;

  return step;
};

export const getElt = (selector) => (
  selector === 'window' ? window : document.querySelector(selector)
);

export function canUseDOM() {
  return !!(
    typeof window !== 'undefined' &&
    window.document &&
    window.document.createElement
  );
}

export function addEvent(el, eventName, callback, useCapture) {
  if (el.addEventListener) {
    el.addEventListener(eventName, callback, !!useCapture);
    return true;
  } else if (el.attachEvent) {
    return el.attachEvent(`on${eventName}`, callback);
  } else {
    const eventType = `on${eventName}`;
    const newCallback = el[eventType]
      ? (function (fn1, fn2) {
          fn1.apply(this, arguments);
          fn2.apply(this, arguments);
        })(el[eventType], callback)
      : callback;

    el[eventType] = newCallback;
    return true;
  }
}

let transitionEndEvent = void 0;

export function getTransitionEndEvent() {
  if (transitionEndEvent) {
    return transitionEndEvent;
  }

  const el = document.createElement('fakeelement');
  const transitions = {
    'transition': 'transitionend',
    'OTransition': 'oTransitionEnd',
    'MozTransition': 'transitionend',
    'WebkitTransition': 'webkitTransitionEnd',
  };
  let t;

  for (t in transitions){
    if (el.style[t] !== void 0){
      transitionEndEvent = transitions[t];

      return transitionEndEvent;
    }
  }

  return false;
}
