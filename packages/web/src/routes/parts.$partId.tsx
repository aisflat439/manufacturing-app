import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/parts/$partId")({
  component: PartComponent,
});

function PartComponent() {
  return (
    <div className="p-2">
      <h3 className="bg-blue-600">I am a part</h3>
    </div>
  );
}
