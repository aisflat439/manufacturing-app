import { StackContext, use, Api as ApiGateway } from "sst/constructs";
import { Database } from "./Database";
import { DNS } from "./Dns";

export function Api({ stack }: StackContext) {
  const dns = use(DNS);

  const db = use(Database);

  const api = new ApiGateway(stack, "api", {
    customDomain:
      stack.stage === "production" ? `api.${dns.domain}` : undefined,
    defaults: {
      function: {
        bind: [db],
      },
    },
    routes: {
      "GET /trpc/{proxy+}": "packages/functions/src/trpc.handler",
      "POST /trpc/{proxy+}": "packages/functions/src/trpc.handler",
    },
  });

  stack.addOutputs({
    API_URL: api.customDomainUrl || api.url,
  });

  return api;
}
