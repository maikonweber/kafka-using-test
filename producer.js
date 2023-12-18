const Kafka = require('node-rdkafka');

const producer = new Kafka.Producer({
  'metadata.broker.list': 'localhost:9092', // Replace with your Kafka broker(s) list
});

producer.on('delivery-report', function (err, report) {
  console.log('Delivery Report:', report);
});

producer.connect();

producer.on('ready', function () {
  const message = 'Hello, Kafka!';

  producer.produce('test-topic', null, Buffer.from(message), null, Date.now());

  // Wait for any outstanding messages to be delivered and delivery reports to be received.
  producer.flush(2000, function () {
    producer.disconnect();
  });
});

producer.on('event.error', function (err) {
  console.error('Error from producer:', err);
});
