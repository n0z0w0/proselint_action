const core = require('@actions/core');
const github = require('@actions/github');
const exec = require('@actions/exec');
const writeGood = require('write-good');

let output = '';
const options = {};
options.listeners = {
	stdout: (data) => {
		output += data.toString();
	},
	stderr: (data) => {
		console.error(data);
	}
};

const result = await exec.exec('ls', null, options);
console.log(`${result}`);

