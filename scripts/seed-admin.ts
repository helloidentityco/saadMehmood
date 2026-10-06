import fs from 'node:fs';
import path from 'node:path';
import bcrypt from 'bcryptjs';
import { neon } from '@neondatabase/serverless';

export interface AdminSeedOptions {
  email?: string;
  password?: string;
  fullName?: string;
  role?: string;
}

export interface AdminSeedResult {
  success: boolean;
  email: string;
  role: string;
  fullName: string;
  passwordHash: string;
  sqlSnippet: string;
  dbUpdated: boolean;
  message: string;
}

/**
 * Loads .env or .env.local file into process.env if present
 */
function loadLocalEnv(): void {
  const envFiles = ['.env.local', '.env'];
  for (const file of envFiles) {
    const fullPath = path.resolve(process.cwd(), file);
    if (fs.existsSync(fullPath)) {
      const content = fs.readFileSync(fullPath, 'utf8');
      const lines = content.split('\n');
      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) continue;
        const eqIdx = trimmed.indexOf('=');
        if (eqIdx > 0) {
          const key = trimmed.slice(0, eqIdx).trim();
          let val = trimmed.slice(eqIdx + 1).trim();
          if (
            (val.startsWith('"') && val.endsWith('"')) ||
            (val.startsWith("'") && val.endsWith("'"))
          ) {
            val = val.slice(1, -1);
          }
          if (!process.env[key]) {
            process.env[key] = val;
          }
        }
      }
    }
  }
}

/**
 * Seed or elevate an Administrator account for Saad Mehmood Fabrics
 */
export async function seedAdmin(options: AdminSeedOptions = {}): Promise<AdminSeedResult> {
  loadLocalEnv();

  const email = (options.email || 'admin@saadmehmood.com.pk').trim().toLowerCase();
  const password = options.password || 'AdminPass123!';
  const fullName = options.fullName || 'Saad Mehmood Admin';
  const role = options.role || 'admin';

  // 1. Hash the test password using bcryptjs (10 salt rounds to match lib/auth.ts)
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  // Self-verification check
  const isMatch = await bcrypt.compare(password, passwordHash);
  if (!isMatch) {
    throw new Error('Internal error: bcrypt password verification failed.');
  }

  // 2. Prepare portable SQL upsert query
  const escapedPasswordHash = passwordHash.replace(/'/g, "''");
  const escapedFullName = fullName.replace(/'/g, "''");
  const sqlSnippet = `
-- ============================================================
-- SAAD MEHMOOD FABRICS: ADMIN ELEVATION SQL SNIPPET
-- ============================================================
INSERT INTO users (full_name, email, password_hash, role)
VALUES ('${escapedFullName}', '${email}', '${escapedPasswordHash}', '${role}')
ON CONFLICT (email)
DO UPDATE SET
  password_hash = EXCLUDED.password_hash,
  role = 'admin',
  full_name = EXCLUDED.full_name;
`.trim();

  let dbUpdated = false;
  let resultMessage = '';

  const databaseUrl = process.env.DATABASE_URL;
  if (databaseUrl && databaseUrl.startsWith('postgres')) {
    try {
      console.log('📡 Connecting to Neon PostgreSQL...');
      const sql = neon(databaseUrl);

      // Ensure users table exists
      await sql`
        CREATE TABLE IF NOT EXISTS users (
          id SERIAL PRIMARY KEY,
          full_name TEXT NOT NULL,
          email TEXT NOT NULL UNIQUE,
          password_hash TEXT NOT NULL,
          role VARCHAR(20) DEFAULT 'user' NOT NULL,
          created_at TIMESTAMP DEFAULT NOW() NOT NULL
        );
      `;

      // Upsert admin user
      await sql`
        INSERT INTO users (full_name, email, password_hash, role)
        VALUES (${fullName}, ${email}, ${passwordHash}, ${role})
        ON CONFLICT (email)
        DO UPDATE SET
          password_hash = EXCLUDED.password_hash,
          role = 'admin',
          full_name = EXCLUDED.full_name;
      `;

      dbUpdated = true;
      resultMessage = `Admin account successfully inserted/elevated in Neon DB for ${email}.`;
      console.log('✅ ' + resultMessage);
    } catch (err) {
      console.warn('⚠️ Neon DB update warning:', err);
      resultMessage = `Database execution warning: ${err instanceof Error ? err.message : String(err)}. SQL snippet is provided below.`;
    }
  } else {
    resultMessage =
      'DATABASE_URL not configured for Neon DB. Use the generated SQL snippet or in-memory credentials.';
    console.log('ℹ️ ' + resultMessage);
  }

  return {
    success: true,
    email,
    role,
    fullName,
    passwordHash,
    sqlSnippet,
    dbUpdated,
    message: resultMessage,
  };
}

// Direct execution CLI runner
if (require.main === module || process.argv[1]?.endsWith('seed-admin.ts')) {
  (async () => {
    try {
      console.log('👑 ======================================================');
      console.log('👑 SAAD MEHMOOD FABRICS · ADMIN ACCOUNT SEEDING');
      console.log('👑 ======================================================\n');

      const result = await seedAdmin();

      console.log('📋 CREATED ADMIN CREDENTIALS:');
      console.log(`   Email:        ${result.email}`);
      console.log(`   Password:     AdminPass123!`);
      console.log(`   Role:         ${result.role}`);
      console.log(`   Full Name:    ${result.fullName}`);
      console.log(`   Hash:         ${result.passwordHash}`);
      console.log(`   DB Updated:   ${result.dbUpdated ? 'YES (Neon PostgreSQL)' : 'NO (Manual or Sandbox)'}\n`);

      console.log('📝 RAW SQL COMMAND:');
      console.log(result.sqlSnippet);
      console.log('\n======================================================');
      console.log('🚀 TEST GUIDE:');
      console.log('1. Admin Login:      Navigate to /login and enter the credentials.');
      console.log('2. Auto-Redirect:    Verify immediate redirect to /admin upon login.');
      console.log('3. Route Guard:      Test /admin while signed out or logged in as user.');
      console.log('4. Session Cookie:   Verify smf_session_token holds role: "admin".');
      console.log('======================================================\n');
    } catch (err) {
      console.error('❌ Failed to seed admin account:', err);
      process.exit(1);
    }
  })();
}
