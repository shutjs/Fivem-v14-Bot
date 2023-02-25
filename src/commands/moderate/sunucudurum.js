const {
    SlashCommandBuilder,
    ModalBuilder,
    ButtonBuilder,
    TextInputBuilder,
    TextInputStyle,
    ActionRowBuilder,
    EmbedBuilder,
    PermissionFlagsBits,
    PermissionsBitField,
    ButtonStyle,
    Component,
    
  } = require("discord.js");
  const config = require("../../config/config")
const fivereborn = require("fivereborn-query");
const { read } = require("fs");
  module.exports = {
    data: {
      name: "sunucudurum",
      aliases: ["sunucudurumu"],
      usage: "sunucudurumu",
      cooldown: 0,
      description: "Sunucu Durumunu Berirletir",
    },
  
    async executePrefix(client, message, args) {
        const row = new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
            .setLabel(`Sunucuya Bağlan!`)
            .setEmoji("1066685614860271677")
            .setStyle(ButtonStyle.Link)
            .setURL("https://cfx.re/join/5bj5k6")
        )
        fivereborn.query(`${config.sunucuip}`, config.serverport, (err, data) => {
            if (err) {
              message.reply({ ephemeral: true, content: "Sunucu şuan çevrimdışı lütfen daha sonra tekrar dene!" })
            } else {
              let embed = new EmbedBuilder()
                .setTitle(`${config.sunucuisim}`)
                .setColor("2F3136")
                .setThumbnail(message.guild.iconURL({ format: 'png', dynamic: true, size: 1024 }))
                .addFields({ name: "Sunucu Durumu", value: `\`\`\`fix\nAktif!\`\`\`` }, { name: "Oyuncu Sayısı", value: `\`\`\`${data.clients} / ${data.maxclients}\`\`\`` }, { name: "IP Adresi", value: `\`\`\`${config.sunucuip}\`\`\`` })
                .setImage(`${config.imagelink}`)
                .setFooter({ text: `shut#1111 ❤️ ${config.sunucuisim}` })
                message.channel.send({ embeds: [embed], components: [row] })
            }
          });
    }
}