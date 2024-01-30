import { FileRoute, Outlet } from "@tanstack/react-router";
import { toast } from "react-toastify";
import { usePart } from "../hooks/parts";
import { Button } from "../components/Button";
import { Input } from "../components/Input";

export const Route = new FileRoute('/parts').createRoute({
  component: PartsRoute,
});

function PartsRoute() {
  const {
    register,
    formState: { errors },
    handleCreatePart,
  } = usePart();

  return (
    <div className="p-2">
      <h3 className="bg-blue-600">Parts</h3>
      <div>
        <div>
          <p>Create or import a part</p>
          <form onSubmit={handleCreatePart}>
            <div className="flex flex-col gap-2">
              <label>
                <Input {...register("partId")} placeholder="Part ID" />
                {errors.partId && <span>{errors.partId.message}</span>}
                <Button
                  modification="text"
                  variant="action"
                  onClick={(e) => {
                    e.preventDefault();
                    toast("Make when I get the API key");
                  }}
                >
                  Import part
                </Button>
              </label>
              <label>
                <Input {...register("name")} placeholder="Part Name" />
                {errors.name && <p>{errors.name.message}</p>}
              </label>
              <label>
                <Input
                  {...register("price", { valueAsNumber: true })}
                  placeholder="Price"
                  type="number"
                  step={0.01}
                />
                {errors.price && <p>{errors.price.message}</p>}
              </label>
              <label>
                <select
                  {...register("packSize")}
                  className="p-2 mx-2 border-2 border-black rounded focus:outline-purple-400"
                >
                  {["each", "pack"].map((packSize) => {
                    return (
                      <option key={packSize} value={packSize}>
                        {packSize}
                      </option>
                    );
                  })}
                </select>
              </label>
              <label>
                <Input {...register("quantity")} placeholder="Quantity" />
                {errors.quantity && <p>{errors.quantity.message}</p>}
              </label>
            </div>
            <Button type="submit">Create a Part</Button>
          </form>
        </div>

        <div>
          <Button
            type="button"
            variant="create"
            modification="outlined"
            onClick={() => toast("I haven't made this yet")}
          >
            Upload some parts
          </Button>
        </div>
      </div>
      <Outlet />
    </div>
  );
}
