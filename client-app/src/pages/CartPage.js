import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
    const [dataServer, setDataServer] = useState(null);
    const navigate = useNavigate();

    const fetchData = async () => {
        const response = await fetch("http://localhost:5000/get-cart");
        if (!response.ok) {
            console.log("Cannot fetch carts!");
        } else {
            const data = await response.json();
            setDataServer(data);
        }
    };

    const postOrder = async () => {
        const response = await fetch("http://localhost:5000/create-order", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            console.log("Cannot order!");
        } else {
            const data = await response.json();
            console.log("data:", data);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const orderHandle = () => {
        postOrder();
        navigate("/orders");
    };

    useEffect(() => {
        console.log("dataServer:", dataServer);
    }, [dataServer]);

    return (
        <div>
            {dataServer && dataServer.length > 0 && (
                <ul>
                    {dataServer.map((item) => {
                        return (
                            <li key={item.productId._id}>
                                <h3>{item.productId.title}</h3>
                                <p>Quantity: {item.quantity}</p>
                                <p>
                                    Total:{" "}
                                    {parseFloat(item.quantity) *
                                        parseFloat(item.productId.price)}
                                    $
                                </p>
                            </li>
                        );
                    })}
                    <div>
                        <button onClick={orderHandle}>Order Now!</button>
                        <button>Delete</button>
                    </div>
                </ul>
            )}
            {!dataServer || (!dataServer.length && <p>Cart is emty now!</p>)}
        </div>
    );
};

export default CartPage;
