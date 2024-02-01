import { createFileRoute, getRouteApi } from "@tanstack/react-router";
import { RouterOutputs, apiUtils, trpc } from "../utils/trpc";

export const Route = createFileRoute("/products/parts/$partId")({
  loader: async ({ params }) => {
    const res = await apiUtils.getPart.ensureData(params.partId);
    return { initialData: res, params };
  },
  component: PartComponent,
});

const api = getRouteApi("/products/parts/$partId");

function PartComponent() {
  const { initialData, params } = api.useLoaderData();
  const {
    data: { data },
  } = trpc.getPart.useQuery(params.partId, {
    initialData,
  });
  return (
    <div className="p-2">
      {data ? (
        <Part
          name={data?.name}
          price={data?.price}
          packSize={data?.packSize}
          partId={data?.partId}
        />
      ) : (
        <>no data for this part</>
      )}
    </div>
  );
}

const Part = ({
  name,
  price,
  packSize,
  partId,
}: NonNullable<RouterOutputs["getPart"]["data"]>) => {
  return (
    <div>
      <h3>{name}</h3>
      <p>Price: {price}</p>
      <p>Pack size: {packSize}</p>
      <p>Part ID: {partId}</p>
    </div>
  );
};
