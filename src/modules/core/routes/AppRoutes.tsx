import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "../components/AppLayout";
import Home from "../../home/Home";
import Favorites from "../../favorites/Favorites";
import Details from "../../details/Details";
import Error from "../common/components/app-error/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/favorites",
        element: <Favorites />,
      },
      {
        path: "/details/:id",
        element: <Details />,
      },
      {
        path: "/error",
        element: <Error />,
      },
    ],
  },
]);

const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
