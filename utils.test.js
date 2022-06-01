
const updateJsonField = require('./utils');
test('updateJsonField', async () => {
  updateJsonField('test-data/default.json', 'androidBundleVersionCode', 8)
});

