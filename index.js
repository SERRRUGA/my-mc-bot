const mineflayer = require('mineflayer');

const settings = {
    host: 'surviving228.aternos.me', 
    port: 25565,               
    username: 'SERRRUGA_BOOOT',
    // Указываем версию 1.21.1 и протокол 768, который нужен для 1.21.10
    version: '1.21.1'
};

function startBot() {
    // Вручную задаем протокол перед созданием бота
    const bot = mineflayer.createBot({
        ...settings,
        fakeHost: settings.host,
        protocolVersion: 768 
    });

    bot.on('spawn', () => {
        console.log('УРА! Бот зашел на сервер 1.21.10');
    });

    bot.on('kicked', (reason) => {
        console.log('КИКНУЛИ:', reason);
    });

    bot.on('end', () => {
        console.log('Соединение потеряно. Реконнект...');
        setTimeout(startBot, 15000);
    });

    bot.on('error', (err) => {
        console.log('Ошибка:', err.message);
    });
}

startBot();
