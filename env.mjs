import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    CLERK_PUBLISHABLE_KEY: z.string().min(1),
    CLERK_SECRET_KEY: z.string().min(1),
  },
  runtimeEnv: {
    CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
  },
});
