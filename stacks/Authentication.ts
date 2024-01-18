import { Auth, StackContext, use } from "sst/constructs";
import { DNS } from "./Dns";
import { Web } from "./Web";
import { Marketing } from "./Marketing";
import { Api } from "./Api";

export function Authentication({ stack }: StackContext) {
  const dns = use(DNS);
  const web = use(Web);
  const api = use(Api);
  const marketing = use(Marketing);

  const auth = new Auth(stack, "auth", {
    authenticator: {
      handler: "packages/functions/src/auth.handler",
      environment: {
        URL:
          stack.stage === "production"
            ? `http://${dns.domain}`
            : "http://localhost:3000",
      },
      bind: [web, marketing],
    },
  });

  auth.attach(stack, {
    api,
  });

  return auth;
}
