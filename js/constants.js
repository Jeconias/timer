export const SECOND = 1000;
export const MINUTE = 60 * SECOND;

export const DEFAULT_TIMERS = [
  15 * SECOND,
  30 * SECOND,
  MINUTE,
  5 * MINUTE,
  10 * MINUTE,
  15 * MINUTE,
  20 * MINUTE,
  30 * MINUTE,
  45 * MINUTE,
  60 * MINUTE,
];

export const CUSTOM_EVENTS = {
  START_TIMER: 'startTimer',
  STOP_TIMER: 'click',
};

export const TIME_PROPERTY = 'data-time';

export const CURRENT_TIME_PROPERTY = 'data-current-time';

export const INTERVAL_ID_PROPERTY = 'data-interval-id';

export const LI_NAME_PROPERTY = 'name';

/**
 *
 * @param {string | number} name
 * @returns string
 */
export const LI_NAME_VALUE = (name) => `li-time-${name}`;
