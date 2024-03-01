import { SSTConfig } from "sst";
import { Api } from "./stacks/Api";
import { Authentication } from "./stacks/Authentication";
import { Database } from "./stacks/Database";
import { Web } from "./stacks/Web";
import { Marketing } from "./stacks/Marketing";
import { DNS } from "./stacks/Dns";
import { Bucket } from "./stacks/Bucket";

export default {
  config(_input) {
    return {
      name: "manufacturing-app",
      region: "us-east-1",
    };
  },
  stacks(app) {
    // Remove all resources when the dev stage is removed
    if (app.stage !== "prod") {
      app.setDefaultRemovalPolicy("destroy");
    }
    app
      .stack(DNS)
      .stack(Database)
      .stack(Bucket)
      .stack(Api)
      .stack(Web)
      .stack(Marketing)
      .stack(Authentication);
  },
} satisfies SSTConfig;
