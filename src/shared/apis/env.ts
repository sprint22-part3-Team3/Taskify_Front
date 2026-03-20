const API_TEAM_BASE_URL = import.meta.env.VITE_API_TEAM_BASE_URL;
if (!API_TEAM_BASE_URL) {
  throw new Error('VITE_API_TEAM_BASE_URL is not defined');
}
export const ENV = {
  API_TEAM_BASE_URL,
} as const;
