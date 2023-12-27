import { lazy } from "react"

const Login = lazy(() => import("@/pages/login"))
const Home = lazy(() => import("@/pages/App"))
const Scratchpad = lazy(() => import("@/pages/scratchpad"))
const Notes = lazy(() => import("@/pages/notes"))
const Favorites = lazy(() => import("@/pages/favorites"))
const Trash = lazy(() => import("@/pages/trash"))

const routes = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    element: <Home />,
    children: [
      {
        path: "/",
        element: <Scratchpad />,
      },
      {
        path: "/notes",
        element: <Notes />,
      },
      {
        path: "/favorites",
        element: <Favorites />,
      },
      {
        path: "/trash",
        element: <Trash />,
      },
      {
        path: "*",
        element: <div>404 not Found</div>,
      },
    ],
  },
]

export default routes
