import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../../lib/prisma";

interface IBody {
  cardName: string;
  cardDigits: string;
  userId: number;
}

export class CardController {
  public static async create(
    request: FastifyRequest<{ Body: IBody }>,
    reply: FastifyReply
  ) {
    const {
      body: { cardName, cardDigits, userId },
    } = request;

    const create = await prisma.card.create({
      data: {
        cardName,
        cardDigits,
        userId
      },
    });

    reply.send(create);
  }

  public static async get(
    request: FastifyRequest<{ Params: { id: number } }>,
    reply: FastifyReply
  ) {
    const { id } = request.params;

    const card = await prisma.card.findUnique({
      where: { id },
    });

    if (!card) {
      reply.status(404).send({ error: "Card not found" });
      return;
    }

    reply.send(card);
  }

  public static async update(
    request: FastifyRequest<{ Params: { id: number }; Body: IBody }>,
    reply: FastifyReply
  ) {
    const { id } = request.params;
    const { cardName, cardDigits } = request.body;

    const update = await prisma.card.update({
      where: { id },
      data: {
        cardName,
        cardDigits,
        updatedAt: new Date(),
      },
    });

    reply.send(update);
  }

  public static async delete(
    request: FastifyRequest<{ Params: { id: number } }>,
    reply: FastifyReply
  ) {
    const { id } = request.params;

    await prisma.card.delete({
      where: { id },
    });

    reply.send({ status: "Card deleted successfully" });
  }
}
