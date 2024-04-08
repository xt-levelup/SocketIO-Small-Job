import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../store/fetchDataSlice";
import { useNavigate } from "react-router-dom";

const AdminProductPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const dataServer = useSelector((state) => {
        return state.fetchDataSlice;
    });

    useEffect(() => {
        dispatch(fetchProducts());
    }, []);

    useEffect(() => {
        console.log("dataServer:", dataServer);
    }, [dataServer]);

    const postEdit = async (productId) => {
        const response = await fetch("http://localhost:5000/edit-product", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                productId: productId,
            }),
        });
        if (!response.ok) {
            console.log("Cannot post edit product!");
        } else {
            const data = await response.json();
            console.log("data post edit:", data);
        }
    };
    const postDelete = async (productId) => {
        const response = await fetch("http://localhost:5000/delete-product", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                productId: productId,
            }),
        });
        if (!response.ok) {
            console.log("Cannot delete edit product!");
        } else {
            const data = await response.json();
            console.log("data delete edit:", data);
        }
    };

    const editHandle = (productId) => {
        postEdit(productId);
        navigate(`/add-product/${productId}`);
    };

    const deleteHandle = (productId) => {
        postDelete(productId);
        navigate("/");
    };

    return (
        <div>
            {dataServer && dataServer.length > 0 && (
                <ul>
                    {dataServer.map((product) => {
                        return (
                            <li key={product._id}>
                                <h3>{product.title}</h3>
                                <p>Image: {product.imageUrl}</p>
                                <p>{product.price}</p>
                                <p>{product.description}</p>
                                <div>
                                    <button
                                        onClick={() => {
                                            editHandle(product._id);
                                        }}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => {
                                            deleteHandle(product._id);
                                        }}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            )}
            {!dataServer || (!dataServer.length && <p>No product found!</p>)}
        </div>
    );
};

export default AdminProductPage;
