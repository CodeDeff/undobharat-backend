import test from 'node:test';
import assert from 'node:assert/strict';
import { createApp } from '../server.js';

function once(server, eventName) {
  return new Promise((resolve) => {
    server.once(eventName, () => resolve());
  });
}

test('allows preflight requests from the Vercel frontend origin', async () => {
  const app = createApp({ connectDb: false });
  const server = app.listen(0);
  await once(server, 'listening');

  try {
    const address = server.address();
    const response = await fetch(`http://127.0.0.1:${address.port}/api/auth/login`, {
      method: 'OPTIONS',
      headers: {
        Origin: 'https://undobharat-git-developement-codedeffs-projects.vercel.app',
        'Access-Control-Request-Method': 'POST',
        'Access-Control-Request-Headers': 'content-type,authorization'
      }
    });

    assert.equal(response.status, 204);
    assert.equal(
      response.headers.get('access-control-allow-origin'),
      'https://undobharat-git-developement-codedeffs-projects.vercel.app'
    );
    assert.match(response.headers.get('access-control-allow-methods') || '', /POST/i);
  } finally {
    server.close();
  }
});
