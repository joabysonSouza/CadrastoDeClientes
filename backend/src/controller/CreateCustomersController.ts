import { CreateCustomersServices } from "../services/CreateCustomersServices";
import { FastifyRequest, FastifyReply } from "fastify";

class CreateCustomersController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const{name, email} = request.body as {name:string, email:string }
    console.log(name)
    console.log(email)    
    const customersService = new CreateCustomersServices();
    const customer = await customersService.execute({name, email});
    reply.send(customer)
  }
}

export{ CreateCustomersController}