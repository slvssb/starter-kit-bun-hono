import { getTableColumns, type SQL, sql } from "drizzle-orm"
import type { PgTable } from "drizzle-orm/pg-core"

type ExcludeSelected<T, K extends keyof T> = {
  [P in Exclude<keyof T, K>]: T[P]
}

type UniqueColumns<T extends PgTable, Q extends (keyof T["_"]["columns"])[] = []> = Q["length"] extends 0
  ? keyof T["_"]["columns"]
  : keyof ExcludeSelected<T["_"]["columns"], Q[number]>

export const buildConflictUpdateColumns = <T extends PgTable, Q extends (keyof T["_"]["columns"])[]>(
  table: T,
  columns: [...Q, UniqueColumns<T, Q>]
) => {
  const cls = getTableColumns(table)
  return columns.reduce((acc, column) => {
    acc[column] = sql.raw(`excluded.${cls[column].name}`)
    return acc
  }, {} as Record<Q[number], SQL>)
}
