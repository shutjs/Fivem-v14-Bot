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
  module.exports = {
    data: {
      name: "ip",
      aliases: ["ip"],
      usage: "ip [ip]",
      cooldown: 0,
      description: "Sunucu ip Berirletir",
    },
  
    async executePrefix(client, message, args) {
      const user = message.mentions.users.first() || message.author;
      let ts3 = new ButtonBuilder()
      .setCustomId('ts3')
      .setLabel(`Ts3 İp`)
      .setEmoji("1066684645225267252")
      .setStyle(ButtonStyle.Success)
      let ip = new ButtonBuilder()
      .setLabel("Sunucu İpsi")
      .setCustomId("ip")
      .setEmoji("1066685614860271677")
      .setStyle(ButtonStyle.Primary);
      let discord = new ButtonBuilder()
      .setLabel("Arkadaşlarını Davet Et")
      .setCustomId("dc")
      .setEmoji("1064927607654711306")
      .setStyle(ButtonStyle.Primary);
      const mesajbuton = new ActionRowBuilder().addComponents(
        ts3,
        ip,
        discord
        );
    let msg = new EmbedBuilder()
      .setTitle(`${user.tag} Kişisi`)
      .setThumbnail(message.guild.iconURL({ format: 'png', dynamic: true, size: 1024 }))
      .setDescription(`\`\`\`fix\nSelam! Sunucu İp'sini görmek için aşşağıdaki butonları kullanabilirsin.\`\`\``)
      .setColor("2F3136")
      .setFooter({ text: `shut#1111 ❤️ ${config.sunucuisim}` });
      
      message.channel.send({ embeds: [msg], components: [mesajbuton]});





        const filter = i => i.user.id == message.member.id 
        const collector = message.channel.createMessageComponentCollector({ filter });
        collector.on('collect', async i => {
            if (i.customId === 'ip') {
            message.reply(`Ts3 İpmiz: ${config.Tsİp}`);
            i.deferUpdate()
            }
        })
        collector.on('collect', async i => {
            if (i.customId === 'dc') {
            message.reply(`Dc Adresimiz: ${config.discorddavet}`);
            i.deferUpdate()
            }
        })
        collector.on('collect', async i => {
            if (i.customId === 'ip') {
            message.reply(`İp Adresimiz: ${config.sunucuip}`);
            i.deferUpdate()
            }
        })
    }
}