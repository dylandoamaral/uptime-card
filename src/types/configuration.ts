import { LovelaceCardConfig } from 'custom-card-helpers';

export interface OkKoConfiguration {
  ok?: string;
  ko?: string;
}

export type OkKo = OkKoConfiguration | string;

export interface ConfigurationTitle {
  text?: string;
  show: boolean;
  adaptative_color: boolean;
}

export interface ConfigurationIcon {
  value?: OkKo;
  show: boolean;
  adaptative_color: boolean;
}

export interface ConfigurationColor {
  ok: string;
  ko: string;
  half: string;
  unknown: string;
}

export interface ConfigurationState {
  value?: OkKo;
  alias?: OkKo;
  attribute?: string;
}

export interface Configuration extends LovelaceCardConfig {
  entity?: string;
  title: ConfigurationTitle;
  icon: ConfigurationIcon;
  state: ConfigurationState;
  color: ConfigurationColor;
}
