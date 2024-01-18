import { StackContext, use, StaticSite } from "sst/constructs";
import { Api } from "./Api";
import { DNS } from "./Dns";

export function Web({ stack }: StackContext) {
  const api = use(Api);
  const dns = use(DNS);

  const isProduction = stack.stage === "prod";
  const customDomain = {
    ...dns,
  };

  const site = new StaticSite(stack, "web", {
    ...(isProduction && customDomain),
    path: "packages/web",
    buildCommand: "npm run build",
    buildOutput: "dist",
    environment: {
      VITE_MOCK_VALUE: "Hello",
      VITE_API_URL: api.url,
    },
  });

  stack.addOutputs({
    SITE: site.url || "https://localhost:5173",
    VITE_APP_API_URL: api.url,
  });

  return api;
}
