import styles from "./LoginPage.module.css";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authSliceActions } from "../store/authSlice";

const LoginPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const emailRef = useRef();
    const passwordRef = useRef();

    // const [csrfToken, setCsrfToken] = useState(null);

    const [errorMessage, setErrorMessage] = useState(null);

    const errorDisplay = (
        <p style={{ textAlign: "center", margin: "3em 0" }}>{errorMessage}</p>
    );

    const loginPost = async () => {
        const response = await fetch("http://localhost:5000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: emailRef.current.value,
                password: passwordRef.current.value,
            }),
        });
        const data = await response.json();
        if (!response.ok) {
            dispatch(authSliceActions.authUpdate(false));
            setErrorMessage(data ? data.message : "Something went wrong!");
            // throw new Error(data ? data.message : "Something went wrong!");
        } else {
            console.log("loginPost OK!:", data);

            dispatch(authSliceActions.authUpdate(true));
            setErrorMessage(null);

            navigate("/");
        }
    };

    const loginHandle = async (event) => {
        try {
            event.preventDefault();
            loginPost();
        } catch (err) {
            console.log("Error catch loginHandle:", err);
            setErrorMessage(err);
        }
    };

    useEffect(() => {
        console.log("errorMessage:", errorMessage);
    }, [errorMessage]);

    return (
        <div className={styles.contain}>
            {errorMessage && errorDisplay}
            <form>
                <div>
                    <label>Email</label>
                    <input ref={emailRef} type="email" name="email" />
                </div>
                <div>
                    <label>Password</label>
                    <input ref={passwordRef} type="password" name="password" />
                </div>

                <button type="submit" name="login-submit" onClick={loginHandle}>
                    Login
                </button>
            </form>
        </div>
    );
};

export default LoginPage;
