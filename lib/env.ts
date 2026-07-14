export function isAuthConfigured(): boolean {
  return Boolean(
    process.env.AUTH_SECRET &&
      process.env.AUTH_GOOGLE_ID &&
      process.env.AUTH_GOOGLE_SECRET,
  );
}

export function isDatabaseConfigured(): boolean {
  return Boolean(process.env.DATABASE_URL);
}

export function getConfigStatus() {
  return {
    auth: isAuthConfigured(),
    database: isDatabaseConfigured(),
    nodeEnv: process.env.NODE_ENV ?? "development",
  };
}
