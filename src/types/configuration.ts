import { LovelaceCardConfig } from 'custom-card-helpers';

import { OkKo } from './okko';

export interface ConfigurationModule {
  show: boolean;
}

export interface ConfigurationTitle extends ConfigurationModule {
  text?: string;
  adaptative_color: boolean;
}

export interface ConfigurationIcon extends ConfigurationModule {
  value?: OkKo;
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
