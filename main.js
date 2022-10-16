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
		/* const workplace = process.env.GITHUB_WORKSPACE; */
		await execute('pwd');
		await execute("find -name '*.md'");
	} catch (error) {
		core.setFailed(error.message);
	}
};
main();

