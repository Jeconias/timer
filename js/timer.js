import {
  SECOND,
  CURRENT_TIME_PROPERTY,
  DEFAULT_TIMERS,
  CUSTOM_EVENTS,
  INTERVAL_ID_PROPERTY,
  TIME_PROPERTY,
  LI_NAME_PROPERTY,
  LI_NAME_VALUE,
} from './constants';
import { getDarkColor } from './helpers';

const getDateInstance = () => {
  const d = new Date(2014, 10, 10);
  const timezoneOffset = d.getTimezoneOffset() * 60000;
  return new Date(d.getTime() - timezoneOffset);
};

/**
 *
 * @param {number} time
 */
const getTime = (time) => {
  const d = getDateInstance();
  d.setTime(time);

  const isoStringTimer = d.toISOString();
  const [_, year, month, day, hour, minute, second] = isoStringTimer.match(
    /(\d{4})-(\d{1,2})-(\d{1,2})T(\d{1,2}):(\d{1,2}):(\d{1,2})/
  );

  return { year, month, day, hour, minute, second };
};

/**
 *
 * @param {number} intervalId
 * @param {HTMLElement} el
 */
const clear = (intervalId, el) => {
  let id = intervalId;
  if (typeof intervalId === 'string') {
    id = parseInt(intervalId);
  }

  clearInterval(id);

  if (el) {
    el.removeAttribute(INTERVAL_ID_PROPERTY);
  }
};

/**
 *
 * @param {{timer: number}} detail
 * @returns
 */
const newEventStartTimer = (detail) =>
  new CustomEvent(CUSTOM_EVENTS.START_TIMER, {
    detail,
  });

/**
 *
 * @param {number} time
 * @param {HTMLElement} target
 * @param {boolean} skipSetTime
 */
const startTimer = (time, target, skipSetTime) => {
  if (!skipSetTime) target.setAttribute(TIME_PROPERTY, time);

  const base = getDateInstance().getTime();
  const d = getDateInstance();
  d.setMilliseconds(time);

  let id;
  id = setInterval(() => {
    const newTime = d.getTime() - SECOND;
    d.setTime(newTime);

    const { hour, minute, second } = getTime(newTime);

    target.innerHTML = `${hour}:${minute}:${second}`;
    target.setAttribute(INTERVAL_ID_PROPERTY, id);
    target.setAttribute(CURRENT_TIME_PROPERTY, newTime - base);

    if (newTime < base) {
      clear(id, target);
      target.innerHTML = '00:00:00';
      target.removeAttribute(CURRENT_TIME_PROPERTY);
    }
  }, SECOND);
};

/**
 *
 * @param {CustomEvent<{timer: number, intervalId: number}>} event
 * @this { HTMLSpanElement }
 */
const handleStartTimer = function (event) {
  const el = this;
  const timeFromEl = event.detail?.timer;

  if (event.detail?.intervalId) {
    clear(event.detail.intervalId, el);
  }

  startTimer(timeFromEl, el);
};

/**
 *
 * @param {CustomEvent<{intervalId: number}>} event
 * @this { HTMLSpanElement }
 */
const handleStopTimer = () => {
  const el = document.getElementById('timer');
  const intervalIdFromEl = el.getAttribute(INTERVAL_ID_PROPERTY);

  if (intervalIdFromEl) {
    clear(intervalIdFromEl, el);
  } else {
    const currentTime = parseInt(el.getAttribute(CURRENT_TIME_PROPERTY));
    if (isNaN(currentTime)) return;

    startTimer(currentTime, el, true);
  }
};

/**
 *
 * @param {KeyboardEvent} event
 */
const handleOnGlobalKeyDown = (event) => {
  if (event.code === 'Space' || event.keyCode === 32) {
    handleStopTimer();
  }

  const [_, value] = event?.code?.match(/(?:numpad|digit)(\d{1})/i) ?? [];
  const number = parseInt(value);
  if (!isNaN(number)) {
    const li = document.getElementsByName(LI_NAME_VALUE(number));
    if (li.length === 1) {
      li[0].dispatchEvent(new Event('click'));
    }
  }
};

/**
 *
 * @param {MutationRecord[]} mutations
 */
const onTimerChange = (mutations) => {
  const backgroundTimer = document.getElementById('background-timer');

  const timeNode = mutations?.find(
    (m) => m.attributeName === CURRENT_TIME_PROPERTY
  );
  const target = timeNode?.target;

  const currentTimeValue = target?.getAttribute(CURRENT_TIME_PROPERTY);
  const timeValue = target?.getAttribute(TIME_PROPERTY);

  const currentTimeValueAsInt = parseInt(currentTimeValue);
  const timeValueAsInt = parseInt(timeValue);

  if (isNaN(currentTimeValueAsInt) || isNaN(timeValueAsInt)) return;

  const percentToEnd = Math.floor(
    (currentTimeValueAsInt * 100) / timeValueAsInt
  );
  const pageHeight = document.body.scrollHeight;
  const newHeight = Math.floor(pageHeight - (pageHeight * percentToEnd) / 100);

  backgroundTimer.style.bottom = `${newHeight}px`;
};

window.addEventListener('load', function () {
  const main = document.getElementById('main');
  const timer = document.getElementById('timer');
  const timers = document.getElementById('timers');

  if (!timer || !timers) return;

  let shortcutNumber = 0;
  for (const intTimer of DEFAULT_TIMERS) {
    const li = document.createElement('li');
    const span = document.createElement('span');
    const b = document.createElement('b');
    const { hour, minute, second } = getTime(intTimer);

    const applyNewTimer = () => {
      const intervalId = timer.getAttribute(INTERVAL_ID_PROPERTY);

      timer.dispatchEvent(
        newEventStartTimer({
          timer: intTimer,
          intervalId,
        })
      );

      main.style.backgroundColor = getDarkColor();
    };

    b.innerHTML = shortcutNumber;
    span.innerHTML = `${hour}:${minute}:${second}`;

    span.appendChild(b);
    li.appendChild(span);
    li.setAttribute(LI_NAME_PROPERTY, LI_NAME_VALUE(shortcutNumber++));
    li.addEventListener('click', applyNewTimer);

    timers.appendChild(li);
  }

  timer.addEventListener(CUSTOM_EVENTS.START_TIMER, handleStartTimer);
  timer.addEventListener('click', handleStopTimer);
  document.body.addEventListener('keydown', handleOnGlobalKeyDown);

  const observer = new MutationObserver(onTimerChange);
  observer.observe(timer, { attributes: true });
});
