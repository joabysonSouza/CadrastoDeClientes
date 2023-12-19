import { FastifyReply, FastifyRequest } from "fastify";
import { ListCustomersServices } from "../services/ListCustomersServices";



class ListCustomersController{
    async handle(request:FastifyRequest, replay: FastifyReply){
        const listCustomersServices = new ListCustomersServices()
        const customers =  await listCustomersServices.execute()
        replay.send(customers)

    }
}

    export {ListCustomersController}