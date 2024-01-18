import { FileRoute } from "@tanstack/react-router";
import { Button } from "../components/Button";

export const Route = new FileRoute('/').createRoute({
  component: HomeComponent,
});

function HomeComponent() {
  const url = `${import.meta.env.VITE_API_URL}/auth/google/authorize`;

  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>
      <>
        <div className="container">
          <h2>SST Example</h2>
          <div>
            <a href={url} rel="noreferrer">
              <Button variant="select" modification="outlined">
                Sign in with Google
              </Button>
            </a>
          </div>
        </div>
      </>
    </div>
  );
}
