import styles from "./RegisterPage.module.css";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
    const navigate = useNavigate();

    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();

    const [errorMessage, setErrorMessage] = useState(null);

    const errorDisplay = (
        <p style={{ textAlign: "center", margin: "3em 0" }}>{errorMessage}</p>
    );

    const postRegister = async () => {
        const response = await fetch("http://localhost:5000/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: emailRef.current.value,
                password: passwordRef.current.value,
                confirmPassword: confirmPasswordRef.current.value,
            }),
        });
        const data = await response.json();
        if (!response.ok) {
            setErrorMessage(data ? data.message : "Something went wrong!");
        } else {
            console.log("Data from postRegister:", data);
            setErrorMessage(null);
            navigate("/login");
        }
    };

    const registerHandle = (event) => {
        event.preventDefault();
        try {
            postRegister();
        } catch (err) {
            console.log("Error from postRegister:", err);
            setErrorMessage(err);
        }
    };

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
                <div>
                    <label>Confirm Password</label>
                    <input
                        ref={confirmPasswordRef}
                        type="password"
                        name="confirm-password"
                    />
                </div>
                <button type="submit" name="submit" onClick={registerHandle}>
                    Register
                </button>
            </form>
        </div>
    );
};

export default RegisterPage;
