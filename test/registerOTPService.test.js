import test from 'node:test';
import assert from 'node:assert/strict';

import { sendOtpService } from '../src/services/otpServices/RegisterOTPService.js';

test('RegisterOTPService can be imported without recursive overflow', () => {
  assert.equal(typeof sendOtpService, 'function');
});