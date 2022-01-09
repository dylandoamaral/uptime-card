import { OkKo } from '../okko';
import {
  ConfigurationCSSProperties,
  ConfigurationModule,
  ConfigurationStyle,
} from './abstract';

export interface ConfigurationStatusStyle extends ConfigurationStyle {
  icon: ConfigurationCSSProperties;
}

export interface ConfigurationStatus extends ConfigurationModule {
  text?: string;
  alias?: OkKo;
  adaptativeColor: boolean;
  style?: ConfigurationStatusStyle;
}
