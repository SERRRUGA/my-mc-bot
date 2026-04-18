const mineflayer = require('mineflayer');

// --- ТВОИ НАСТРОЙКИ ---
const settings = {
    host: 'surviving228.aternos.me', 
    port: 25565,               
    username: 'SERRRUGA_BOOOT',     
    version: '1.21.4' // Указал версию вручную, чтобы не было ошибки 1.21.10
};

function startBot() {
    const bot = mineflayer.createBot(settings);

    bot.on('spawn', () => {
        console.log('Бот успешно заспавнился на Aternos!');
    });

    // Анти-АФК: приседает раз в минуту
    setInterval(() => {
        if (bot.entity) {
            bot.setControlState('sneak', true);
            setTimeout(() => bot.setControlState('sneak', false), 500);
        }
    }, 60000);

    bot.on('chat', (username, message) => {
        if (username === bot.username) return;
        if (message === 'привет') bot.chat(`Привет, ${username}! Я тут.`);
    });

    bot.on('end', (reason) => {
        console.log(`Бот отключился (${reason}). Реконнект через 30 секунд...`);
        setTimeout(startBot, 30000);
    });

    bot.on('error', (err) => {
        console.log('Произошла ошибка:', err.message);
    });
}

startBot();
