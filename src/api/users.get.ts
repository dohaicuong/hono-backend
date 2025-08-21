import { zValidator } from '@hono/zod-validator'
import { differenceInYears } from 'date-fns'
import { eq } from 'drizzle-orm'
import { Hono } from 'hono'
import { describeRoute } from 'hono-openapi'
import { resolver } from 'hono-openapi/zod'
import z from 'zod'
import { get_db } from '../db/index.js'
import { usersTable } from '../db/schema.js'
import { ApiUserSchema } from './schema.js'

export default new Hono().get(
	'/users',
	describeRoute({
		tags: ['Users'],
		description: 'List all users',
		responses: {
			200: {
				description: 'Successful response',
				content: {
					'application/json': {
						schema: resolver(
							z.object({
								hits: ApiUserSchema.array(),
							}),
						),
					},
				},
			},
		},
	}),
	zValidator(
		'query',
		z.object({
			email: z.email().optional(),
		}),
	),
	async (c) => {
		const { email } = c.req.valid('query')
		const db = get_db()

		const userQuery = db.select().from(usersTable)
		if (email) {
			userQuery.where(eq(usersTable.email, email))
		}

		const results = await userQuery.run()

		const usersWithAge = results.rows.map((user) => ({
			...user,
			age: differenceInYears(new Date(), user.dob as any),
		}))

		return c.json(ApiUserSchema.array().parse(usersWithAge))
	},
)
