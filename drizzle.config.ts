import { defineConfig } from "drizzle-kit"

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/drizzle/schema/index.ts",
  out: "./src/drizzle/migrations",
  migrations: { prefix: "index" },
  strict: true,
  dbCredentials: { url: process.env.DATABASE_URL as string },
})
