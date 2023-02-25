const { EmbedBuilder, ContextMenuCommandBuilder, SlashCommandBuilder, ApplicationCommandType } = require("discord.js");
const moment = require('moment');

module.exports =  {
	data: {
        name: "info",
        aliases: ["avsd"],
        usage: "avatsdar [@user]",
		cooldown: 0,
        description: "Etiketlediğiniz kişinin avatasdrını gösterir.",
        slash: new SlashCommandBuilder()
			.addUserOption(option => option.setName("user").setDescription("Kişi").setRequired(false)),
        contextMenu: new ContextMenuCommandBuilder().setType(ApplicationCommandType.User)
	},

    async executeSlash(interaction) {
		const user = interaction.options.getMember("user")?.user || interaction.member.user;
        const joinedAgoCalculator = {
            fetch: {
                user(userInput, type) {
                    if (!userInput) throw new ReferenceError('Kullanıcıya hesaplama yapmasını sağlamadınız.');

                    if (type === "discord") {
                
                        const joinedDiscordTimestampInString = moment(user.createdAt).fromNow();

                        return joinedDiscordTimestampInString.toString(); 
                    } else if (type === "server") {
                    
                        const joinedServerTimestampInString = moment(userInput.joinedAt).fromNow();

                        return joinedServerTimestampInString.toString(); 
                    } else throw new ReferenceError('Geçersiz tür. Yalnızca "uyumsuzluk" veya "sunucu" kullanın.');
                }
            }
        };


        const bot = {
            true: "Evet",
            false: "Hayır"
        };

       
        const acknowledgements = {
            fetch: {
                user(userInput) {
                    let result;

                    try {
                        if (userInput.permissions.has(PermissionsBitField.ViewChannel)) result = "Sunucu Üyesi";
                        if (userInput.permissions.has(PermissionsBitField.KickMembers)) result = "Sunucu Moderatörü";
                        if (userInput.permissions.has(PermissionsBitField.ManageServer)) result = "Sunucu Yöneticisi";
                        if (userInput.permissions.has(PermissionsBitField.Administrator)) result = "Sunucu Yöneticisi";
                        if (userInput.id === interaction.guild.ownerId) result = "Sunucu Sahibi";

                    } catch (e) {
                        result = "Sunucu Üyesi";
                    };

                    return result;
                }
            }
        };


        return interaction.reply(
            {
                embeds: [
                    new EmbedBuilder()
                        .setTitle(`Bilgi:`)
                        .setThumbnail(user.displayAvatarURL(
                            {
                                dynamic: true
                            }
                        ))
                        .addFields(
                            {
                                name: "İsim",
                                value: `${user.tag}`,
                                inline: true
                            },
                            {
                                name: "İd",
                                value: `\`${user.id}\``,
                                inline: true
                            },
                          
                            {
                                name: "Sunucuya Katılma",
                                value: `${user.joinedAt}`,
                                inline: true
                            },
                            {
                                name: "Discorda Katılma",
                                value: `${new Date(user.createdTimestamp).toLocaleString()}\n(${joinedAgoCalculator.fetch.user(user, "discord")})`,
                                inline: true
                            },
                            {
                                name: "Bot mu?",
                                value: `${bot[user.bot]}`,
                                inline: true
                            },
                            {
                                name: "Kimlik",
                                value: `${acknowledgements.fetch.user(user)}`
                            }
                        )
                        .setColor('Blue')
                ],
                ephemeral: true
            }
        );

    },
};
