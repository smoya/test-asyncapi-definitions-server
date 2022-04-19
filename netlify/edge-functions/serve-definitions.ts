import type { Context } from "netlify:edge";

export default async (request: Request, context: Context) => {
  context.log("Hello from the logging service");
};