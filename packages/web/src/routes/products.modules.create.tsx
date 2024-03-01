import { createFileRoute, getRouteApi, Link } from "@tanstack/react-router";
import { apiUtils, RouterInputs, trpc } from "../utils/trpc";
import React from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";

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

type TCreateModule = RouterInputs["createModule"];

type FormValues = {
  part: {
    name: string;
    partId: string;
  }[];
};

const useModules = () => {
  const createModule = trpc.createModule.useMutation({
    onSuccess: () => {
      reset();
    },
    onError: (error) => {
      console.log("error: ", error);
    },
  });

  const { register, handleSubmit, reset, formState, control } =
    useForm<FormValues>();
  const { fields, append, remove, insert } = useFieldArray({
    name: "part",
    control,
  });

  const hcm: SubmitHandler<Omit<TCreateModule, "moduleId">> = (data) => {
    createModule.mutate(data);
  };
  return {
    handleCreateModule: handleSubmit(hcm),
    register,
    formState,
    fields,
    append,
    remove,
    insert,
  };
};

function CreateModuleRoute() {
  const { user, res: serverPartsData } = api.useLoaderData();
  const { data: partsData } = trpc.read.useQuery(user, {
    initialData: serverPartsData,
  });
  const {
    handleCreateModule,
    register,
    formState,
    fields,
    append,
    remove,
    insert,
  } = useModules();
  const [moduleParts, setModuleParts] = React.useState<string[]>([]);

  const handleOnDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    id: string,
    name: string
  ) => {
    e.dataTransfer.setData("partId", id);
    e.dataTransfer.setData("name", name);
  };

  const handleOnDrop = (e: React.DragEvent<HTMLDivElement>) => {
    const droppedParts = e.currentTarget.parentNode?.children[1];
    console.log("droppedParts: ", droppedParts);
    // const matching = Array.from(droppedParts?.children).map((child) => {
    //   return child.textContent;
    // }

    const partId = e.dataTransfer.getData("partId");
    const name = e.dataTransfer.getData("name");
    insert(0, { name, partId });
  };

  const handleOnDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div className="p-2">
      <form className="flex justify-between">
        <div>
          <label>
            <Input
              // {...register("name")}
              type="text"
              placeholder="Module Name"
            />
          </label>
          {Boolean(moduleParts.length) && (
            <div>
              <Button id="save-one" variant="create" onClick={() => ({})}>
                Save
              </Button>
              <Button
                id="save-and-create"
                variant="create"
                modification="outlined"
                onClick={handleCreateModule}
              >
                Save and create variant
              </Button>
            </div>
          )}
        </div>
        <div className="grid grid-cols-4">
          <div>
            {partsData.data.map((part) => {
              return (
                <div
                  className="border p-2 bg-gray-50"
                  draggable
                  onDragStart={(e) =>
                    handleOnDragStart(e, part.partId, part.name)
                  }
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
                      onClick={(e) => {
                        console.log("e: ", e);
                        e.preventDefault();
                        append({
                          name: part.name,
                          partId: part.partId,
                        });
                      }}
                    >
                      +
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
          <div
            onDragOver={handleOnDragOver}
            className="border border-green-200 col-span-3"
            onDrop={handleOnDrop}
          >
            {fields.map((part, index) => {
              return (
                <div
                  key={part.id}
                  {...register(`part.${index}`)}
                  className="border p-2 bg-gray-50 flex justify-between"
                >
                  <p>{part.name}</p>
                  <Button
                    variant="delete"
                    modification="text"
                    onClick={() => remove(index)}
                  >
                    Remove
                  </Button>
                </div>
              );
            })}
            {Boolean(!moduleParts.length) && <span>drop zone</span>}
          </div>
        </div>
      </form>
    </div>
  );
}
