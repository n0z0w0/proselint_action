const core = require('@actions/core')
const github = require('@actions/github')
const exec = require('@actions/exec')
const writeGood = require('write-good')

const execute = async (command: string): Promise<string> => {
	let output = ''
	const options: ExecOptions = {}
	options.listeners = {
		stdout: (data: Buffer) => {
			output += data.toString()
		},
		stderr: (data: Buffer) => {
			console.error(data)
		}
	}
	await exec.exec(command, null, options)
	return output
}

const main = aynsc () => {
	try{
		const result = await execute('ls')
		console.log(`${result}`)
	}catch (error){
		core.setFailed(error.message)
	}
}
main()
