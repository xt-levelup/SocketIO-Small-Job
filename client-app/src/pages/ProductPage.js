import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { fetchProducts } from "../store/fetchDataSlice";

import styles from "./ProductPage.module.css";

const ProductPage = () => {
    const dataServer = useSelector((status) => {
        return status.fetchDataSlice;
    });
    const dispatch = useDispatch();

    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchProducts());
    }, []);

    useEffect(() => {
        console.log("dataServer:", dataServer);
    }, [dataServer]);

    const addToCartHandle = async (idProduct) => {
        const urlServer = "http://localhost:5000/post-cart";
        const fetchData = await fetch(urlServer, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                productId: idProduct,
            }),
        });
        if (!fetchData.ok) {
            throw new Error("Cannot Post IdProduct!");
        }
        const data = await fetchData.json();
        console.log("data postIdProduct:", data);
        navigate("/cart");
    };

    return (
        <div>
            <ul className={styles.ul}>
                {dataServer.map((product) => {
                    return (
                        <li key={product.id} className={styles.li}>
                            <h3>{product.title}</h3>
                            <img src={product.imageUrl} />
                            <h3>{product.price}$</h3>
                            <p>{product.description}</p>
                            <div>
                                <button>Details</button>
                                <button
                                    onClick={() => addToCartHandle(product._id)}
                                >
                                    Add To Cart
                                </button>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default ProductPage;
