import test from 'node:test';
import assert from 'node:assert/strict';

import { verifyOTP } from '../src/controllers/otpController/RegisterOtp.js';

test('verifyOTP controller is a function', () => {
  assert.equal(typeof verifyOTP, 'function');
});
