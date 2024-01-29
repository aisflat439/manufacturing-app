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
    handleCreatePart,
    register,
    formState: { errors },
  } = usePart();

  return (
    <div className="p-2">
      <h3 className="bg-blue-600">Parts</h3>
      <div>
        <div>
          <p>Create a part</p>
          <form onSubmit={handleCreatePart}>
            <label>
              <Input {...register("name")} />
              {errors.name && <p>{errors.name.message}</p>}
            </label>
            <label>
              <Input {...register("name")} />
              {errors.name && <p>{errors.name.message}</p>}
            </label>
            <label>
              <Input {...register("name")} />
              {errors.name && <p>{errors.name.message}</p>}
            </label>
            <label>
              <Input {...register("name")} />
              {errors.name && <p>{errors.name.message}</p>}
            </label>
            <Button type="submit">Click me</Button>
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
