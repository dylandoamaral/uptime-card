import { expect } from '@open-wc/testing';

import { Status } from '../../src/types/entities';
import { getStatusFromState } from '../../src/utils/sensor';

describe('getStatusFromState', () => {
  it('should return unknown if the state is undefined', () => {
    const status = getStatusFromState(undefined, 'ok', 'ko', 'unknown');
    expect(status).to.equal(Status.UNKNOWN);
  });

  it('should return ok if the state is equal to okValue', () => {
    const state = 'ok';
    const status = getStatusFromState(state, state, 'ok', 'unknown');
    expect(status).to.equal(Status.OK);
  });

  it('should return ko if the state is equal to koValue', () => {
    const state = 'ko';
    const status = getStatusFromState(state, 'ok', state, 'unknown');
    expect(status).to.equal(Status.KO);
  });

  it('should return unknown if the state is defined but the values are not and it is not a binary sensor', () => {
    const status = getStatusFromState('ok', undefined, undefined, 'sensor');
    expect(status).to.equal(Status.UNKNOWN);
  });

  it('should return ok if the state is equal to on for a binary sensor', () => {
    const status = getStatusFromState('on', undefined, undefined, 'binary_sensor');
    expect(status).to.equal(Status.OK);
  });

  it('should return ko if the state is equal to off for a binary sensor', () => {
    const status = getStatusFromState('off', undefined, undefined, 'binary_sensor');
    expect(status).to.equal(Status.KO);
  });

  it('should return unknown if the state is not equal to on/off for a binary sensor', () => {
    const status = getStatusFromState('unknown', undefined, undefined, 'binary_sensor');
    expect(status).to.equal(Status.UNKNOWN);
  });

  it('should return ko if only okValue is defined and the state is different', () => {
    const status = getStatusFromState('state', 'ok', undefined, 'unknown');
    expect(status).to.equal(Status.KO);
  });

  it('should return ok if only koValue is defined and the state is different', () => {
    const status = getStatusFromState('state', undefined, 'ko', 'unknown');
    expect(status).to.equal(Status.OK);
  });
});
