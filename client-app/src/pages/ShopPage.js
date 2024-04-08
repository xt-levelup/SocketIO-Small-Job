import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect,useState } from "react";
import openSocket from "socket.io-client";

import { fetchProducts } from "../store/fetchDataSlice";

import styles from "./ShopPage.module.css";

const ShopPage = () => {
    const dataServer = useSelector((state) => {
        return state.fetchDataSlice;
    });

    const [newPost,setNewPost]=useState('');
    const [newSocketPost,setNewSocketPost]=useState('');
    const [postFromServer,setPostFromServer]=useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    useEffect(() => {
        console.log(dataServer);
    }, [dataServer]);

    const createPost=async ()=>{
        const response=await fetch("http://localhost:5000/create-post",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                newPost:newPost,
            }),
        });
        if(!response.ok){
            console.log("Cannot response from server!");
        }
        const data=await response.json();
        console.log("Post From Server:",data);
        setPostFromServer(data.newPost);
        const socket=openSocket("http://localhost:5000/");
        socket.on("posts",(data)=>{
            console.log("data from socket.on:",data);
            if(data.action==="create"){
                console.log("data from socket data.newPost:",data.post);
                setNewSocketPost(data.post);
            }
        });
    };

    const newPostHandle=(event)=>{
        event.preventDefault();
        setNewPost(event.target.value);
    };

    const getCsrfToken = async () => {
        const response = await fetch("http://localhost:5000/getCsrfToken");
        const data = await response.json();
        if (!response.ok) {
            console.log("cannot get getCsrfToken");
        } else {
            console.log("getCsrfToken data:", data);
            return data;
        }
    };

    useEffect(() => {
        console.log(
            getCsrfToken()
                .then((result) => {
                    console.log("data:", result);
                })
                .catch((err) => {
                    console.log(err);
                })
        );
    }, []);

    const fetchPostToCart = async (productId) => {
        const response = await fetch("http://localhost:5000/post-cart", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                productId: productId,
            }),
        });
        if (!response.ok) {
            console.log("Cannot post to cart!");
        } else {
            const data = await response.json();
            console.log("data post to cart:", data);
        }
    };

    const addToCartHandle = (productId) => {
        fetchPostToCart(productId);
        navigate("/cart");
    };

    useEffect(()=>{
        console.log("newPost:",newPost);
    },[newPost]);

    useEffect(()=>{
        console.log("postFromServer:",postFromServer);
        openSocket("http://localhost:5000/");
    },[postFromServer]);

    useEffect(()=>{
        console.log("newSocketPost:",newSocketPost);
    },[newSocketPost]);


    //--------------------------------------------------------------
    // Đặt socket.on trong useEffect rỗng [] để luôn lắng nghe thay 
    // đổi từ socket từ server như ở đây là io.getIO() từ server
    useEffect(()=>{
        const socket=openSocket("http://localhost:5000/");
        socket.on("posts",(data)=>{
            console.log("data from socket.on:",data);
            if(data.action==="create"){
                console.log("data from socket data.newPost:",data.post);
                setNewSocketPost(data.post);
            }
        });
    },[]);
    //--------------------------------------------------------------


    return (
        <div>
            <ul className={styles.ul}>
                {dataServer.map((item) => {
                    return (
                        <li className={styles.li}>
                            <div>
                                <h3>{item.title}</h3>
                                <img src={item.imageUrl} />
                                <h3>{parseInt(item.price)}$</h3>
                                <p>{item.description}</p>
                                <button
                                    onClick={() => {
                                        addToCartHandle(item._id);
                                    }}
                                >
                                    Add to cart
                                </button>
                            </div>
                        </li>
                    );
                })}
            </ul>
            <form>
                <input type="text" value={newPost} onChange={newPostHandle}/>
                <button type="button" onClick={createPost}>Add Post</button>
            </form>
            <p> Post from server: {postFromServer}</p>
            <p>New Socket Post: {newSocketPost}</p>
        </div>
    );
};

export default ShopPage;
