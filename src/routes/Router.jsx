import { createBrowserRouter } from "react-router-dom";

import App from "../App";
import Home from "../pages/Home";
import ProductDetails from "../pages/ProductDetails";
import Contact from "../components/Contact";
import AboutUs from "../components/AboutUs";
import Cart from "../pages/cart";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "product/:id",
        element: <ProductDetails />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "about",
        element: <AboutUs />,
      },
      {
        path: "cart",
        element: <Cart />,
      },

    ],
  },
]);