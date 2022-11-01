/**
 * Extracts query params from request.
 * 
 * @param request object from React Router
 * @returns the entries from query param.
 */
export const extractParams = (request: Request) =>
  Object.fromEntries(new URL(request.url).searchParams.entries());