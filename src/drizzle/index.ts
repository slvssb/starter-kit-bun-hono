import { drizzle } from "drizzle-orm/bun-sql"
import * as relations from "./relations"
import * as schema from "./schema"

const db = drizzle({
  connection: { url: Bun.env.DATABASE_URL, adapter: "postgres", max: 5, maxLifetime: 60 * 5, prepare: false, idleTimeout: 30, connectionTimeout: 10 }, // prettier-ignore
  schema: { ...schema, ...relations },
})

export default db
export type Transaction<T = void> = Parameters<Parameters<typeof db.transaction<T>>[0]>[0]

export const withTransaction = async <T>(fn: (tx: Transaction<T>) => Promise<T>): Promise<T> => {
  return db.transaction<T>(async tx => {
    try {
      return await fn(tx)
    } catch (ex) {
      tx.rollback()
      throw ex
    }
  })
}
