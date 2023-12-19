import { FastifyRequest, FastifyInstance, FastifyPluginOptions, FastifyReply } from "fastify";
import { CreateCustomersController } from "./controller/CreateCustomersController";
import { ListCustomersController } from "./controller/ListCustomersController";
import { DeleteCustomersController } from "./controller/DeleteCustomersController";



export async function routes(fastify:FastifyInstance, options:FastifyPluginOptions) {
  fastify.get("/teste", async(request:FastifyRequest, replay:FastifyReply)=>{
    return {ok: true}
  })
  fastify.post("/customer", async(request: FastifyRequest, replay:FastifyReply )=>{
    return new CreateCustomersController().handle(request, replay)

  })
  fastify.get("/customers", async(request: FastifyRequest, replay:FastifyReply )=>{
    return new ListCustomersController().handle(request, replay)

  })
  fastify.delete("/customers", async(request: FastifyRequest, replay:FastifyReply )=>{
    return new DeleteCustomersController().handle(request, replay)

  })
}

