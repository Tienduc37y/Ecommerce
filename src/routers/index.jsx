import { createBrowserRouter } from "react-router-dom";
import { lazy } from 'react';
const BaseLayout = lazy(()=> import("@/components/Layout/BaseLayout"));
const Home = lazy(()=> import("@/pages/Home"));
const Category = lazy(()=> import("@/pages/Category"));
const ProductDetail = lazy(()=> import("@/components/Product/ProductDetail"));
const Cart = lazy(()=> import('@/pages/Cart'));
const Login = lazy(()=> import('@/pages/Login'));
const Register = lazy(()=> import('@/pages/Register'));
const Checkout = lazy(()=> import('@/pages/Checkout'));
const OrderDetail = lazy(()=> import("@/pages/Order/OrderDetail"));
const OrderList = lazy(()=> import("@/pages/Order/OrderList"));
const PrivateRouter = lazy(()=> import("@/components/PrivateRouter"));

const router = createBrowserRouter([{
    path: '/',
    element: <BaseLayout></BaseLayout>,
    children: [
        {path: '/', element: <Home/>},
        {path: '/danh-muc/:category', element: <Category/>},
        {path: '/tim', element: <Category/>},
        {path: '/sanpham/:slug', element: <ProductDetail/>},
        {path: '/giohang', element: <Cart/>},
        {path: '/thanhtoan', element: <PrivateRouter><Checkout/></PrivateRouter>},
        {path: '/dang-nhap', element: <Login/>},
        {path: '/dang-ky', element: <Register/>},
        {path: '/danh-sach-don-hang', element: <PrivateRouter><OrderList/></PrivateRouter>},
        {path: '/don-hang/:id', element: <PrivateRouter><OrderDetail/></PrivateRouter>}
    ]
}])

export default router