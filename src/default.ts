import {
  ConfigurationColor,
  ConfigurationIcon,
  ConfigurationTitle,
} from './types/configuration';

export const defaultConfigurationTitle: ConfigurationTitle = {
  show: true,
  adaptativeColor: false,
};

export const defaultConfigurationIcon: ConfigurationIcon = {
  show: true,
  adaptativeColor: false,
};

export const defaultConfigurationColor: ConfigurationColor = {
  ok: '#45C669',
  ko: '#C66445',
  half: '#C6B145',
  unknown: '#C9C9C9',
};
