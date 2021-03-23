import { LovelaceCardConfig } from 'custom-card-helpers';

interface ShowConfig {
    header: boolean;
    icon: boolean;
    status: boolean;
    timeline: boolean;
    footer: boolean;
}

interface ColorConfig {
    ok: string;
    ko: string;
    half: string;
    none: string;
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

// Snake case here to respect Yaml home assistant
export interface CardConfig extends LovelaceCardConfig {
    type: string;
    entity: string;
    name?: string;
    icon?: string;
    on?: string;
    off?: string;
    severity: number;
    hours_to_show: number;
    update_interval?: number;
    color: ColorConfig;
    alias: AliasConfig;
    show: ShowConfig;
    bar: BarConfig;
}