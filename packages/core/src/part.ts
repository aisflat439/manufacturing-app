export * as Part from "./part";
import { Dynamo } from "./dynamo";
import { Entity, EntityItem } from "electrodb";
import { ulid } from "ulid";

export const PartEntity = new Entity(
  {
    model: {
      version: "1",
      entity: "Part",
      service: "part",
    },
    attributes: {
      partId: {
        type: "string",
        required: true,
      },
      name: {
        type: "string",
        required: true,
      },
    },
    indexes: {
      part: {
        collection: "part",
        pk: {
          field: "pk",
          composite: [],
        },
        sk: {
          field: "sk",
          composite: ["partId"],
        },
      },
    },
  },
  Dynamo.Configuration
);

export type PartEntityType = EntityItem<typeof PartEntity>;

export async function createPart(name: string) {
  return PartEntity.create({
    name,
    partId: ulid(),
  }).go();
}

export async function deletePart(id: string) {
  return PartEntity.delete({
    partId: id,
  }).go();
}

export async function updatePart(name: string) {
  return PartEntity.update({
    partId: ulid(),
  })
    .set({ name })
    .go();
}

export async function listParts() {
  return PartEntity.query.part({}).go();
}
