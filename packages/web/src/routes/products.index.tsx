import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/products/")({
  component: ProductsIndexComponent,
});

function ProductsIndexComponent() {
  return (
    <div className="p-2">
      <div className="p-2">Welcome to the products!</div>
    </div>
  );
}
