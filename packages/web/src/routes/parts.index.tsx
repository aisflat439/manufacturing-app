import { FileRoute, RouteApi } from "@tanstack/react-router";

import { apiUtils, trpc } from "../utils/trpc";

export const Route = new FileRoute('/parts/').createRoute({
  loader: async ({ context }) => {
    const user = context.auth.user!;
    const res = await apiUtils.read.ensureData(user);
    console.log("res: ", res);
    // const res = { name: "test" };
    return {
      res,
      user,
    };
  },
  component: PartsIndexComponent,
});

const api = new RouteApi({ id: "/parts/" });

function PartsIndexComponent() {
  const { user, res: serverPartsData } = api.useLoaderData();
  const { data: partsData } = trpc.read.useQuery(user, {
    initialData: serverPartsData,
  });

  return (
    <div className="p-2">
      <div className="p-2">
        {partsData.data.map((part) => {
          return (
            <div key={part.partId + part.name}>
              <p>{part.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
