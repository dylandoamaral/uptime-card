import { ConfigurationColor } from './types/configuration/base';
import { ConfigurationIcon } from './types/configuration/icon';
import { ConfigurationStatus } from './types/configuration/status';
import { ConfigurationTitle } from './types/configuration/title';

export const defaultConfigurationTitle: ConfigurationTitle = {
  show: true,
  adaptativeColor: false,
};

export const defaultConfigurationIcon: ConfigurationIcon = {
  show: true,
  adaptativeColor: false,
};

export const defaultConfigurationStatus: ConfigurationStatus = {
  show: true,
  adaptativeColor: true,
};

export const defaultConfigurationColor: ConfigurationColor = {
  ok: '#45C669',
  ko: '#C66445',
  half: '#C6B145',
  unknown: '#C9C9C9',
};
