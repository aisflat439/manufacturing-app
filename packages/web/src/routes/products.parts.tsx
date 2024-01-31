import {
  Link,
  Outlet,
  RouteApi,
  createFileRoute,
} from "@tanstack/react-router";
import { usePart } from "../hooks/parts";
import { Button } from "../components/Button";
import { apiUtils, trpc } from "../utils/trpc";

export const Route = createFileRoute("/products/parts")({
  loader: async ({ context }) => {
    const user = context.auth.user!;
    const res = await apiUtils.read.ensureData(user);
    return {
      res,
      user,
    };
  },
  component: PartsRoute,
});

const api = new RouteApi({ id: "/products/parts" });

function PartsRoute() {
  const { user, res: serverPartsData } = api.useLoaderData();
  const { data: partsData } = trpc.read.useQuery(user, {
    initialData: serverPartsData,
  });
  const { handleDeletePart } = usePart();

  return (
    <div className="p-2">
      <h3 className="text-lg">
        Parts list
        <span className="ml-6 text-sm text-blue-600">
          <Link
            activeOptions={{ exact: true }}
            to="/products/parts"
            activeProps={{
              style: {
                display: "none",
              },
            }}
          >
            Create a Part
          </Link>
        </span>
      </h3>
      <div className="grid grid-cols-4">
        <div>
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
        <Outlet />
      </div>
    </div>
  );
}
