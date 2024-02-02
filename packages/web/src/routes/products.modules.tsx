import { createFileRoute, Link, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/products/modules")({
  component: PartsRoute,
});

function PartsRoute() {
  return (
    <div className="p-2">
      <h3 className="bg-blue-600">Modules</h3>
      <p>modules are made up of parts</p>
      <div>
        <Outlet />
        <div>
          <div>
            <Link
              activeOptions={{ exact: true }}
              to="/products/modules/create"
              activeProps={{
                style: {
                  display: "none",
                },
              }}
            >
              Create a module
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
