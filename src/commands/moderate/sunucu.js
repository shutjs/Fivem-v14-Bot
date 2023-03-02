⅞const {
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
    name: "sunucu",
    aliases: ["sunucu"],
    usage: "sunucu [durum]",
    cooldown: 0,
    description: "Sunucu Durumunu Berirletir",
  },

  async executePrefix(client, message, args) {
    const user = message.mentions.users.first() || message.author;
    if (message.member.roles.cache.has(PermissionsBitField.Flags.Administrator)) return message.channel.send('Bu Komutu Kullanmak İçin İznin Yok')
      let aktif = new ButtonBuilder()
      .setCustomId('aktif')
      .setLabel(`Aktif Et`)
      .setEmoji("1064927606224457821")
      .setStyle(ButtonStyle.Success)
      let restart = new ButtonBuilder()
      .setLabel("Restart At")
      .setEmoji("1066685132234293258")
      .setCustomId("restart")
      .setStyle(ButtonStyle.Primary);
      let kapat = new ButtonBuilder()
      .setLabel("Sunucu Kapat")
      .setEmoji("1066685346731008020")
      .setCustomId("kapat")
      .setStyle(ButtonStyle.Primary);
      let bakım = new ButtonBuilder()
      .setLabel("Sunucu Bakım")
      .setEmoji("1066685614860271677")
      .setCustomId("bakım")
      .setStyle(ButtonStyle.Primary);
    const buttons = new ActionRowBuilder().addComponents(
    aktif,
    restart,
    bakım,
    kapat
    );

   

    const channel = message.guild.channels.cache.get(config.sunucudurum);
    let msg = new EmbedBuilder()
      .setTitle(`${user.tag} Kişisi`)
      .setThumbnail(message.author.avatarURL({ format: 'png', dynamic: true, size: 1024 }))
      .setDescription(`\`\`\`fix\nSelam! Bu panel sunucunun durumunu mesaj attırmana işe yarar. \nNot: Config dosyasında berirlenen yere mesaj atar.\`\`\``)
      .setColor("2F3136")
      .setFooter({ text: `shut#1111 ❤️ ${config.sunucuisim}` });
      
    message.channel.send({ embeds: [msg], components: [buttons]});

    const filter = i => i.user.id == message.member.id 
    const collector = message.channel.createMessageComponentCollector({ filter });

    collector.on('collect', async i => {
        if (i.customId === 'aktif') {
            
            let msg2 = new EmbedBuilder()
            .setColor("2F3136")
            .setTitle(`Selam! ${config.sunucuisim} Değerli Üyeleri`)
            .setDescription(`**Sunucu aktif. Giriş sağlayabilirsiniz. İyi roller dileriz.**`)
            .setThumbnail(message.guild.iconURL({ format: 'png', dynamic: true, size: 1024 }))
            .setFooter({text: `shut#1111 ❤️ ${config.sunucuisim}`})
            .setImage(`${config.imagelink}`)
            if (!channel) return;
            
            channel.send(`@everyone`)
            channel.send({embeds: [msg2]})
              i.deferUpdate()
            } })
            collector.on('collect', async i => {
                if (i.customId === 'bakım') {
                    
                    let msg2 = new EmbedBuilder()
                    .setColor("2F3136")
                    .setTitle(`Selam! ${config.sunucuisim} Değerli Üyeleri`)
                    .setDescription(`**Sunucu Bakıma Alınıyor. Çıkış sağlayabilirsiniz. İyi Günler dileriz.**`)
                    .setThumbnail(message.guild.iconURL({ format: 'png', dynamic: true, size: 1024 }))
                    .setFooter({text: `shut#1111 ❤️ ${config.sunucuisim}`})
                    .setImage(`${config.imagelink}`)
                    if (!channel) return;
                    
                    channel.send(`@everyone`)
                    channel.send({embeds: [msg2]})
                      i.deferUpdate()
                    } })
            collector.on('collect', async i => {
            if (i.customId === 'restart') {
            
                let msg2 = new EmbedBuilder()
                .setColor("2F3136")
                .setTitle(`Selam! ${config.sunucuisim} Değerli Üyeleri`)
                .setDescription(`**Sunucuya Restart Atılıyor. Restart atıldıktan sonra girebilirsiniz. İyi roller dileriz.**`)
                .setThumbnail(message.guild.iconURL({ format: 'png', dynamic: true, size: 1024 }))
                .setFooter({text: `shut#1111 ❤️ ${config.sunucuisim}`})
                .setImage(`${config.imagelink}`)
                if (!channel) return;
                
                channel.send(`@everyone`)
                channel.send({embeds: [msg2]})
                  i.deferUpdate()
                }
            })
            collector.on('collect', async i => {
                if (i.customId === 'kapat') {
            
                    let msg2 = new EmbedBuilder()
                    .setColor("2F3136")
                    .setTitle(`Selam! ${config.sunucuisim} Değerli Üyeleri`)
                    .setDescription(`**Sunucu Kapatılıyor. lütfen Sunucudan Çıkınız. İyi Günler dileriz.**`)
                    .setThumbnail(message.guild.iconURL({ format: 'png', dynamic: true, size: 1024 }))
                    .setFooter({text: `shut#1111 ❤️ ${config.sunucuisim}`})
                    .setImage(`${config.imagelink}`)
                    if (!channel) return;
                    
                    channel.send(`@everyone`)
                    channel.send({embeds: [msg2]})
                      i.deferUpdate()

                      
                    }
        })
        

   

  }
};
