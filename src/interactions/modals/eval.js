/* Definitions */
const { EmbedBuilder } = require("discord.js");
const { performance } = require('perf_hooks');
const util = require("util");

/* Command */
module.exports =  {
	data: {
		name: "eval",
        modalId: "eval"
	},

	async execute(interaction) {
		const clean = text => {
            if (typeof text !== 'string') {
                text = util.inspect(text, { depth: 0 }).replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
            };

            return text;
        };

        const evalCode = interaction.fields.getTextInputValue("evalInput");
		var startTime = performance.now(), finishTime;
        let gotError = false;
        let evaled;
        let resultType;

        try {
            evaled = await eval(evalCode);
            resultType = typeof evaled;
            evaled = clean(evaled)
            finishTime = performance.now();
        } catch (err) {
            evaled = err.toString();
            resultType = err.name;
            gotError = true;
            finishTime = performance.now();
        };


        var evalEmbed;
        if (evaled.length < 1024) {
            evalEmbed = new EmbedBuilder()
                .setTitle(gotError ? "Komutta Hata Var." : "Komut Yürütüldü.")
                .setDescription(`**${gotError ? "Hata": "Tür"}**: ${resultType}\n**Uzunluk**: ${evaled.length}\n**Süre**: \`${(finishTime - startTime).toFixed(3)}\`ms`)
                .setColor(gotError ? 'Red' : 'Green')
                .addFields(
                    { name: 'Girilen', value: `\`\`\`js\n${evalCode}\`\`\``, inline: false },
                    { name: 'Çıkan', value: `\`\`\`js\n${evaled}\`\`\``, inline: false },
                )
                .setTimestamp()
        } else {
            evalEmbed = new EmbedBuilder()
                .setTitle(gotError ? "Komutta Hata Var." : "Komut Yürütüldü.")
                .setDescription(`**${gotError ? "Hata": "Tür"}**: ${resultType}\n**Uzunluk**: ${evaled.length}\n**Süre**: \`${(finishTime - startTime).toFixed(3)}\`ms\n\nÇıkan kod çok uzun olduğu için konsola yazdırıldı.`)
                .setColor(gotError ? 'Red' : 'Green')
                .setTimestamp()

            console.log(evaled);
        }

		interaction.reply({ embeds: [evalEmbed] });
    }
};