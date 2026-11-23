import { makeServer } from "./runtime.mjs";
const port = Number(process.env.PORT || 3001);
makeServer(process.env).listen(port, process.env.HOST || "127.0.0.1", () =>
  console.log("HOOK server listening on port " + port),
);
