import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  index("routes/login.tsx"),
  layout("layouts/dashboard.tsx", [route("chapter", "routes/chapter.tsx")]),
] satisfies RouteConfig;
