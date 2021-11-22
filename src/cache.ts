import localForage from 'localforage/src/localforage';

localForage.config({
  name: 'uptime-card',
  version: 1.0,
  storeName: 'uptime-card-history-cache',
  description: 'Uptime card uses caching for the entity history',
});
