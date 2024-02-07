import fastify from 'fastify';
import Papr, { Model, schema, types } from 'papr';
import fastifyMongodb from '@fastify/mongodb';
import { fastifyPlugin } from 'fastify-plugin';

declare module 'fastify' {
	interface FastifyRequest {
		user: Model<typeof userSchema[0], typeof userSchema[1]>;
	}
}

const server = fastify()

const userSchema = schema({
	age: types.number(),
	firstName: types.string({ required: true }),
	lastName: types.string({ required: true }),
});

const paprPlugin = fastifyPlugin(async (fastify) => {
	const papr = new Papr();
	papr.initialize(fastify.mongo.client.db('test'));
	const user = papr.model('user', userSchema);
	await papr.updateSchemas();
	await user.insertOne({ firstName: 'John', lastName: 'Doe', age: 30 });
	fastify.decorateRequest('user', user);
})

server.get('/', async (request, reply) => {
	return request.user.find({});
})

server.register(fastifyMongodb, {
	url: 'mongodb://localhost:27017',
});

server.register(paprPlugin);

server.listen({ port: 3000 }, (err, address) => {
	if (err) {
		console.error(err)
		process.exit(1)
	}
	console.log(`Server listening at ${address}`)
})
