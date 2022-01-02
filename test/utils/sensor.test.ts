import { expect } from '@open-wc/testing';

import { Status } from '../../src/types/entities';
import { getStatusFromState } from '../../src/utils/sensor';

describe('getStatusFromState', () => {
  it('should return unknown if the state is undefined', () => {
    const status = getStatusFromState(undefined, 'on', 'off', 'unknown');
    expect(status).to.equal(Status.UNKNOWN);
  });

  it('should return on if the state is equal to onValue', () => {
    const state = 'on';
    const status = getStatusFromState(state, state, 'off', 'unknown');
    expect(status).to.equal(Status.ON);
  });

  it('should return off if the state is equal to offValue', () => {
    const state = 'off';
    const status = getStatusFromState(state, 'on', state, 'unknown');
    expect(status).to.equal(Status.OFF);
  });

  it('should return on if the state is equal to on for a binary sensor', () => {
    const status = getStatusFromState('on', undefined, undefined, 'binary_sensor');
    expect(status).to.equal(Status.ON);
  });

  it('should return off if the state is equal to off for a binary sensor', () => {
    const status = getStatusFromState('off', undefined, undefined, 'binary_sensor');
    expect(status).to.equal(Status.OFF);
  });

  it('should return unknown if the state is equal not or/off for a binary sensor', () => {
    const status = getStatusFromState('unknown', undefined, undefined, 'binary_sensor');
    expect(status).to.equal(Status.UNKNOWN);
  });

  it('should return on if only onValue is defined and the state is different', () => {
    const status = getStatusFromState('state', 'on', undefined, 'unknown');
    expect(status).to.equal(Status.OFF);
  });

  it('should return on if only offValue is defined and the state is different', () => {
    const status = getStatusFromState('state', undefined, 'off', 'unknown');
    expect(status).to.equal(Status.ON);
  });
});
