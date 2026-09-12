export const configs = {
  API_BASE: process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000",
  API_KEY: process.env.NEXT_PUBLIC_API_KEY,
  URL_IMG: process.env.NEXT_PUBLIC_URL_IMG || "",
  URL_DOMAIN: process.env.NEXT_PUBLIC_URL_DOMAIN,
  LINK_CONTACT: process.env.NEXT_PUBLIC_LINK_CONTACT,
  RECEIPER_NAME: process.env.NEXT_PUBLIC_RECEIPER_NAME,
  BANK_NAME: process.env.NEXT_PUBLIC_BANK_NAME,
  ACCOUNT_NUMBER: process.env.NEXT_PUBLIC_ACCOUNT_NUMBER,
  IG: process.env.NEXT_PUBLIC_IG,
  X: process.env.NEXT_PUBLIC_X,
  FB: process.env.NEXT_PUBLIC_FB,

  AUTH_SECRET: process.env.NEXTAUTH_SECRET,
  AUTH_URL: process.env.NEXTAUTH_URL,
};
