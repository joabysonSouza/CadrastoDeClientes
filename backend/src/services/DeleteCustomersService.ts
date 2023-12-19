import prismaClient from "../prisma";

class DeleteCustomersService {
  async excute({ id }: { id: string }) {
    if (!id) {
      throw new Error("Soliçitação invalida");
    }

    const findcustumer = await prismaClient.customer.findFirst({
      where: {
        id:id,
      },
    });
    if (!findcustumer) {
      throw new Error("Cliente não existe");
    }

    await prismaClient.customer.delete({
      where: {
        id: findcustumer.id,
      },
    });

    return { message: "Deletado com sucesso" };
  }
}

export { DeleteCustomersService };
