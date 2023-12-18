/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

type D1Database = import('@cloudflare/workers-types').D1Database;
type ENV = {
  D1: D1Database;
};

type Runtime = import('@astrojs/cloudflare').DirectoryRuntime<ENV>;
declare namespace App {
  interface Locals extends Runtime {}
}
