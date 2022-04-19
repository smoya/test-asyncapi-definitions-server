import type { Context } from "netlify:edge";

export default async (request: Request, context: Context) => {
  context.log("Hello from the logging service");

  // Setting proper Content-Type header for JSON Schema files 
  const response = await context.next();
  response.headers.set("Content-Type", "application/schema+json");
  
  return response;
};