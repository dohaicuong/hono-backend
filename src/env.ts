import z from 'zod'

const EnvSchema = z.object({
	PORT: z.coerce.number().optional().default(5000),
})

export const ENV = EnvSchema.parse(process.env)
