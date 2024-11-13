const express=require('express')
const router=express.Router();
const product=require("../Controller/product")
const {AdminAuth} = require("../utils/AdminAuth");


router.post("/add",AdminAuth,product.AddProduct)
router.post("/addSubProd/:id",AdminAuth,product.AddSubProduct)
router.post("/addProdModel/:productId/:subProductId",AdminAuth,product.AddModelToSubProduct)


module.exports=router