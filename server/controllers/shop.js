const Product = require("../models/products");
const Order = require("../models/order");

const io=require("../socket");

// exports.getCsrfToken = (req, res, next) => {
//     console.log("req.csrfToken():", req.csrfToken());
//     res.json(req.csrfToken());
// };

exports.getProducts = (req, res, next) => {
    Product.find()
        .then((products) => {
            res.json(products);
        })
        .catch((err) => {
            // console.log(err);
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
};

exports.getProduct = (req, res, next) => {
    const prodId = req.body.productId;

    Product.findById(prodId)
        .then((product) => {
            res.json(product);
        })
        .catch((err) => {
            // console.log(err);
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
};

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;

    Product.findById(prodId)
        .then((product) => {
            return req.user.addToCart(product);
        })
        .then((result) => {
            console.log(result);
            res.status(201).json({
                message: "Add the product to cart successfully!",
            });
        })
        .catch((err) => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
};

exports.getCart = (req, res, next) => {
    req.user
        .populate("cart.items.productId")
        .then((user) => {
            const products = user.cart.items;
            res.json(products);
        })
        .catch((err) => {
            // console.log(err);
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
};

exports.postCartDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;

    req.user
        .removeFromCart(prodId)
        .then((result) => {
            res.status(201).json({
                message: "Removed the item from cart!",
            });
        })
        .catch((err) => {
            // console.log(err);
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
};

exports.postOrder = (req, res, next) => {
    req.user
        .populate("cart.items.productId")
        .then((user) => {
            const products = user.cart.items.map((item) => {
                return {
                    quantity: item.quantity,
                    product: { ...item.productId._doc },
                };
            });
            const order = new Order({
                user: {
                    name: req.user.name,
                    userId: req.user,
                },
                products: products,
            });
            return order.save();
        })
        .then((result) => {
            return req.user.clearCart();
        })
        .then(() => {
            res.status(201).json({
                message: "Order successfully!",
            });
        })
        .catch((err) => {
            // console.log(err);
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
};

exports.getOrders = (req, res, next) => {
    Order.find({ "user.userId": req.user._id })
        .then((orders) => {
            res.json(orders);
        })
        .catch((err) => {
            // console.log(err);
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
};

// exports.getCart = (req, res, next) => {
//     req.user
//         .getCart()
//         .then((products) => {
//             res.json(products);
//         })
//         .catch((err) => {
//             console.log(err);
//         });
// };

// exports.postCart = (req, res, next) => {
//     const prodId = req.body.productId;
//     console.log("prodId:", prodId);

//     Product.findById(prodId)
//         .then((product) => {
//             return req.user.addToCart(product);
//         })
//         .then((result) => {
//             res.status(201).json({
//                 message: "Added to cart!",
//             });
//         });
// };

// exports.postCartDeleteProduct = (req, res, next) => {
//     const prodId = req.body.productId;

//     req.user
//         .deleteItemFromCart(prodId)
//         .then((result) => {
//             res.status(201).json({
//                 message: "Deleted cart item!",
//             });
//         })
//         .catch((err) => {
//             console.log(err);
//         });
// };

// exports.postOrder = (req, res, next) => {
//     req.user
//         .addOrder()
//         .then((result) => {
//             res.status(201).json({
//                 message: "Ordered successfully!",
//             });
//         })
//         .catch((err) => {
//             console.log(err);
//         });
// };

// exports.getOrders = (req, res, next) => {
//     req.user
//         .getOrders()
//         .then((orders) => {
//             res.json(orders);
//         })
//         .catch((err) => {
//             console.log(err);
//         });
// };


exports.createPost=(req,res,next)=>{
    const newPost=req.body.newPost;
    console.log("newPost:",newPost);
    io.getIO().emit("posts",{
        action:"create",
        post:newPost,
    });
    res.status(201).json({
        newPost:newPost,
    });
};