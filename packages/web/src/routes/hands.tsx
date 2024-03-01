import {
  createFileRoute,
  getRouteApi,
  Outlet,
  useNavigate,
} from "@tanstack/react-router";
import { Button } from "../components/Button";

const fetchPresignedUrl = async () => {
  const res = await fetch(
    import.meta.env.VITE_API_URL + "/hands/presigned-url"
  );
  const data = await res.json();
  return data;
};

export const Route = createFileRoute("/hands")({
  component: ProductsDashboard,
  loader: async () => {
    const res = await fetchPresignedUrl();
    console.log("res: ", res);
    return {
      url: res.url,
    };
  },
});

const api = getRouteApi("/hands");

const uploadToS3 = async (url: string, file) => {
  const res = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": file.type,
      "Content-Disposition": `attachment; filename="${file.name}"`,
    },
    body: file,
  });
  return res;
};

function ProductsDashboard() {
  const { url } = api.useLoaderData();
  const navigate = useNavigate();

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const res = await uploadToS3(url, file);
    navigate({ to: "/" });
  };

  return (
    <div className="flex flex-col w-full">
      <div className="flex items-center border-b">
        <h2 className="text-xl p-2">Hands Dashboard</h2>
      </div>
      {/* Create upload to s3 button that selects from file system */}
      <Button as="input" onClick={handleFileUpload}>
        Upload to S3
      </Button>
      <hr />
      <Outlet />
    </div>
  );
}
