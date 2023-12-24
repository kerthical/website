/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
type Runtime = import('@astrojs/cloudflare').DirectoryRuntime<{ D1: import('@cloudflare/workers-types').D1Database }>;
declare namespace App {
  interface Locals extends Runtime {
    auth: import('lucia').AuthRequest;
  }
}

/// <reference types="lucia" />
declare namespace Lucia {
  type Auth = import('./lib/auth.ts').Auth;
  type DatabaseUserAttributes = {
    username: string;
  };
  type DatabaseSessionAttributes = {};
}
