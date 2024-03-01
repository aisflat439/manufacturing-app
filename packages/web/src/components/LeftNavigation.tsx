import { Link } from "@tanstack/react-router";

export const LeftNavigation = () => {
  return (
    <div className="p-2 flex gap-2 flex-col bg-red-200">
      <Link to="/" className="[&.active]:font-bold">
        Home
      </Link>{" "}
      <Link to="/about" className="[&.active]:font-bold">
        About
      </Link>
      <Link to="/products" className="[&.active]:font-bold">
        Products
      </Link>
      <Link to="/hands" className="[&.active]:font-bold">
        Hands
      </Link>
    </div>
  );
};
