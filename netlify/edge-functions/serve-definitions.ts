import type { Context } from "netlify:edge";

export default async (request: Request, context: Context) => {
  context.log("Hello from the logging service");

  // Deleting headers involved in the cache policy, so requests can hit GH cache
  request.headers.delete("origin");
  request.headers.delete("accept"); 

  // Setting GH Token to increase GH rate limit to 5,000 req/h.
  const token = Deno.env.get("GITHUB_TOKEN");

  context.log("TOKEN", token);
  request.headers.set("Authorization", "token " + token);

  // Setting proper Content-Type header for JSON Schema files 
  const response = await context.next();
  response.headers.set("Content-Type", "application/schema+json");
  
  return response;
};