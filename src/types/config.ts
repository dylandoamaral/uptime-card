import { ActionConfig, LovelaceCardConfig } from 'custom-card-helpers';

import { Threshold } from './card';

interface ShowConfig {
    header: boolean;
    title: boolean;
    icon: boolean;
    status: boolean;
    timeline: boolean;
    footer: boolean;
    average: boolean;
}

interface ColorConfig {
    ok: string;
    ko: string;
    half: string;
    none: string;
    title: string;
    status: string;
    icon: string;
    tooltip: string;
}

interface AliasConfig {
    ok?: string;
    ko?: string;
}

interface BarConfig {
    height: number;
    round: number;
    spacing: number;
    amount: number;
}

interface TooltipConfig {
    hour24: boolean;
    template: string;
    animation: boolean;
}

interface AlignmentConfig {
    header: 'left' | 'center' | 'right' | 'spaced';
    icon_first: boolean;
    status: 'left' | 'center' | 'right' | 'spaced';
    tooltip_first: boolean;
}

interface BlinkConfig {
    effect: 'fade' | 'shadow';
    target: 'card' | 'status' | 'title' | 'icon';
    speed: number;
}

// Snake case here to respect Yaml home assistant
export interface CardConfig extends LovelaceCardConfig {
    type: string;
    entity: string;
    name?: string;
    icon?: string;
    ko_icon?: string;
    on?: string;
    off?: string;
    severity: number;
    status_template: string;
    hours_to_show: number;
    update_interval?: number;
    average_text?: string;
    title_adaptive_color: boolean;
    status_adaptive_color: boolean;
    icon_adaptive_color: boolean;
    tooltip_adaptive_color: boolean;
    color: ColorConfig;
    alias: AliasConfig;
    show: ShowConfig;
    bar: BarConfig;
    tooltip: TooltipConfig;
    tap_action: ActionConfig;
    alignment: AlignmentConfig;
    color_thresholds: Threshold[];
    blink: BlinkConfig;
}
