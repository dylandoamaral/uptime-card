import {
  ConfigurationCSSProperties,
  ConfigurationDefaultStyle,
  ConfigurationModule,
} from './abstract';

export interface ConfigurationTitleStyle extends ConfigurationDefaultStyle {
  title: ConfigurationCSSProperties;
}

export interface ConfigurationTitle extends ConfigurationModule {
  text?: string;
  adaptativeColor: boolean;
  style?: ConfigurationTitleStyle;
}
