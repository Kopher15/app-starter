import { config } from "dotenv";

// Match Next.js local precedence before drizzle-kit loads .env itself.
config({ path: [".env.local", ".env"], quiet: true });
