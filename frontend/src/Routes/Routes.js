import { Routes, Route } from 'react-router-dom'
import Login from '../Components/User/Login';
import Register from '../Components/User/Register';
import ProtectedRoute from './ProtectedRoute';
import UpdateProfile from '../Components/User/UpdateProfile';
import UpdatePassword from '../Components/User/UpdatePassword';
import ForgotPassword from '../Components/User/ForgotPassword';
import ResetPassword from '../Components/User/ResetPassword';
import Account from '../Components/User/Account';
import Home from '../Components/Home/Home';
import ProductDetails from '../Components/ProductDetails/ProductDetails';
import Products from '../Components/Products/Products';
import Cart from '../Components/Cart/Cart';
import Shipping from '../Components/Cart/Shipping';
import OrderConfirm from '../Components/Cart/OrderConfirm';
import Payment from '../Components/Cart/Payment';
import OrderStatus from '../Components/Cart/OrderStatus';
import OrderSuccess from '../Components/Cart/OrderSuccess';
import MyOrders from '../Components/Order/MyOrders';
import OrderDetails from '../Components/Order/OrderDetails';
import Dashboard from '../Components/Admin/Dashboard';
import MainData from '../Components/Admin/MainData';
import OrderTable from '../Components/Admin/OrderTable';
import UpdateOrder from '../Components/Admin/UpdateOrder';
import ProductTable from '../Components/Admin/ProductTable';
import NewProduct from '../Components/Admin/NewProduct';
import UpdateProduct from '../Components/Admin/UpdateProduct';
import UserTable from '../Components/Admin/UserTable';
import UpdateUser from '../Components/Admin/UpdateUser';
import ReviewsTable from '../Components/Admin/ReviewsTable';
import Wishlist from '../Components/Wishlist/Wishlist';
import NotFound from '../Components/NotFound';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:keyword" element={<Products />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/shipping" element={<ProtectedRoute><Shipping /></ProtectedRoute>} />
            <Route path="/order/confirm" element={<ProtectedRoute><OrderConfirm /></ProtectedRoute>} />
            <Route path="/process/payment" element={<ProtectedRoute><Payment /></ProtectedRoute>} />
            <Route path="/orders/success" element={<OrderSuccess success={true} />} />
            <Route path="/orders/failed" element={<OrderSuccess success={false} />} />
            <Route path="/order/:id" element={<ProtectedRoute><OrderStatus /></ProtectedRoute>} />
            <Route path="/orders" element={<ProtectedRoute><MyOrders /></ProtectedRoute>} />
            <Route path="/order_details/:id" element={<ProtectedRoute><OrderDetails /></ProtectedRoute>} />
            <Route path="/account" element={<ProtectedRoute><Account /></ProtectedRoute>} />
            <Route path="/account/update" element={<ProtectedRoute><UpdateProfile /></ProtectedRoute>} />
            <Route path="/password/update" element={<ProtectedRoute><UpdatePassword /></ProtectedRoute>} />
            <Route path="/password/forgot" element={<ForgotPassword />} />
            <Route path="/password/reset/:token" element={<ResetPassword />} />
            <Route path="/wishlist" element={<ProtectedRoute><Wishlist /></ProtectedRoute>} />
            <Route path="/admin/dashboard" element={<ProtectedRoute isAdmin={true}><Dashboard activeTab={0}><MainData /></Dashboard></ProtectedRoute>} />
            <Route path="/admin/orders" element={<ProtectedRoute isAdmin={true}><Dashboard activeTab={1}><OrderTable /></Dashboard></ProtectedRoute>} />
            <Route path="/admin/order/:id" element={<ProtectedRoute isAdmin={true}><Dashboard activeTab={1}><UpdateOrder /></Dashboard></ProtectedRoute>} />
            <Route path="/admin/products" element={<ProtectedRoute isAdmin={true}><Dashboard activeTab={2}><ProductTable /></Dashboard></ProtectedRoute>} />
            <Route path="/admin/new_product" element={<ProtectedRoute isAdmin={true}><Dashboard activeTab={3}><NewProduct /></Dashboard></ProtectedRoute>} />
            <Route path="/admin/product/:id" element={<ProtectedRoute isAdmin={true}><Dashboard activeTab={2}><UpdateProduct /></Dashboard></ProtectedRoute>} />
            <Route path="/admin/users" element={<ProtectedRoute isAdmin={true}><Dashboard activeTab={4}><UserTable /></Dashboard></ProtectedRoute>} />
            <Route path="/admin/user/:id" element={<ProtectedRoute isAdmin={true}><Dashboard activeTab={4}><UpdateUser /></Dashboard></ProtectedRoute>} />
            <Route path="/admin/reviews" element={<ProtectedRoute isAdmin={true}><Dashboard activeTab={5}><ReviewsTable /></Dashboard></ProtectedRoute>} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default AppRoutes;
