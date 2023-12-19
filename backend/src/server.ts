import fastify from "fastify";
import cors from "@fastify/cors"
import {routes} from "./routes";
import { error } from 'console';

const App = fastify({logger: true})

App.setErrorHandler((error, request, replay)=>{
    replay.code(400).send({message: error.message})

})


const Start =async()=>{
    await App.register(cors)
    await App.register(routes)
   try{
    await App.listen({port: 3333})
   }catch(err){
    process.exit(1)

   }
}
Start()