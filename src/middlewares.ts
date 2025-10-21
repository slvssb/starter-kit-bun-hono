import { createMiddleware } from "hono/factory"
import * as v from "valibot"

export const validate = <T extends v.GenericSchema>(schema: T) => {
  type Variables = { body: v.InferOutput<T> }

  return createMiddleware<{ Variables: Variables }>(async (c, next) => {
    const result = await v.parseAsync<T>(schema, await c.req.json())
    c.set("body", result)
    return next()
  })
}
