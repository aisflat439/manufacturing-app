import { initTRPC } from "@trpc/server";
import { awsLambdaRequestHandler } from "@trpc/server/adapters/aws-lambda";

import { z } from "zod";

export const t = initTRPC.create();

import {
  PartEntitySchema,
  createPart,
  deletePart,
  listParts,
  updatePart,
} from "@manufacturing-app/core/src/part";

const appRouter = t.router({
  getUser: t.procedure.input(z.string()).query(async ({ input }) => {
    return { id: input, name: "bob" };
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
});

// export type definition of API
export type Router = typeof appRouter;

export const handler = awsLambdaRequestHandler({
  router: appRouter,
});
