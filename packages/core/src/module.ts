export * as Module from "./module";
import { Dynamo } from "./dynamo";
import { Entity, EntityItem } from "electrodb";
import { ulid } from "ulid";
import { ZodEnum, z } from "zod";

export const ModuleEntity = new Entity(
  {
    model: {
      version: "1",
      entity: "Module",
      service: "module",
    },
    attributes: {
      moduleId: {
        type: "string",
        required: true,
      },
      name: {
        type: "string",
        required: true,
      },
    },
    indexes: {
      module: {
        collection: "module",
        pk: {
          field: "pk",
          composite: [],
        },
        sk: {
          field: "sk",
          composite: ["moduleId"],
        },
      },
    },
  },
  Dynamo.Configuration
);

export type ModuleEntityType = EntityItem<typeof ModuleEntity>;

export const ModuleEntitySchema = z.object({
  moduleId: z.string(),
  name: z.string(),
  quantity: z.number().optional(),
});

export type CreateSchema = z.infer<typeof ModuleEntitySchema>;

export async function createModule(data: CreateSchema) {
  return ModuleEntity.create({
    name: data.name,
    moduleId: data.moduleId,
  }).go();
}

export async function getModule(id: string) {
  return ModuleEntity.get({ moduleId: id }).go();
}

export async function deleteModule(id: string) {
  return ModuleEntity.delete({
    moduleId: id,
  }).go();
}

export async function updateModule(name: string) {
  return ModuleEntity.update({
    moduleId: ulid(),
  })
    .set({ name })
    .go();
}

export async function listModules() {
  return ModuleEntity.query.module({}).go();
}
