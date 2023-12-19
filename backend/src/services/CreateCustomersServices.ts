import { error } from "console"
import prismaClient from "../prisma"

interface CreateCustomersProps{
    name : string
    email : string
}

class CreateCustomersServices {
    async execute({name ,email}: CreateCustomersProps){
     if(!email || !name ){
        throw new Error("Prencha todos os campos ")
     }
    const customer = prismaClient.customer.create({
        data:{
            name,
            email,
            status: true

        }
    })
    return customer

    }
}
export {CreateCustomersServices}