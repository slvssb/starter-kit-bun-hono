import { timestamp } from "drizzle-orm/pg-core"

export const timestamps = {
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(() => new Date()).notNull(), // prettier-ignore
}

export const timestampsExt = {
  ...timestamps,
  deletedAt: timestamp("deleted_at", { withTimezone: true }),
}
