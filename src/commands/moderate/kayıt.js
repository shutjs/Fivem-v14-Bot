const Discord = require("discord.js");
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
const config = require("../../config/config");
module.exports = {
  data: {
    name: "kayıt",
    aliases: ["kayit"],
    usage: "kayıt",
    cooldown: 12000,
    description: "Kayıt Yapar",
  },

  async executePrefix(client, message, args) {
    if (message.member.roles.cache.has(`${config.kayıtsız}`)) return message.channel.send('Bu Komutu Kullanmak İçin İznin Yok')


    const user = message.mentions.users.first() || message.author;
    let yetkili = new ButtonBuilder()
    .setCustomId('yetkili')
    .setLabel(`Yetkili Çağırmak İçin Tıkla`)
    .setEmoji("1064927607654711306")
    .setStyle(ButtonStyle.Danger);
    const buttons = new ActionRowBuilder().addComponents(
        yetkili
        );
    let msg = new EmbedBuilder()
      .setTitle(`${user.tag} Kişisi`)
      .setThumbnail(message.author.avatarURL({ format: 'png', dynamic: true, size: 1024 }))
      .setDescription(`\`\`\`fix\nSelam! Aşşağıda ki Butona Tıklayarak Yetkili Çağırabilirsin\`\`\``)
      .setColor("2F3136")
      .setFooter({ text: `shut#1111 ❤️ ${config.sunucuisim}` });
      
    message.channel.send({ embeds: [msg], components: [buttons]});


    const filter = i => i.user.id == message.member.id 
    const collector = message.channel.createMessageComponentCollector({ filter, time: 18000});
    collector.on('collect', async i => {
        if (i.customId === 'yetkili') {
            message.channel.send(`**Hey <@&${config.yetkilirol}>, ${user.tag} Seni Çağırıyor!**`);
            i.deferUpdate()
            collector.stop();
            }
    })

  },
};
