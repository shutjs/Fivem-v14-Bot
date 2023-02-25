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
    name: "sil",
    aliases: ["sil"],
    usage: "sil [mesaj]",
    cooldown: 0,
    description: "Mesaj Siler",
  },

  async executePrefix(client, message, args) {
    if (!message.member.roles.cache.has(PermissionsBitField.Flags.Administrator)) return message.channel.send('Bu Komutu Kullanmak İçin İznin Yok')
    if (!args[0])
      return message.channel.send("Silinecek mesajın miktarını yaz!");
    message.delete();
    message.channel.bulkDelete(args[0]).then(() => {
      message.channel.send(`:white_check_mark: ${args[0]} tane mesaj silindi`);
    });
  },
};
