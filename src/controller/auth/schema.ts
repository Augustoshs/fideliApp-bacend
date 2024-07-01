import { z } from "zod";

export const authSchema = z.object({
  email: z.string().email(),
  cpf: z
    .string()
    .min(3)
    .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "CPF inválido"),
  password: z.string(),
});
