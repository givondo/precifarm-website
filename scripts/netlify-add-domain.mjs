import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const SITE_ID = '1170dc6e-cc54-48a7-82d9-400ef9913809';
const DOMAIN = 'precifarm.com';
const WWW = 'www.precifarm.com';

function getToken() {
  const configPath = path.join(os.homedir(), 'AppData', 'Roaming', 'netlify', 'Config', 'config.json');
  const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  const userId = config.userId;
  const token = config.users?.[userId]?.auth?.token;
  if (!token) throw new Error('Netlify token not found. Run netlify login first.');
  return token;
}

async function netlify(method, apiPath, body) {
  const res = await fetch(`https://api.netlify.com/api/v1${apiPath}`, {
    method,
    headers: {
      Authorization: `Bearer ${getToken()}`,
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  let data;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }
  if (!res.ok) {
    throw new Error(`${method} ${apiPath} failed (${res.status}): ${typeof data === 'string' ? data : JSON.stringify(data)}`);
  }
  return data;
}

async function main() {
  console.log('Adding custom domain to precifarm-website...');
  const site = await netlify('PATCH', `/sites/${SITE_ID}`, {
    custom_domain: DOMAIN,
    domain_aliases: [WWW],
  });
  console.log('Domain assigned:', site.custom_domain);
  console.log('Aliases:', site.domain_aliases?.join(', ') || '(none)');
  console.log('SSL URL:', site.ssl_url);

  try {
    await netlify('POST', `/sites/${SITE_ID}/ssl`, {});
    console.log('TLS provisioning requested.');
  } catch (err) {
    console.log('TLS note:', err.message);
  }
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
