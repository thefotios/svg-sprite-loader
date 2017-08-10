const path = require('path');
const shell = require('shelljs');
const { getCliArgs, getEnvsList } = require('./utils');

const { cd, echo, exec } = shell;
const projectDir = path.resolve(__dirname, '..');

const envFromCli = getCliArgs().env;
const envs = getEnvsList(projectDir);
const envToSelect = envFromCli
  ? envs.find(e => e.name === envFromCli)
  : envs[envs.length - 1];

exec('yarn');
exec(`node ${projectDir}/node_modules/husky/bin/install`);

envs.forEach((env) => {
  cd(env.path);
  exec('yarn');
  echo(`${envToSelect.name} env installed`);
});

exec(`node ${projectDir}/scripts/select-env ${envToSelect.name}`);