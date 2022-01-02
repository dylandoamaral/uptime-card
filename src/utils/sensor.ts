import { Status } from '../types/entities';

/**
 * Return the status of the sensor based on the state.
 *
 * @param state The state of the sensor
 * @param onValue The value that represents the state ON
 * @param offValue The value that represents the state OFF
 * @param entityClass The class of the entity
 * @returns The status of the sensor
 */
export function getStatusFromState(
  state?: string,
  onValue?: string,
  offValue?: string,
  entityClass?: string,
): Status {
  switch (state) {
    case null || undefined:
      return Status.UNKNOWN;
    case onValue:
      return Status.ON;
    case offValue:
      return Status.OFF;
    default:
      if (!onValue && !offValue) {
        if (entityClass === 'binary_sensor') {
          switch (state) {
            case 'on':
              return Status.ON;
            case 'off':
              return Status.OFF;
            default:
              return Status.UNKNOWN;
          }
        } else {
          return Status.UNKNOWN;
        }
      }
      return !onValue ? Status.ON : Status.OFF;
  }
}
