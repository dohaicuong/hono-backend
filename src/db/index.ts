import { drizzle } from 'drizzle-orm/libsql'

// export const db = drizzle('file:local.db')

export const get_db = () => {
	return drizzle('file:local.db')
}
