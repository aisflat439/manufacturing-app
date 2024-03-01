import { StackContext, use, Api as ApiGateway } from "sst/constructs";
import { Database } from "./Database";
import { DNS } from "./Dns";
import { Bucket } from "./Bucket";

export function Api({ stack }: StackContext) {
  const dns = use(DNS);
  const bucket = use(Bucket);
  const db = use(Database);

  const api = new ApiGateway(stack, "api", {
    customDomain:
      stack.stage === "production" ? `api.${dns.domain}` : undefined,
    defaults: {
      function: {
        bind: [db, bucket],
      },
    },
    cors: {
      allowOrigins: ["*"],
      allowHeaders: ["*"],
      allowMethods: ["ANY"],
    },
    // prettier-ignore
    routes: {
      "GET    /trpc/{proxy+}":          "packages/functions/src/trpc.handler",
      "POST   /trpc/{proxy+}":          "packages/functions/src/trpc.handler",
      "GET    /hands/presigned-url":    "packages/functions/src/upload-hands.handler",
    },
  });

  stack.addOutputs({
    API_URL: api.customDomainUrl || api.url,
  });

  return api;
}
