const Kafka = require('node-rdkafka');

const consumer = new Kafka.KafkaConsumer({
  'group.id': 'my-group',
  'metadata.broker.list': 'localhost:9092', // Replace with your Kafka broker(s) list
});

consumer.connect();

consumer.on('ready', function () {
  consumer.subscribe(['test-topic']);

  consumer.consume();
});

consumer.on('data', function (message) {
  console.log('Received message:', message.value.toString());
});

consumer.on('event.error', function (err) {
  console.error('Error from consumer:', err);
});

process.on('SIGINT', function () {
  console.log('Disconnecting consumer...');
  consumer.disconnect();
});
