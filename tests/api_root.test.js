import test from 'ava';
import request from 'supertest';

// disable logging
import log from 'loglevel';
log.disableAll();

// import module to test
import app from '../app.js';

test("default API route is working", async (t) => {
  const response = await request(app).get('/api/');
  // assert response
  t.is(response.text, "Hello World!");
  t.is(response.statusCode, 200);
});

test("API route 404 handler is working", async (t) => {
  let response = await request(app).post('/api');
  // assert response
  t.is(response.body.result.length, 0);
  t.is(response.statusCode, 404);
  t.is(response.body.message, "API route 'POST /' is not defined");

  response = await request(app).get('/api/foo/bar');
  // assert response
  t.is(response.body.result.length, 0);
  t.is(response.statusCode, 404);
  t.is(response.body.message, "API route 'GET /foo/bar' is not defined");

  response = await request(app).delete('/api/0');
  // assert response
  t.is(response.body.result.length, 0);
  t.is(response.statusCode, 404);
  t.is(response.body.message, "API route 'DELETE /0' is not defined");
});
