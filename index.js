const core = require('@actions/core');
const wait = require('./wait');
const updateJsonField = require('./utils');


// most @actions toolkit packages have async methods
async function run() {
  try {
    const ms = core.getInput('milliseconds');
    core.info(`Waiting ${ms} milliseconds ...`);

    core.debug((new Date()).toTimeString()); // debug is only output if you set the secret `ACTIONS_RUNNER_DEBUG` to true
    await wait(parseInt(ms));
    core.info((new Date()).toTimeString());

    core.setOutput('time', new Date().toTimeString());


    let file = core.getInput('file', {required: true});
    let field = core.getInput('field', {required: true});
    let value = core.getInput('value', {required: true});
    let type = core.getInput('type', {required: false});
    if (type) {
      switch (type) {
        case "int":
          value = parseInt(value)
          break;
        case "float":
          value = parseFloat(value)
          break;
        case "bool":
          value = (value === 'true')
          break;
        default:
          break;
      }
    }

    let parseJson = !!core.getInput('parse_json', {required: false});
    if (parseJson) {
      value = JSON.parse(value)
    }
    updateJsonField(file, field, value)

  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
