import test from 'ava';
import request from 'supertest';
import sinon from 'sinon';

// modules and mocks
import * as Database from '../utilities/DatabaseUtilities.js';
sinon.mock(Database);

// DB FIRST, then app
import app from '../app.js';

test("default API route", async (t) => {
  const response = await request(app).get('/api/');
  // assert response
  t.is(response.text, "Hello World!");
  t.is(response.statusCode, 200);
});

test("default error handler", async (t) => {
  t.fail("Not yet implemented");
});
