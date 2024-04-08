import { Outlet, NavLink } from "react-router-dom";
import styles from "./MainLayout.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { authSliceActions } from "../store/authSlice";

const MainLayout = () => {
    const dispatch = useDispatch();

    const auth = useSelector((state) => {
        return state.authSlice.auth;
    });

    useEffect(() => {
        console.log("auth:", auth);
    }, [auth]);

    const postLogout = async () => {
        const response = await fetch("http://localhost:5000/logout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            console.log("Cannot logout!");
        } else {
            const data = await response.json();
            console.log("data from post logout:", data);
            dispatch(authSliceActions.authUpdate(false));
        }
    };

    const logoutHandle = () => {
        try {
            postLogout();
        } catch (err) {
            console.log("err from catch logout:", err);
        }
    };

    return (
        <div>
            <nav>
                <NavLink
                    to="/"
                    className={({ isActive }) => {
                        return isActive ? styles.active : undefined;
                    }}
                    end
                >
                    Shop
                </NavLink>
                <NavLink
                    to="/products"
                    className={({ isActive }) => {
                        return isActive ? styles.active : undefined;
                    }}
                >
                    Products
                </NavLink>
                <NavLink
                    to="/cart"
                    className={({ isActive }) => {
                        return isActive ? styles.active : undefined;
                    }}
                >
                    Cart
                </NavLink>
                <NavLink
                    to="/orders"
                    className={({ isActive }) => {
                        return isActive ? styles.active : undefined;
                    }}
                >
                    Orders
                </NavLink>
                <NavLink
                    to="/add-product"
                    className={({ isActive }) => {
                        return isActive ? styles.active : undefined;
                    }}
                >
                    Add Product
                </NavLink>
                <NavLink
                    to="/admin-products"
                    className={({ isActive }) => {
                        return isActive ? styles.active : undefined;
                    }}
                >
                    Admin Products
                </NavLink>
                {!auth && (
                    <NavLink
                        to="/register"
                        className={({ isActive }) => {
                            return isActive ? styles.active : undefined;
                        }}
                    >
                        Register
                    </NavLink>
                )}
                {!auth && (
                    <NavLink
                        to="/login"
                        className={({ isActive }) => {
                            return isActive ? styles.active : undefined;
                        }}
                    >
                        Login
                    </NavLink>
                )}
                {auth && (
                    <p
                        onClick={logoutHandle}
                        style={{
                            color: "white",
                            fontStyle: "italic",
                            cursor: "pointer",
                        }}
                    >
                        Logout
                    </p>
                )}
            </nav>
            <main>
                <Outlet />
            </main>
        </div>
    );
};

export default MainLayout;
