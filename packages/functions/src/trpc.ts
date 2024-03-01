import { initTRPC } from "@trpc/server";
import { awsLambdaRequestHandler } from "@trpc/server/adapters/aws-lambda";

import { z } from "zod";

export const t = initTRPC.create();

import {
  PartEntitySchema,
  createPart,
  deletePart,
  getPart,
  listParts,
  updatePart,
} from "@manufacturing-app/core/src/part";

import {
  ModuleCreateSchema,
  ModuleEntitySchema,
  createModule,
} from "@manufacturing-app/core/src/module";

const appRouter = t.router({
  getUser: t.procedure.input(z.string()).query(async ({ input }) => {
    return { id: input, name: "bob" };
  }),
  getPart: t.procedure.input(z.string()).query(async ({ input }) => {
    return await getPart(input);
  }),
  create: t.procedure.input(PartEntitySchema).mutation(async ({ input }) => {
    return await createPart(input);
  }),
  update: t.procedure.input(z.string()).mutation(async ({ input }) => {
    return await updatePart(input);
  }),
  read: t.procedure.input(z.string()).query(async () => {
    return await listParts();
  }),
  delete: t.procedure.input(z.string()).mutation(async ({ input }) => {
    return await deletePart(input);
  }),
  createModule: t.procedure
    .input(ModuleCreateSchema)
    .mutation(async ({ input }) => {
      return await createModule(input);
    }),
});

// export type definition of API
export type Router = typeof appRouter;

export const handler = awsLambdaRequestHandler({
  router: appRouter,
});
