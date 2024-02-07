import fastify from 'fastify';
import Papr, { schema, types } from 'papr';
import fastifyMongodb from '@fastify/mongodb';
import { fastifyPlugin } from 'fastify-plugin';
const server = fastify();
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
});
server.get('/', async (request, reply) => {
    return request.user.find({});
});
server.register(fastifyMongodb, {
    url: 'mongodb://localhost:27017',
});
server.register(paprPlugin);
server.listen({ port: 3000 }, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server listening at ${address}`);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9pbmFpYXQubW9yYWVzL2Rldi9pbmFpYXQvcGFwci1zYW1wbGUvIiwic291cmNlcyI6WyJzcmMvYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sT0FBTyxNQUFNLFNBQVMsQ0FBQztBQUM5QixPQUFPLElBQUksRUFBRSxFQUFTLE1BQU0sRUFBRSxLQUFLLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDbEQsT0FBTyxjQUFjLE1BQU0sa0JBQWtCLENBQUM7QUFDOUMsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBUS9DLE1BQU0sTUFBTSxHQUFHLE9BQU8sRUFBRSxDQUFBO0FBRXhCLE1BQU0sVUFBVSxHQUFHLE1BQU0sQ0FBQztJQUN6QixHQUFHLEVBQUUsS0FBSyxDQUFDLE1BQU0sRUFBRTtJQUNuQixTQUFTLEVBQUUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQztJQUMzQyxRQUFRLEVBQUUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQztDQUMxQyxDQUFDLENBQUM7QUFFSCxNQUFNLFVBQVUsR0FBRyxhQUFhLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxFQUFFO0lBQ2xELE1BQU0sSUFBSSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7SUFDeEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUNqRCxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxVQUFVLENBQUMsQ0FBQztJQUM1QyxNQUFNLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUMzQixNQUFNLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDdEUsT0FBTyxDQUFDLGVBQWUsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDdkMsQ0FBQyxDQUFDLENBQUE7QUFFRixNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxFQUFFO0lBQ3hDLE9BQU8sT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDOUIsQ0FBQyxDQUFDLENBQUE7QUFFRixNQUFNLENBQUMsUUFBUSxDQUFDLGNBQWMsRUFBRTtJQUMvQixHQUFHLEVBQUUsMkJBQTJCO0NBQ2hDLENBQUMsQ0FBQztBQUVILE1BQU0sQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7QUFFNUIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsRUFBRTtJQUM5QyxJQUFJLEdBQUcsRUFBRSxDQUFDO1FBQ1QsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUNsQixPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFBO0lBQ2hCLENBQUM7SUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLHVCQUF1QixPQUFPLEVBQUUsQ0FBQyxDQUFBO0FBQzlDLENBQUMsQ0FBQyxDQUFBIn0=