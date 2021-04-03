import { LovelaceCardConfig } from 'custom-card-helpers';

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

// Snake case here to respect Yaml home assistant
export interface CardConfig extends LovelaceCardConfig {
    type: string;
    entity: string;
    name?: string;
    icon?: string;
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
}
