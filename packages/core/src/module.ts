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
      partId: {
        type: "string",
      },
    },
    indexes: {
      module: {
        pk: {
          field: "pk",
          composite: [],
        },
        sk: {
          field: "sk",
          composite: ["moduleId"],
        },
      },
      modulesPart: {
        collection: ["moduleParts"],
        index: "gsi1pk-gsi1sk-index",
        pk: {
          field: "gsi1pk",
          composite: ["moduleId"],
        },
        sk: {
          field: "gsi1sk",
          composite: ["partId"],
        },
      },
      modulesSubmodule: {
        index: "gsi2pk-gsi2sk-index",
        pk: {
          field: "gsi2pk",
          composite: ["moduleId"],
        },
        sk: {
          field: "gsi2sk",
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
  partId: z.array(z.string()),
});

export const ModuleCreateSchema = z.object({
  name: z.string(),
  partId: z.array(z.string()),
});

export type CreateSchema = z.infer<typeof ModuleCreateSchema>;

export async function createModule(data: CreateSchema) {
  const parts = data.partId.map((partId) => partId);
  const moduleId = ulid();

  return ModuleEntity.put(
    parts.map((partId) => ({ name: data.name, moduleId, partId }))
  ).go();
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
