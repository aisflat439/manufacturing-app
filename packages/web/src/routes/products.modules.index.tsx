import { createFileRoute, getRouteApi } from "@tanstack/react-router";

// import { apiUtils, trpc } from "../utils/trpc";
// import { Button } from "../components/Button";
// import { usePart } from "../hooks/parts";

export const Route = createFileRoute("/products/modules/")({
  loader: async ({ context }) => {
    const user = context.auth.user!;
    return {
      user,
    };
  },
  component: ModulesIndexComponent,
});

const api = getRouteApi("/products/modules/");

function ModulesIndexComponent() {
  const { user } = api.useLoaderData();
  console.log("user: ", user);

  return (
    <div className="p-2">
      <div className="p-2">
        <p>Modules Index</p>
        <ul>
          <li>Module 1</li>
          <li>Module 2</li>
          <li>Module 3</li>
        </ul>
      </div>
    </div>
  );
}
