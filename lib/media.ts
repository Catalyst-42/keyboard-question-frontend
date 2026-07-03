/**
 * Media utility function to generate proper media URLs
 * Uses NEXT_PUBLIC_API_BASE_URL environment variable with fallback to localhost:8000
 */
export const media = (path: string): string => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_PATH || '';
  return `${baseUrl}/media/${path}`;
};