import { StackContext, use, AstroSite } from "sst/constructs";
import { DNS } from "./Dns";

export function Marketing({ stack }: StackContext) {
  const dns = use(DNS);

  const isProduction = stack.stage === "prod";
  const customDomain = {
    ...dns,
  };

  const astroSite = new AstroSite(stack, "marketing", {
    path: "packages/marketing",
    ...(isProduction && customDomain),
  });

  stack.addOutputs({
    //
  });

  return astroSite;
}
