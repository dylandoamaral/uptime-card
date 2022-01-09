import { OkKo } from '../okko';
import {
  ConfigurationCSSProperties,
  ConfigurationDefaultStyle,
  ConfigurationModule,
} from './abstract';

export interface ConfigurationStatusStyle extends ConfigurationDefaultStyle {
  icon: ConfigurationCSSProperties;
}

export interface ConfigurationStatus extends ConfigurationModule {
  text?: string;
  alias?: OkKo;
  adaptativeColor: boolean;
  style?: ConfigurationStatusStyle;
}
