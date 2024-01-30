export * as Part from "./part";
import { Dynamo } from "./dynamo";
import { Entity, EntityItem } from "electrodb";
import { ulid } from "ulid";
import { ZodEnum, z } from "zod";

const packSizeEnum = ["each", "pack"] as const;

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
      price: {
        type: "number",
      },
      quantity: {
        type: "number",
      },
      packSize: {
        type: "string",
        required: true,
        enum: packSizeEnum,
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

export const PartEntitySchema = z.object({
  partId: z.string(),
  name: z.string(),
  price: z.number().optional(),
  quantity: z.number().optional(),
  packSize: z.enum(packSizeEnum),
});

export type CreateSchema = z.infer<typeof PartEntitySchema>;

export async function createPart(data: CreateSchema) {
  return PartEntity.create({
    name: data.name,
    partId: data.partId,
    price: data?.price || 0.0,
    quantity: data.quantity || 0,
    packSize: data.packSize,
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
