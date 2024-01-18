import { StackContext } from "sst/constructs";

const PRODUCTION = "tbd.com";
// const DEV = "dev.tbd.com";

export function DNS(ctx: StackContext) {
  return {
    domain:
      ctx.stack.stage === "production"
        ? `${ctx.stack.stage}.${PRODUCTION}`
        : undefined,
    domainAlias:
      ctx.stack.stage === "production"
        ? `www.${ctx.stack.stage}.${PRODUCTION}`
        : undefined,
  };
}
