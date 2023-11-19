// Layout Types
import { DefaultLayout } from "./layouts";

// Route Views

import BlogPosts from "./views/BlogPosts";

export default [
  {
    path: "/",
    exact: true,
    layout: DefaultLayout,
    component: BlogPosts
  }
];
