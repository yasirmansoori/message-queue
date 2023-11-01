const amqp = require('amqplib');

async function recieve() {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();
  const queueName = 'my_queue';

  await channel.assertQueue(queueName, { durable: false });

  console.log(`Waiting for messages.`);

  channel.consume(queueName, (msg) => {
    if (msg) {
      const message = msg.content.toString();
      console.log(`Received: ${message}`);
      channel.ack(msg);
    }
  });
}

recieve();
