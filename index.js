const mineflayer = require('mineflayer');

// --- НАСТРОЙКИ ---
const settings = {
    host: 'surviving228.aternos.me',    // Сюда впиши IP (например: play.server.ru)
    port: 25565,               // Порт (обычно 25565)
    username: 'SERRRUGA_BOOOT',     // Ник для бота
    version: false             // Авто-определение версии
};

function startBot() {
    const bot = mineflayer.createBot(settings);

    bot.on('spawn', () => {
        console.log('Бот успешно заспавнился!');
        // Если на сервере нужно логиниться, убери // снизу и впиши пароль:
        // bot.chat('/login твой_пароль');
    });

    // Чтобы бота не кикнуло за АФК, он будет иногда приседать
    setInterval(() => {
        if (bot.entity) {
            bot.setControlState('sneak', true);
            setTimeout(() => bot.setControlState('sneak', false), 500);
        }
    }, 60000); // Раз в минуту

    bot.on('chat', (username, message) => {
        if (username === bot.username) return;
        if (message === 'привет') bot.chat(`Привет, ${username}! Я запущен через GitHub.`);
    });

    // Авто-переподключение
    bot.on('end', () => {
        console.log('Бот отключился. Пробую зайти снова через 30 секунд...');
        setTimeout(startBot, 30000);
    });

    bot.on('error', (err) => console.log('Ошибка:', err));
}

startBot();
