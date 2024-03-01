export * as Product from "./product";
import { Dynamo } from "./dynamo";
import { Entity, EntityItem, Service } from "electrodb";
import { PartEntity } from "./part";
import { ModuleEntity } from "./module";

const product = new Service({
  PartEntity,
  ModuleEntity,
});

await product.collections.moduleParts({ moduleId: "123", partId: "456" });
