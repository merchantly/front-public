import { getScrollTop, setScrollTop } from './dom';

export const animate = (runner) => {
  const action = (
    window.requestAnimationFrame       ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame    ||
    window.oRequestAnimationFrame      ||
    window.msRequestAnimationFrame     ||
    function(cb) {
      window.setTimeout(cb, 1000 / 60);
    }
  );

  action.call(window, runner);
};

export const speedConduct = (originSpeed, duration, cur, total) => {
  if (total === 0) return 0;

  const { PI, sin: method} = Math;
  const INITIAL_SPEED = 2;

  return originSpeed * method(PI * (total - cur) / total) + INITIAL_SPEED;
};

export const scrollToTop = (elt, duration) => {
  const originY = getScrollTop(elt);
  const originSpeed = originY / (duration / 60);
  let currentY = originY;
  let currentSpeed;

  const operate = () => {
    currentSpeed = speedConduct(originSpeed, duration, currentY, originY);
    currentY -= currentSpeed;
    if (setScrollTop(elt, currentY) !== 0) {
      animate(operate);
    }
  };

  operate();
};