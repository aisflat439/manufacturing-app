import { createFileRoute, getRouteApi, Link } from "@tanstack/react-router";
import { apiUtils, trpc } from "../utils/trpc";
import React from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";

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

  const handleRemove = (location: number) => {
    setModuleParts((prev) => {
      return prev.toSpliced(location, 1);
    });
  };

  const handleSave = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log("e: ", e.currentTarget.id);
    e.preventDefault();
    // await api.createModule.mutation({
    //   parts: moduleParts,
    // });
  };

  return (
    <div className="p-2">
      <div>
        <form action="" className="flex justify-between">
          <label>
            <Input type="text" placeholder="Module Name" />
          </label>
          {Boolean(moduleParts.length) && (
            <div>
              <Button id="save-one" variant="create" onClick={handleSave}>
                Save
              </Button>
              <Button
                id="save-and-create"
                variant="create"
                modification="outlined"
                onClick={handleSave}
              >
                Save and create variant
              </Button>
            </div>
          )}
        </form>
      </div>
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
                <div className="flex justify-between">
                  <Link
                    to={`/products/parts/$partId`}
                    params={{
                      partId: part.partId,
                    }}
                  >
                    {part.name}
                  </Link>
                  <Button
                    modification="text"
                    variant="action"
                    onClick={() =>
                      setModuleParts([...moduleParts, part.partId])
                    }
                  >
                    +
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
        <div
          onDrop={handleOnDrop}
          onDragOver={handleOnDragOver}
          className="border border-green-200 col-span-3"
        >
          {moduleParts.map((part, index) => {
            return (
              <div
                key={part + index}
                className="border p-2 bg-gray-50 flex justify-between"
              >
                <p>{part}</p>
                <Button
                  variant="delete"
                  modification="text"
                  onClick={() => handleRemove(index)}
                >
                  Remove
                </Button>
              </div>
            );
          })}
          {Boolean(!moduleParts.length) && <span>drop zone</span>}
        </div>
      </div>
    </div>
  );
}
