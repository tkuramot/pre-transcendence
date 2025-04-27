import Fastify from 'fastify';

const fastify = Fastify({
  logger: true,
});

// Declare a route
fastify.get('/', (req, reply) => {
  reply.send({ hello: 'world' });
});

// Run the server!
fastify.listen({ port: 3000 }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
