import { OkKo } from '../okko';
import {
  ConfigurationCSSProperties,
  ConfigurationDefaultStyle,
  ConfigurationModule,
} from './abstract';

export interface ConfigurationIconStyle extends ConfigurationDefaultStyle {
  icon: ConfigurationCSSProperties;
}

export interface ConfigurationIcon extends ConfigurationModule {
  value?: OkKo;
  adaptativeColor: boolean;
  style?: ConfigurationIconStyle;
}
