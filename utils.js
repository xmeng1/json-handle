const core = require("@actions/core");
const fs = require("fs");

let updateJsonField = function updateJsonField(file, field, value) {
  try {
    let data = fs.readFileSync(file, 'utf8');
    let obj = JSON.parse(data);
    let root = obj;

    let parts = field.split(".");
    parts.forEach((part, index) => {
      let isLastItem = index === parts.length - 1;
      if (isLastItem) {
        obj[part] = value;
      } else {
        obj[part] = obj[part] || {}
        obj = obj[part];
      }
    });

    data = JSON.stringify(root, null, 2);
    fs.writeFileSync(file, data, 'utf8');
  } catch (error) {
    core.setFailed(error.message);
    throw error;
  }

}
module.exports = updateJsonField;
