import { createFileRoute, Link, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/products")({
  component: ProductsDashboard,
});

function ProductsDashboard() {
  return (
    <div className="flex flex-col w-full">
      <div className="flex items-center border-b">
        <h2 className="text-xl p-2">Products Dashboard</h2>
      </div>
      <div className="flex flex-wrap divide-x">
        {(
          [
            ["/products", "Products", true],
            ["/products/modules", "Modules"],
            ["/products/parts", "Parts"],
          ] as const
        ).map(([to, label, exact]) => {
          return (
            <Link
              key={to}
              to={to}
              activeOptions={{ exact }}
              activeProps={{ className: `font-bold` }}
              className="p-2"
            >
              {label}
            </Link>
          );
        })}
      </div>
      <hr />
      <Outlet />
    </div>
  );
}
