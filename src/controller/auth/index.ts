import bcrypt from 'bcrypt';
import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../../lib/prisma";
import { authSchema } from "./schema";

interface IAuth {
    email: string;
    password: string;
    cpf: string;
}

export class authController {
    public static async create(request: FastifyRequest<{Body: IAuth}>, reply: FastifyReply) {
        const { body: {
            cpf,
            email,
            password
        } } = request

        authSchema.parse({
            email,
            cpf,
            password
        });

        const hashedPassword = await bcrypt.hash(password, 10);

        const create = await prisma.user.create({
            data: {
                cpf,
                email,
                password: hashedPassword,
                createdAt: new Date(),
            }
        });

        reply.send(create);
    }

    public static async login(request: FastifyRequest<{Body: Pick<IAuth, "password" | "email">}>, reply: FastifyReply) {
        const { body: { email, password } } = request;

        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user) {
            reply.status(401).send({ error: 'Invalid email or password' });
            return;
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            reply.status(401).send({ error: 'Invalid email or password' });
            return;
        }

        const { password: _, ...userWithoutPassword } = user;
        return {
            ...userWithoutPassword,
            status: "success login"
        }
    }
}
