import 'dotenv/config';
import { Client } from 'pg';
import { scryptSync, randomBytes } from 'node:crypto';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL is not set');
}

function hashAdminPassword(password: string) {
  const salt = randomBytes(16).toString('hex');
  const derivedKey = scryptSync(password, salt, 64).toString('hex');
  return `${salt}:${derivedKey}`;
}

async function main() {
  const client = new Client({ connectionString });
  await client.connect();

  const email = 'admin@nemosa.com';
  const passwordHash = hashAdminPassword('12345678');
  const now = new Date().toISOString();

  await client.query(
    `INSERT INTO "Admin" ("email", "passwordHash", "isActive", "createdAt", "updatedAt")
     VALUES ($1, $2, $3, $4, $4)
     ON CONFLICT ("email") DO UPDATE
     SET "passwordHash" = EXCLUDED."passwordHash",
         "isActive" = EXCLUDED."isActive",
         "updatedAt" = EXCLUDED."updatedAt"`,
    [email, passwordHash, true, now],
  );

  await client.end();
  console.log(`Seeded admin account: ${email}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
