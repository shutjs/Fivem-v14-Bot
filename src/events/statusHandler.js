/* Event */
module.exports = {
    name: "Durum Ayarlama",
    eventName: "ready",
    execute() {
        const activities = ["Shut ❤️"]
        setInterval(() => client.user.setPresence({ 
                activities: [{ name: activities[Math.floor(Math.random() * activities.length)], type: require('discord.js').ActivityType.playing }],
                status: 'idle' 
            }
        ), 5000);
    }
}