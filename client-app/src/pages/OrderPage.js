import { useEffect, useState } from "react";

const OrderPage = () => {
    const [dataServer, setDataServer] = useState(null);

    const fetchData = async () => {
        const response = await fetch("http://localhost:5000/get-orders");
        if (!response.ok) {
            console.log("Cannot get orders!");
        } else {
            const data = await response.json();
            console.log("data:", data);
            if (data) {
                setDataServer(data);
            }
        }
    };

    useEffect(() => {
        try {
            fetchData();
        } catch (err) {
            console.log(err);
        }
    }, []);

    useEffect(() => {
        console.log("dataServer:", dataServer);
    }, [dataServer]);

    return (
        <div>
            {dataServer && dataServer.length > 0 && (
                <ul>
                    <h2>Customer: {dataServer[0].user.name}</h2>
                    {dataServer.map((data) => {
                        return data.products.map((product) => {
                            return (
                                <li key={product.product._id}>
                                    <h3>{product.product.title}</h3>
                                    <p>Quantity:{product.quantity}</p>
                                </li>
                            );
                        });
                    })}
                </ul>
            )}
        </div>
    );
};

export default OrderPage;
