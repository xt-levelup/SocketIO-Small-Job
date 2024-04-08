import styles from "./AddProductPage.module.css";

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import { formSliceActions } from "../store/formSlice";
import { fetchProducts } from "../store/fetchDataSlice";

const AddProductPage = () => {
    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const title = useSelector((state) => {
        return state.formSlice.title;
    });
    const imageUrl = useSelector((state) => {
        return state.formSlice.imageUrl;
    });
    const price = useSelector((state) => {
        return state.formSlice.price;
    });
    const description = useSelector((state) => {
        return state.formSlice.description;
    });

    const dataServer = useSelector((state) => {
        return state.fetchDataSlice;
    });

    const [titleArr, setTitleArr] = useState([]);

    const [dataServerNew, setDataServerNew] = useState([]);

    const serverUrl = "http://localhost:5000/add-product";

    useEffect(() => {
        dispatch(fetchProducts());
    }, []);
    useEffect(() => {
        console.log("dataServer:", dataServer);
        if (dataServer && dataServer.length > 0 && params.productId) {
            const dataEdit = dataServer.find((data) => {
                return data._id === params.productId;
            });

            dispatch(formSliceActions.titleUpdate(dataEdit.title));
            dispatch(formSliceActions.priceUpdate(dataEdit.price));
            dispatch(formSliceActions.descriptionUpdate(dataEdit.description));
            dispatch(formSliceActions.imageUrlUpdate(dataEdit.imageUrl));
        } else {
            dispatch(formSliceActions.titleUpdate(""));
            dispatch(formSliceActions.priceUpdate(""));
            dispatch(formSliceActions.descriptionUpdate(""));
            dispatch(formSliceActions.imageUrlUpdate(""));
        }
        setDataServerNew(dataServer);
    }, [dataServerNew]);

    useEffect(() => {
        console.log("title:", title);
    }, [title]);

    const titleHandle = (event) => {
        dispatch(formSliceActions.titleUpdate(event.target.value));
    };
    const imageUrlHandle = (event) => {
        dispatch(formSliceActions.imageUrlUpdate(event.target.value));
    };
    const priceHandle = (event) => {
        dispatch(formSliceActions.priceUpdate(event.target.value));
    };
    const descriptionHandle = (event) => {
        dispatch(formSliceActions.descriptionUpdate(event.target.value));
    };

    const submitHandle = async (event) => {
        event.preventDefault();

        if (!params.productId) {
            if (!title || !imageUrl || !price || !description) {
                window.alert("Hãy nhập đủ các trường!");
                return;
            }
            if (parseFloat(price) < 0) {
                window.alert("Giá tiền không âm!");
                return;
            }

            if (titleArr.includes(title)) {
                window.alert("Tên sản phẩm đã tồn tại!");
                return;
            }

            const submitValue = {
                title,
                imageUrl,
                price,
                description,
            };

            const fetchData = await fetch(serverUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: title,
                    imageUrl: imageUrl,
                    price: price,
                    description: description,
                }),
            });

            try {
                if (!fetchData.ok) {
                    throw new Error("Something went wrong!");
                }

                const dataServerUpdate = [...dataServerNew, submitValue];

                setDataServerNew(dataServerUpdate);
            } catch (err) {
                console.log(err);
            }
            dispatch(formSliceActions.titleUpdate(""));
            dispatch(formSliceActions.imageUrlUpdate(""));
            dispatch(formSliceActions.priceUpdate(""));
            dispatch(formSliceActions.descriptionUpdate(""));

            navigate("/");
        } else {
            const fetchData = await fetch(
                "http://localhost:5000/edit-product",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        productId: params.productId,
                        title: title,
                        imageUrl: imageUrl,
                        price: price,
                        description: description,
                    }),
                }
            );

            try {
                if (!fetchData.ok) {
                    throw new Error("Something went wrong!");
                }
            } catch (err) {
                console.log(err);
            }
            dispatch(formSliceActions.titleUpdate(""));
            dispatch(formSliceActions.imageUrlUpdate(""));
            dispatch(formSliceActions.priceUpdate(""));
            dispatch(formSliceActions.descriptionUpdate(""));

            navigate("/");
        }
    };

    return (
        <div>
            <form onSubmit={submitHandle}>
                <div>
                    <label>Title</label>
                    <input
                        type="text"
                        name="title"
                        value={title}
                        onChange={titleHandle}
                    />
                </div>
                <div>
                    <label>Image Url</label>
                    <input
                        type="text"
                        name="imageUrl"
                        value={imageUrl}
                        onChange={imageUrlHandle}
                    />
                </div>
                <div>
                    <label>Price</label>
                    <input
                        type="number"
                        name="price"
                        value={price}
                        onChange={priceHandle}
                    />
                </div>
                <div>
                    <label>Description</label>
                    <textarea
                        type="text"
                        name="description"
                        value={description}
                        onChange={descriptionHandle}
                    />
                </div>
                <button type="submit">
                    {params.productId ? "Update" : "Add Product"}
                </button>
            </form>
        </div>
    );
};

export default AddProductPage;
