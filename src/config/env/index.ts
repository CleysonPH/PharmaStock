import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  PORT: z.coerce.number().default(3000),
  NODE_ENV: z.enum(['development', 'production', 'test'])
    .default('development'),
  SALT_ROUNDS: z.coerce.number().default(10)
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error('Invalid environment variables:', _env.error.format());

  throw new Error(_env.error.message);
}

export const env = _env.data;
