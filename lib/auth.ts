import { betterAuth } from "better-auth";
import { anonymous, bearer, jwt } from "better-auth/plugins";
import { Pool } from "pg";

const connectionString = process.env.DATABASE_URL || "";

export const auth = betterAuth({
  database: connectionString
    ? new Pool({
        connectionString,
        ssl: connectionString.includes("supabase.com")
          ? { rejectUnauthorized: false }
          : undefined,
      })
    : undefined,
  emailAndPassword: {
    enabled: true,
  },
  plugins: [
    anonymous({
      emailDomainName: "demo.local",
    }),
    bearer(),
    jwt(),
  ],
});
