import { Scalar } from '@scalar/hono-api-reference'
import { Hono } from 'hono'
import { openAPISpecs } from 'hono-openapi'
import user_gets from './api/users.get.js'

export const app = new Hono()

app
	.get(
		'/openapi',
		openAPISpecs(app, {
			documentation: {
				info: {
					title: 'LEAN API',
					version: '1.0.0',
					description: 'Greeting API',
				},
				servers: [
					{ url: 'http://localhost:8787', description: 'Local Server' },
				],
			},
		}),
	)
	.get('/docs', Scalar({ url: '/openapi' }))
	.route('', user_gets)
