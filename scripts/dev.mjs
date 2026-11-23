import { createServer } from "vite";
import { once } from "node:events";
import { makeServer } from "../server/runtime.mjs";

// Each development session gets its own loopback API so simultaneous previews
// cannot compete for a port or accidentally proxy to another process.
const api = makeServer(process.env).listen(0, "127.0.0.1");
await once(api, "listening");
process.env.HOOK_DEV_API_PORT = String(api.address().port);
let vite;
try {
  vite = await createServer({ server: { host: "127.0.0.1" } });
  await vite.listen();
  vite.printUrls();
} catch (error) {
  api.close();
  await vite?.close();
  throw error;
}
// A Vite config reload replaces its HTTP server. Keep the API alive until process exit.
