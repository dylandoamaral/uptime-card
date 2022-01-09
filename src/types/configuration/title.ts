import {
  ConfigurationCSSProperties,
  ConfigurationModule,
  ConfigurationStyle,
} from './abstract';

export interface ConfigurationTitleStyle extends ConfigurationStyle {
  title: ConfigurationCSSProperties;
}

export interface ConfigurationTitle extends ConfigurationModule {
  text?: string;
  adaptativeColor: boolean;
  style?: ConfigurationTitleStyle;
}
