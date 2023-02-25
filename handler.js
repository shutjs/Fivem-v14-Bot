/* Definitions */
const { Collection } = require("discord.js");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const fs = require("fs");

const settings = require("./app.js");

/* Mongose Handler */
if (settings.mongoDB && settings.mongoDB.startsWith("mongodb+srv://")) {
    require("mongoose").connect(settings.mongoDB, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        autoIndex: false
    })
        .then(() => console.log("[MongoDB] MongoDB'ye bağlandım."))
        .catch((err) => console.error("[MongoDB] MongoDB'ye bağlanamadım!\n" + err));    
}

/* Event Loader */
try {
    fs.readdirSync("./src/events").filter(file => file.endsWith(".js")).forEach(async file => {
        const event = await require(`./src/events/${file}`);
        
        if (!event) return;
        client.on(event.eventName, event.execute);
        console.log(`[EVENT] ${event.name} adlı event başarıyla yüklendi!`);
    });
} catch(e) {
    console.log(`[EVENT] Eventler yüklenirken bir hata ortaya çıktı:\n` + e); 
};


/* Command Loader */
try {
    client.commands = new Collection();
    client.aliases = new Collection();
    client.cooldowns = new Collection();
    client.usages = new Collection();

    if (settings.prefixCommands) {
        fs.readdirSync("./src/commands").forEach(async dir => {
            fs.readdirSync(`./src/commands/${dir}`).filter(file => file.endsWith(".js")).forEach(async file => {
                const command = await require(`./src/commands/${dir}/${file}`)
                await client.commands.set(command.data.name, command);
                await client.usages.set(command.data.name, command.data.usage);
				await command.data.aliases.forEach(async alias => {
					await client.aliases.set(alias, command.data.name);
				});

                await console.log(`[CMDS] ${command.data.name} adlı komut yüklendi.`);
            });
        });
    }

    if (settings.slashCommands) {
        const rest = new REST({ version: '10' }).setToken(settings.token);
        const slashCommands = [];
    
        fs.readdirSync("./src/commands").forEach(async dir => {
            fs.readdirSync(`./src/commands/${dir}`).filter(file => file.endsWith(".js")).forEach(async file => {
                const command = await require(`./src/commands/${dir}/${file}`)
                await client.commands.set(command.data.name, command);
                await command.data.slash.setName(command.data.name).setDescription(command.data.description)
                await slashCommands.push(command.data.slash.toJSON());
                if (command.data.contextMenu) {
                    await command.data.contextMenu.setName(command.data.name);
                    await slashCommands.push(command.data.contextMenu.toJSON());
                }
                await console.log(`[/CMDS] ${command.data.name} adlı komut yüklendi.`);
            });
        });
    
        setTimeout(() => {
            if (settings.slashCommands === "global") {
                rest.put(Routes.applicationCommands(client.user.id, settings.slashCommands),  { body: slashCommands }).then(() => console.log("[/CMDS] Slash komutları global bir şekilde başarıyla yüklendi."))
            } else {
                rest.put(Routes.applicationGuildCommands(client.user.id, settings.slashCommands),  { body: slashCommands }).then(() => console.log("[/CMDS] Slash komutları sadece bir sunucuya başarıyla yüklendi."))
            }
        }, 5000);
    }

} catch(e) {
    console.log(`[CMDS] Komutlar yüklenirken bir hata ortaya çıktı:\n` + e); 
};

/* Modal Handler Loader */
try {
    client.modals = new Collection();
    fs.readdirSync("./src/interactions/modals").forEach(async file => {
        const modal = await require(`./src/interactions/modals/${file}`)
        await client.modals.set(modal.data.modalId, modal);
    });
} catch(e) {
    console.log(`[MODAL] Modüller yüklenirken bir hata ortaya çıktı:\n` + e); 
};

/* Button Handler Loader */
try {
    client.buttons = new Collection();
    fs.readdirSync("./src/interactions/buttons").forEach(async file => {
        const button = await require(`./src/interactions/buttons/${file}`)
        await client.buttons.set(button.data.buttonId, button);
    });
} catch(e) {
    console.log(`[BUTON] Butonlar yüklenirken bir hata ortaya çıktı:\n` + e); 
};

/* Select Menu Handler Loader */
try {
    client.selectMenus = new Collection();
    fs.readdirSync("./src/interactions/selectMenus").forEach(async file => {
        const selectMenu = await require(`./src/interactions/selectMenus/${file}`)
        await client.selectMenus.set(selectMenu.data.selectMenuId, selectMenu);
    });
} catch(e) {
    console.log(`[SELECTMENU] Seçmeli menüler yüklenirken bir hata ortaya çıktı:\n` + e); 
};

/* Utility Handler */
try {
    require("./src/utility.js");
    console.log("[UTIL] Araçlar başarıyla yüklendi.");
} catch(e) {
    console.log(`[UTIL] Araçlar yüklenirken bir hata ortaya çıktı:\n` + e); 
}

/* Error Handler */
process.on('uncaughtException', err => console.log(err));