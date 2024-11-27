const express=require('express')
const router=express.Router();
const product=require("../Controller/product")
const {AdminAuth} = require("../utils/AdminAuth");


router.post("/add",AdminAuth,product.AddProduct)
router.post("/delete/:id",AdminAuth,product.deleteProduct)
router.post("/update/:id",AdminAuth,product.updateProduct)
router.get("/getall",AdminAuth,product.getAllProducts)


router.post("/addSubProd/:id",AdminAuth,product.AddSubProduct)
router.delete("/deleteSubProd/:id/:subId",AdminAuth,product.deleteSubProduct)
router.put("/updateSubProd/:id/:subId",AdminAuth,product.updateSubProduct)
router.get("/getSubProd/:productId",AdminAuth,product.getAllSubProducts)




router.post("/addProdModel/:productId/:subProductId",AdminAuth,product.AddModelToSubProduct)
router.delete("/deleteProdModel/:productId/:subProductId/:model_id",AdminAuth,product.deleteModelFromSubProduct)
router.put("/updateProdModel/:productId/:subProductId/:modelid",AdminAuth,product.updateModelInSubProduct)
router.get("/addProdModel/:productId/:subProductId",AdminAuth,product.getAllModelsInSubProduct)



module.exports=router