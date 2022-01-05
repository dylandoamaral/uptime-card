import { Status } from '../types/entities';

/**
 * Return the status of the sensor based on the state.
 *
 * @param state The state of the sensor
 * @param okValue The value that represents the state OK
 * @param offValue The value that represents the state KO
 * @param entityClass The class of the entity
 * @returns The status of the sensor
 */
export function getStatusFromState(
  state?: string,
  okValue?: string,
  koValue?: string,
  entityClass?: string,
): Status {
  switch (state) {
    case null || undefined:
      return Status.UNKNOWN;
    case okValue:
      return Status.OK;
    case koValue:
      return Status.KO;
    default:
      if (!okValue && !koValue) {
        if (entityClass === 'binary_sensor') {
          switch (state) {
            case 'on':
              return Status.OK;
            case 'off':
              return Status.KO;
            default:
              return Status.UNKNOWN;
          }
        } else {
          return Status.UNKNOWN;
        }
      }
      return !okValue ? Status.OK : Status.KO;
  }
}
