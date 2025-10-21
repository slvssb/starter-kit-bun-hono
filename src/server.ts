import { Hono } from "hono"
import { HTTPException } from "hono/http-exception"
import { logger } from "hono/logger"
import { ValiError } from "valibot"

const app = new Hono({ strict: false })

if (Bun.env.NODE_ENV === "development") {
  app.use(logger())
}

app.notFound(c => {
  console.warn(`Invalid request made to ${c.req.method} ${c.req.path}`)
  return c.text("Not Allowed", 406)
})

app.onError((err, c) => {
  console.error(err, { extra: { request: c.req.raw } })
  if (err instanceof HTTPException) return c.text(err.message, err.status)
  if (err instanceof ValiError) return c.text("Invalid request", 400)
  return c.text("Something went wrong", 500)
})

export default app
