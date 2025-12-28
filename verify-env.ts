import dotenv from 'dotenv';
dotenv.config();

const requiredVars = [
  'SUPABASE_URL',
  'BACKEND_BASE_URL',
  'SUPABASE_ANON_KEY',
  'NODE_ENV'
];

console.log("--- ENV VALIDATION START ---");

requiredVars.forEach(v => {
  const value = process.env[v];
  if (!value) {
    console.error(`[ERROR] Missing variable: ${v}`);
  } else if (value.includes("<your-project>") || value.includes("your-actual")) {
    console.error(`[ERROR] Placeholder detected in: ${v}`);
  } else {
    console.log(`[OK] ${v} is set.`);
  }
});

const redirectUri = `${process.env.BACKEND_BASE_URL}/api/callback`;
console.log(`\nEXPECTED SUPABASE WHITELIST ENTRY: \n${redirectUri}`);
console.log("\n--- ENV VALIDATION END ---");