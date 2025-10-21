import { createInsertSchema } from "drizzle-valibot"
import * as v from "valibot"
import { userDevices, type UserDevice } from "./drizzle/schema"

export const Device = createInsertSchema(userDevices, {
  id: v.optional(v.never()),
  osName: v.pipe(v.string(), v.transform((input) => (["iOS", "iPadOS"].includes(input) ? input as UserDevice["osName"] : "Android"))), // prettier-ignore
  trialGiven: v.optional(v.never()),
  createdAt: v.optional(v.never()),
  updatedAt: v.optional(v.never()),
})

export type DeviceOutput = v.InferOutput<typeof Device>
