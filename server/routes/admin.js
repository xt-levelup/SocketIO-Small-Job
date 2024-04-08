const express = require("express");

const adminControllers = require("../controllers/admin");

const router = express.Router();

router.get("/get-products", adminControllers.getProducts);

router.post("/add-product", adminControllers.addProduct);

router.post("/edit-product", adminControllers.postEditProduct);

router.post("/delete-product", adminControllers.postDeleteProduct);

module.exports = router;
