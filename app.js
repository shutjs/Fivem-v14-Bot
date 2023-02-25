
/* Definitions */
const { Client, Collection } = require("discord.js");
const client = new Client({
    intents: 33283 
});

/* Configuration */
const settings = {
    token: "", 
    prefixCommands: ["."], 
    slashCommands: "global", 
    mongoDB: ""
}

/* Handlers */
import("./handler.js");
global.client = client;

/* Login */
client.login(settings.token)
    .then(() => console.log("[BOT] Bota giriş yapıldı!"))
    .catch(e => console.log("[BOT] Bota giriş yapılırken bir hata oluştu:\n" + e));

/* Export */
module.exports = settings;