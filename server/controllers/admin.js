const Product = require("../models/products");
const User = require("../models/user");

exports.addProduct = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;

    const product = new Product({
        title: title,
        price: price,
        description: description,
        imageUrl: imageUrl,
        userId: req.user,
    });

    product
        .save()
        .then((result) => {
            console.log("Created Product!");
            res.status(201).json({
                message: "Create product successfullyy!",
            });
        })
        .catch((err) => {
            // console.log(err);
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
};

exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedDescription = req.body.description;
    const updatedImageUrl = req.body.imageUrl;

    // console.log("prodId:", prodId);
    // console.log("updatedTitle:", updatedTitle);
    // console.log("updatedPrice:", updatedPrice);
    // console.log("updatedDescription:", updatedDescription);
    // console.log("updatedImageUrl:", updatedImageUrl);

    Product.findById(prodId)
        .then((product) => {
            product.title = updatedTitle;
            product.price = updatedPrice;
            product.description = updatedDescription;
            product.imageUrl = updatedImageUrl;
            return product.save();
        })
        .then((result) => {
            console.log("Updated the product!");
            res.status(201).json({
                message: "Updated the product!",
            });
        })
        .catch((err) => {
            // console.log(err);
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
};

exports.getProducts = (req, res, next) => {
    Product.find()
        .then((products) => {
            // console.log("products:", products);
            res.json(products);
        })
        .catch((err) => {
            // console.log(err);
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
};

exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;

    Product.findByIdAndDelete(prodId)
        .then((result) => {
            res.status(201).json({
                message: "Deleted!",
            });
        })
        .catch((err) => {
            // console.log(err);
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
};
