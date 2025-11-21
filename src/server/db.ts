import { Pool } from 'pg';

// This prevents us from creating multiple connection pools in development
// due to Next.js's hot-reloading.
declare const global: typeof globalThis & {
  _pool?: Pool;
};

let pool: Pool;

if (process.env.NODE_ENV === 'production') {
  pool = new Pool({ connectionString: process.env.POSTGRES_URL });
} else {
  if (!global._pool) {
    global._pool = new Pool({ connectionString: process.env.POSTGRES_URL });
  }
  pool = global._pool;
}

export const db = pool;