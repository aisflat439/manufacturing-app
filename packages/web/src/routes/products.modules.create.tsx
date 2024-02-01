import { createFileRoute, getRouteApi, Link } from "@tanstack/react-router";
import { apiUtils, trpc } from "../utils/trpc";
import React from "react";
import { set } from "zod";

export const Route = createFileRoute("/products/modules/create")({
  loader: async ({ context }) => {
    const user = context.auth.user!;
    const res = await apiUtils.read.ensureData(user);
    return {
      res,
      user,
    };
  },
  component: CreateModuleRoute,
});

const api = getRouteApi("/products/modules/create");

function CreateModuleRoute() {
  const { user, res: serverPartsData } = api.useLoaderData();
  const { data: partsData } = trpc.read.useQuery(user, {
    initialData: serverPartsData,
  });

  const [moduleParts, setModuleParts] = React.useState<string[]>([]);

  const handleOnDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    id: string
  ) => {
    e.dataTransfer.setData("partId", id);
  };

  const handleOnDrop = (e: React.DragEvent<HTMLDivElement>) => {
    const partId = e.dataTransfer.getData("partId");
    setModuleParts((prev) => {
      return [...prev, partId];
    });
  };

  const handleOnDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div className="p-2">
      <div className="grid grid-cols-4">
        <div>
          {partsData.data.map((part) => {
            return (
              <div
                className="border p-2 bg-gray-50"
                draggable
                onDragStart={(e) => handleOnDragStart(e, part.partId)}
                key={part.partId + part.name}
              >
                <p>
                  <Link to={part.partId}>{part.name}</Link>
                </p>
              </div>
            );
          })}
        </div>
        <div
          onDrop={handleOnDrop}
          onDragOver={handleOnDragOver}
          className="border border-green-200 col-span-3"
        >
          {moduleParts.map((part) => {
            return (
              <div key={part} className="border p-2 bg-gray-50">
                <p>{part}</p>
              </div>
            );
          })}
          {Boolean(!moduleParts.length) && <span>drop zone</span>}
        </div>
      </div>
    </div>
  );
}
