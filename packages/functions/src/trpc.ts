import { initTRPC } from "@trpc/server";
import { awsLambdaRequestHandler } from "@trpc/server/adapters/aws-lambda";

import { z } from "zod";

export const t = initTRPC.create();

import {
  createPart,
  deletePart,
  listParts,
  updatePart,
} from "@manufacturing-app/core/src/part";

const appRouter = t.router({
  create: t.procedure
    .input(
      z.object({
        title: z.string(),
        teamId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      return await createPart(input.title);
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
