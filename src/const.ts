/* eslint-disable @typescript-eslint/camelcase */
export const CARD_VERSION = '0.3.1';

export const DEFAULT_CONFIG = {
    hours_to_show: 24,
    severity: 100,
    average_text: '%',
    status_template: '[[ current ]]',
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
    template: '[[ from_date ]] - [[ to_date ]] | [[ average ]]%',
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

export const DEFAULT_ICON = 'mdi:heart';
