import {
    createBrowserRouter,
  } from "react-router-dom";
import MainLayout from "../Layout/MainLayout/MainLayout";
import Home from "../Pages/Home/Home";
import Product from "../Pages/Product/Product";
import ProductDetails from "../Pages/ProductDetails/ProductDetails";
import Cart from "../Pages/Cart/Cart";
import ConfirmOrder from "../Pages/ConfirmOrder/ConfirmOrder";
import SuccessOrder from "../Pages/SuccessOrder/SuccessOrder";
import ProductManagement from "../Pages/ProductManagement/ProductManagement";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";



  const Routes = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      errorElement:<ErrorPage></ErrorPage>,
      children:[
        {
            path:"/",
            element:<Home></Home>
        },
        {
            path:"/product",
            element:<Product></Product>
        },
        {
            path:"/productDetails/:id",
            element:<ProductDetails></ProductDetails>
        },
        {
            path:"/cart",
            element:<Cart></Cart>
        },
        {
            path:"/confirmOrder",
            element:<ConfirmOrder></ConfirmOrder>
        },
        {
            path:"/successOrder",
            element:<SuccessOrder></SuccessOrder>
        },
        {
            path:"/productManagement",
            element:<ProductManagement></ProductManagement>
        }
      ]



    },
  ]);

export default Routes;