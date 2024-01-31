import { createFileRoute } from "@tanstack/react-router";

import { apiUtils } from "../utils/trpc";
// import { Button } from "../components/Button";
// import { usePart } from "../hooks/parts";

export const Route = createFileRoute("/products/modules/")({
  loader: async ({ context }) => {
    const user = context.auth.user!;
    const res = await apiUtils.read.ensureData(user);
    return {
      res,
      user,
    };
  },
  component: ModulesIndexComponent,
});

// const api = new RouteApi({ id: "/modules/" });

function ModulesIndexComponent() {
  // const { user, res: serverModulesData } = api.useLoaderData();
  // const { data: modulesData } = trpc.read.useQuery(user, {
  //   initialData: serverPartsData,
  // });
  // const { handleDeletePart } = usePart();

  return (
    <div className="p-2">
      <div className="p-2">
        <p>Modules Index</p>
        <ul>
          <li>Module 1</li>
          <li>Module 2</li>
          <li>Module 3</li>
        </ul>
        {/* {partsData.data.map((part) => {
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
        })} */}
      </div>
    </div>
  );
}
