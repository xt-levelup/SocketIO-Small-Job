const express = require("express");

const router = express.Router();

const shopControllers = require("../controllers/shop");

// router.get("/getCsrfToken", shopControllers.getCsrfToken);

router.get("/get-products", shopControllers.getProducts);

router.get("/get-cart", shopControllers.getCart);

router.post("/post-cart", shopControllers.postCart);

router.post("/cart-delete-item", shopControllers.postCartDeleteProduct);

router.post("/create-order", shopControllers.postOrder);

router.get("/get-orders", shopControllers.getOrders);

router.post("/create-post",shopControllers.createPost);

module.exports = router;
