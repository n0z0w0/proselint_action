const core = require('@actions/core');
const github = require('@actions/github');
const exec = require('@actions/exec');
const writeGood = require('write-good');

const execute = async (command) => {
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
	await exec.exec(command, null, options);
	return output;
};

const main = async () => {
	try {
		const workplace = process.env.GITHUB_WORKSPACE;
		const result = await execute('pwd');
		console.log('result is as follows\n');
		console.log(`${result}`);
		const result2 = await execute('/bin/bash cd ' + workplace);
		console.log(`${result2}`);
		const result3 = await execute('ls');
		console.log(`${result3}`);
	} catch (error) {
		core.setFailed(error.message);
	}
};
main();

