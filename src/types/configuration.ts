import { LovelaceCardConfig } from 'custom-card-helpers';

export interface OnOffConfiguration {
  on?: string;
  off?: string;
}

export type OnOff = OnOffConfiguration | string;

export interface ConfigurationTitle {
  text?: string;
  show: boolean;
  adaptative_color: boolean;
}

export interface ConfigurationColor {
  on: string;
  off: string;
  half: string;
  unknown: string;
}

export interface ConfigurationState {
  value?: OnOff;
  alias?: OnOff;
  attribute?: string;
}

export interface Configuration extends LovelaceCardConfig {
  entity?: string;
  title: ConfigurationTitle;
  state: ConfigurationState;
  color: ConfigurationColor;
}
