declare module "bun" {
  interface Env {
    NODE_ENV: "production" | "development"
  }
}
