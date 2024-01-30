import { FileRoute, Link, RouteApi } from "@tanstack/react-router";

import { apiUtils, trpc } from "../utils/trpc";
import { Button } from "../components/Button";
import { usePart } from "../hooks/parts";

export const Route = new FileRoute("/parts/").createRoute({
  loader: async ({ context }) => {
    const user = context.auth.user!;
    const res = await apiUtils.read.ensureData(user);
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
  const { handleDeletePart } = usePart();

  return (
    <div className="p-2">
      <div className="p-2">
        {partsData.data.map((part) => {
          return (
            <div key={part.partId + part.name}>
              <p>
                <Link to={part.partId}>{part.name}</Link>
                <Button
                  variant="delete"
                  modification="text"
                  onClick={() => handleDeletePart(part.partId)}
                >
                  Delete
                </Button>
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
