/* Definitions */
const { SlashCommandBuilder, ModalBuilder,  TextInputBuilder, TextInputStyle, ActionRowBuilder, EmbedBuilder } = require("discord.js");
const { performance } = require('perf_hooks');
const util = require("util");

/* Command */
module.exports =  {
	data: {
		name: "eval",
        aliases: ["e"],
        usage: "eval [kod]",
		cooldown: 0,
        description: "Girilen kodu çalıştırır",
		slash: new SlashCommandBuilder()
	},

    async executePrefix(client, message, args) {
        if (message.author.id != "669513018777796638") return message.error("Bu komutu kullanmak için **yetkin** yok!");
        const clean = text => {
            if (typeof text !== 'string') {
                text = util.inspect(text, { depth: 0 }).replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
            };

            return text;
        };

        const evalCode = args.join(" ");
        if (!evalCode) return message.error("**Lütfen çalıştırmak istediğiniz kodu girin.**");

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

		message.reply({ embeds: [evalEmbed] });
    },

	async executeSlash(interaction) {
        if (interaction.member.id != "669513018777796638") return interaction.error("Bu komutu kullanmak için **yetkin** yok!");
        
        const evalModal = new ModalBuilder()
            .setCustomId("eval")
            .setTitle("Kod Çalıştırma Makinesi");
        
        const evalInput = new TextInputBuilder()
            .setCustomId("evalInput")
            .setLabel("Çalıştırılacak Kod")
            .setStyle(TextInputStyle.Paragraph)
            .setPlaceholder(`function sum(a, b) {\n    return a + b;\n}\n\nconst toplam = sum(1, 2);`)
            .setRequired(true);

        const evalRow = new ActionRowBuilder().addComponents(evalInput);
        evalModal.addComponents(evalRow);

        interaction.showModal(evalModal);
    }
};
