import React, { Children, lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import Loading from "../component/Loading";

const Page = lazy(() => import("../page/index"));
const Ex1 = lazy(() => import("../page/exam1"));
const Ex2 = lazy(() => import("../page/exam2"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<Loading />}>
        <Page />
      </Suspense>
    ),
  },
  {
    path: "/one",
    element: (
      <Suspense fallback={<Loading />}>
        <Ex1 />
      </Suspense>
    ),
  },
  {
    path: "/two",
    element: (
      <Suspense fallback={<Loading />}>
        <Ex2 />
      </Suspense>
    ),
  },
]);

export default router;
