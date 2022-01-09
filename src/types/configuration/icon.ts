import { OkKo } from '../okko';
import {
  ConfigurationCSSProperties,
  ConfigurationModule,
  ConfigurationStyle,
} from './abstract';

export interface ConfigurationIconStyle extends ConfigurationStyle {
  icon: ConfigurationCSSProperties;
}

export interface ConfigurationIcon extends ConfigurationModule {
  value?: OkKo;
  adaptative_color: boolean;
}
