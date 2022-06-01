const wait = require('./wait');
const process = require('process');
const cp = require('child_process');
const path = require('path');
const updateJsonField = require('./utils');
test('updateJsonField', async () => {
  updateJsonField('test-data/default.json', 'androidBundleVersionCode', 8)
});

