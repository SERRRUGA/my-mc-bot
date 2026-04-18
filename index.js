const mineflayer = require('mineflayer');

const settings = {
    host: 'surviving228.aternos.me', 
    port: 25565,               
    username: 'SERRRUGA_BOOOT',     
    version: '1.21.4' 
};

function startBot() {
    const bot = mineflayer.createBot(settings);

    bot.on('spawn', () => {
        console.log('УСПЕХ: Бот заспавнился!');
    });

    // Это покажет в консоли GitHub, ПОЧЕМУ сервер выкинул бота
    bot.on('kicked', (reason) => {
        console.log('МЕНЯ КИКНУЛИ! Причина:');
        console.log(reason); // Тут будет текст из майна (например, "Wait 5 sec")
    });

    bot.on('end', (reason) => {
        console.log(`Соединение закрыто. Причина: ${reason}`);
        setTimeout(startBot, 10000); // Пробуем каждые 10 секунд
    });

    bot.on('error', (err) => {
        console.log('Критическая ошибка:', err.message);
    });
}

startBot();
