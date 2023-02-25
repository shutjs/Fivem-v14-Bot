/* Event */
module.exports = {
    name: "Interaction Handler",
    eventName: "interactionCreate",
    execute(interaction) {
      if (interaction.isModalSubmit()) {
        const modal = client.modals.get(interaction.customId);
        if (!modal) return;
        modal.execute(interaction);
      } else if (interaction.isButton()) { 
        const button = client.buttons.get(interaction.customId);
        if (!button) return;
        button.execute(interaction);
      } else if (interaction.isSelectMenu()) { 
        const selectMenu = client.selectMenus.get(interaction.customId);
        if (!selectMenu) return;
        selectMenu.execute(interaction);
      } else if (interaction.isCommand() || interaction.isContextMenu()) {
        const command = client.commands.get(interaction.commandName);
        if (!command) return;

        const finish = new Date();
        finish.setSeconds(finish.getSeconds() + command.data.cooldown);

        if (client.cooldowns.has(`${interaction.commandName}_${interaction.user.id}`)) {
            const finish = client.cooldowns.get(`${interaction.commandName}_${interaction.user.id}`)
            const date = new Date();
            const kalan = (new Date(finish - date).getTime() / 1000).toFixed(2);
            return interaction.error(`Bu komudu tekrardan kullanabilmek için **${kalan} saniye** beklemeniz gerekmektedir.`);
          };

        command.executeSlash(interaction);
        if (command.data.cooldown > 0) {
            client.cooldowns.set(`${interaction.commandName}_${interaction.user.id}`, finish);
            setTimeout(() => {
              client.cooldowns.delete(`${interaction.commandName}_${interaction.user.id}`);
            }, command.data.cooldown * 1000);
          };
      }


      if (interaction.isButton()) {
        if (interaction.customId === 'başvuru') {
            const modal = new ModalBuilder()
            .setTitle('Yetkili Başvuru')
            .setCustomId('yetkili')
    
            const nameComponent = new TextInputBuilder()
            .setCustomId('isim')
            .setLabel("İsim")
            .setMinLength(2)
            .setMaxLength(25)
            .setRequired(true)
            .setPlaceholder('Shut')
            .setStyle(TextInputStyle.Short)
    
            const ageComponent = new TextInputBuilder()
            .setCustomId('yaş')
            .setLabel("Yaş")
            .setMinLength(1)
            .setMaxLength(3)
            .setStyle(TextInputStyle.Short)
            .setPlaceholder('19')
            .setRequired(true)
    
            const whyYou = new TextInputBuilder()
            .setCustomId('neden')
            .setLabel("Neden burada yetkili olmalısınız?")
            .setMinLength(10)
            .setMaxLength(120)
            .setStyle(TextInputStyle.Paragraph)
            .setPlaceholder(`Yetkili olmak istemenizin nedenini bize bildirin. ${interaction.guild.name}`)
            .setRequired(true)
    
            
            const rows = [nameComponent, ageComponent, whyYou].map(
                (component) => new ActionRowBuilder().addComponents(component)
            )
    
            modal.addComponents(...rows);
            interaction.showModal(modal);

        }
      }
    }
}