/* eslint-disable @typescript-eslint/camelcase */
export const CARD_VERSION = '0.15.0';

export const DEFAULT_CONFIG = {
  severity: 100,
  update_interval: 30,
  title_template: '[[[ return entity.attributes.friendly_name; ]]]',
  average_template: '[[[ return variables.uptime.toFixed(2); ]]]%',
  status_template: '[[[ return variables.current; ]]]',
  title_adaptive_color: false,
  status_adaptive_color: false,
  icon_adaptive_color: false,
  tooltip_adaptive_color: false,
};

export const DEFAULT_COLOR = {
  ok: '#45C669',
  ko: '#C66445',
  half: '#C6B145',
  none: '#C9C9C9',
  title: 'grey',
  status: 'grey',
  tooltip: 'grey',
  footer: '#AAAAAA',
  icon: 'var(--state-icon-color)',
};

export const DEFAULT_SHOW = {
  header: true,
  title: true,
  icon: true,
  status: true,
  timeline: true,
  footer: true,
  average: true,
};

export const DEFAULT_BAR = {
  height: 46,
  round: 1,
  spacing: 4,
  amount: 36,
};

export const DEFAULT_TOOLTIP = {
  hour24: false,
  template:
    '[[[ return variables.from_date; ]]] - \
        [[[ return variables.to_date; ]]] | \
        [[[ return variables.average; ]]]%',
  animation: true,
};

export const DEFAULT_ACTION = {
  action: 'more-info',
};

export const DEFAULT_ALIGNMENT = {
  header: 'spaced',
  icon_first: false,
  status: 'spaced',
  tooltip_first: false,
};

export const DEFAULT_INIT = {
  animation: 'raise',
  duration: 0.5,
};

export const DEFAULT_CLIP = {
  title: 25,
  status: 25,
};

export const DEFAULT_DURATION = {
  quantity: 1,
  unit: 'day',
};

export const DEFAULT_ICON = 'mdi:heart';
