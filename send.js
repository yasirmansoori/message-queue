const amqp = require('amqplib');

async function send() {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    const queueName = 'my_queue';

    await channel.assertQueue(queueName, { durable: false });

    const message = 'Hello from Yasir!';
    channel.sendToQueue(queueName, Buffer.from(message));

    console.log(`Sent: ${message}`);

    await channel.close();
    await connection.close();
}

send();
