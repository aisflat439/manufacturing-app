import { Outlet, redirect, rootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { TAuthContext } from "../providers/auth";
import { z } from "zod";
import { Header } from "../components/Header";
import { LeftNavigation } from "../components/LeftNavigation";

type RouterContext = {
  auth: TAuthContext;
  search: {
    redirect?: string;
    token?: string;
  };
};

const searchSchema = z.object({
  redirect: z.string().catch("/"),
  token: z.string().catch(""),
});

export const Route = rootRouteWithContext<RouterContext>()({
  validateSearch: searchSchema,
  beforeLoad: ({ context, location, search }) => {
    if (!context.auth.isAuth && !location.pathname.includes("login")) {
      throw redirect({
        to: "/login",
        search: { redirect: location.href, token: search.token },
      });
    }
  },
  component: () => (
    <div>
      <Header />
      <div className="flex min-h-screen">
        <LeftNavigation />
        <hr />
        <Outlet />
      </div>
      <TanStackRouterDevtools />
    </div>
  ),
});
