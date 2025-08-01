import z from 'zod'

export const ApiUserSchema = z.object({
	id: z.number(),
	name: z.string(),
	email: z.email(),
	dob: z.string(),
	age: z.number(),
})
