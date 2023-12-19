import { FastifyReply, FastifyRequest } from "fastify";
import {DeleteCustomersService} from "../services/DeleteCustomersService"

class DeleteCustomersController{
    async handle(request:FastifyRequest , replay:FastifyReply){
        const {id}= request.query as {id:string}
        const CustomersService = new DeleteCustomersService()

        const custumer = await CustomersService.excute({id})

        replay.send(custumer)

    }
}

export {DeleteCustomersController}