import { LovelaceCardConfig } from 'custom-card-helpers';

import { OkKo } from '../okko';
import { ConfigurationIcon } from './icon';
import { ConfigurationStatus } from './status';
import { ConfigurationTitle } from './title';

export interface ConfigurationColor {
  ok: string;
  ko: string;
  half: string;
  unknown: string;
}

export interface ConfigurationState {
  value?: OkKo;
  attribute?: string;
}

export interface ConfigurationModules {
  title?: ConfigurationTitle;
  icon?: ConfigurationIcon;
  status?: ConfigurationStatus;
}

export interface Configuration extends LovelaceCardConfig {
  entity?: string;
  state: ConfigurationState;
  color: ConfigurationColor;
  modules?: ConfigurationModules;
}
