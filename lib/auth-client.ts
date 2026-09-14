import { createAuthClient } from "better-auth/react";
import { anonymousClient } from "better-auth/client/plugins";

const apiBaseUrl =
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.NEXT_PUBLIC_API_BASE ||
  "http://localhost:5000";

export const authClient = createAuthClient({
  baseURL: apiBaseUrl,
  basePath: "/api/v1/auth",
  plugins: [anonymousClient()],
});

export const { signIn, signUp, signOut, useSession } = authClient;
