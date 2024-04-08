import {
    createBrowserRouter,
    RouterProvider,
    Navigate,
} from "react-router-dom";
import { lazy, Suspense } from "react";

import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";

const ShopPage = lazy(() => {
    return import("./pages/ShopPage.js");
});
const ProductPage = lazy(() => {
    return import("./pages/ProductPage.js");
});
const CartPage = lazy(() => {
    return import("./pages/CartPage.js");
});
const OrderPage = lazy(() => {
    return import("./pages/OrderPage.js");
});
const AddProductPage = lazy(() => {
    return import("./pages/AddProductPage.js");
});
const AdminProductPage = lazy(() => {
    return import("./pages/AdminProductPage.js");
});
const MainLayout = lazy(() => {
    return import("./layout/MainLayout.js");
});
const ErrorPage = lazy(() => {
    return import("./pages/ErrorPage.js");
});

function App() {
    const loading = <p style={{ textAlign: "center" }}>Page is loading...</p>;
    const router = createBrowserRouter([
        {
            path: "/",
            errorElement: (
                <Suspense fallback={loading}>
                    <ErrorPage />
                </Suspense>
            ),
            element: (
                <Suspense fallback={loading}>
                    <MainLayout />
                </Suspense>
            ),
            children: [
                {
                    index: true,
                    element: (
                        <Suspense fallback={loading}>
                            <ShopPage />
                        </Suspense>
                    ),
                },
                {
                    path: "products",
                    element: (
                        <Suspense fallback={loading}>
                            <ProductPage />
                        </Suspense>
                    ),
                },
                {
                    path: "cart",
                    element: (
                        <Suspense fallback={loading}>
                            <CartPage />
                        </Suspense>
                    ),
                },
                {
                    path: "orders",
                    element: (
                        <Suspense fallback={loading}>
                            <OrderPage />
                        </Suspense>
                    ),
                },
                {
                    path: "add-product",
                    element: (
                        <Suspense fallback={loading}>
                            <AddProductPage />
                        </Suspense>
                    ),
                },
                {
                    path: "add-product/:productId",
                    element: (
                        <Suspense fallback={loading}>
                            <AddProductPage />
                        </Suspense>
                    ),
                },
                {
                    path: "admin-products",
                    element: (
                        <Suspense fallback={loading}>
                            <AdminProductPage />
                        </Suspense>
                    ),
                },
                {
                    path: "register",
                    element: <RegisterPage />,
                },
                {
                    path: "login",
                    element: <LoginPage />,
                },
                {
                    path: "*",
                    element: <Navigate to="/" />,
                },
            ],
        },
    ]);

    return <RouterProvider router={router} />;
}

export default App;
