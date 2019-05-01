const Discord = require('discord.js');
const fs = require('fs-extra');

const runCommand = async (client, message) => {

    const commandPrefix = '!';
    
    const isCommand = message.content.startsWith(commandPrefix) ? true : false;

	if(!isCommand) return;
	
    const msg = message.content;

    const args = msg.slice(commandPrefix).trim().split(/ +g/);

	const command = msg.substring(1, msg.length);

    const cmd = client.commands.get(command);

	if (!cmd) return;

	message.delete().catch(() => {});

	const logmsg = `[#LOG]: ${new Date().toLocaleTimeString()} - ${message.author.username} (${message.author.id}) executou o comando: ${cmd.command.name}`;
	const date = new Date().toLocaleDateString();
	const name = date + '-log';
	fs.appendFile(`src/logs/${name}.txt`, `${logmsg} \n`, (err) => {
		if (err) throw err;
		console.log(logmsg);
	});
	try {
		if (cmd.validate) {
			await cmd.validate(client, message, args);
		}
		await cmd.run(client, message, args);
		if (cmd.success) {
			await cmd.success(client, message, args);
		}
	} catch (err) {
		console.error(err);
	
	} finally {
		if (cmd.after) {
			await cmd.after(client, message, args);
		}
	}
};

module.exports = async (client, message) => {
	if (message.author.bot) return;

    const msg = ['Q', 'q', 'que', 'que?', 'q?', 'QUE'];

    msg.map(q => {
        if(message.content.toLowerCase() === q) {
            message.channel.send('pau no seu cu :microphone: ');
        }
    });
	
	const test = message.content.substr(message.content.length-2, message.content.length-1);
    if(test === 'ão' && message.author.username !== client.user.username) {
        return message.channel.send('Meu pau na sua mão');
    }

	await Promise.all([runCommand(client, message)]);
	// await Promise.bind(runCommand(client, message));
};