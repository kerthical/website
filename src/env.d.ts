/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

type Runtime = import('@astrojs/cloudflare').DirectoryRuntime<{ D1: import('@cloudflare/workers-types').D1Database }>;
declare namespace App {
  interface Locals extends Runtime {
    db: import('drizzle-orm/d1/driver').DrizzleD1Database;
    auth: import('lucia').Auth;
    authRequest: import('lucia').AuthRequest;
  }
}

/// <reference types="lucia" />
declare namespace Lucia {
  type Auth = import('@/auth.ts').Auth;
  type DatabaseUserAttributes = {};
  type DatabaseSessionAttributes = {};
}
