import { Suspense } from "react"
import { RouterProvider } from "react-router-dom"

import "normalize.css/normalize.css"
import { Spin } from "antd"
import ReactDOM from "react-dom/client"

import router from "./router"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)

root.render(
  <Suspense fallback={<Spin spinning delay={5000} fullscreen />}>
    <RouterProvider router={router} />
  </Suspense>,
)
