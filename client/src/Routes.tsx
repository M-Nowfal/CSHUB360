import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { Suspense, lazy } from "react";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { BouncingLoader } from "./components/ui/loader";

// Load the component lazy
const HomeLayout = lazy(() => import("./layouts/HomeLayout"));
const Home = lazy(() => import("./pages/Home"));
const Courses = lazy(() => import("./pages/Courses"));
const GetStart = lazy(() => import("./pages/GetStart"));
const LearnMore = lazy(() => import("./pages/LearnMore"));
const Testimonials = lazy(() => import("./pages/Testimonials"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));

const fallback = (
  <div className="flex justify-center items-center h-screen">
    <BouncingLoader />
  </div>
);

const ErrorWrapper = () => (
  <ErrorBoundary>
    <Suspense fallback={fallback}>
      <Outlet />
    </Suspense>
  </ErrorBoundary>
);

const Routes = () => {
  const routes = createBrowserRouter([
    {
      element: <ErrorWrapper />,
      children: [
        {
          path: "/",
          element: (
            <Suspense fallback={fallback}>
              <HomeLayout />
            </Suspense>
          ),
          children: [
            { index: true, element: <Home /> },
            { path: "courses", element: <Courses /> },
            { path: "getstart", element: <GetStart /> },
            { path: "learnmore", element: <LearnMore /> },
            { path: "reviews", element: <Testimonials /> },
          ],
        },
        { path: "*", element: <PageNotFound /> },
      ],
    },
  ]);

  return <RouterProvider router={routes} />;
};

export default Routes;
