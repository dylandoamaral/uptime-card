export interface ConfigurationCSSProperties {
  [key: string]: string;
}

export interface ConfigurationStyle {
  [name: string]: ConfigurationCSSProperties;
}

export interface ConfigurationModule {
  show: boolean;
  style?: ConfigurationStyle;
}
