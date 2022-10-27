import test from 'ava';
import request from 'supertest-as-promised';
import sinon from 'sinon';

// modules and mocks
import * as Database from '../utilities/DatabaseUtilities.js';
sinon.stub(Database, 'createSchema');
sinon.stub(Database, 'query');

// DB FIRST, then app
import app from '../app.js';

test("default error handler", async (t) => {
  t.fail("Not yet implemented");
})
