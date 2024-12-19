const express=require('express')
const router=express.Router();
const product=require("../Controller/product")
const {AdminAuth} = require("../utils/AdminAuth");


router.post("/add",AdminAuth,product.AddProduct)
router.post("/delete/:id",AdminAuth,product.deleteProduct)
router.post("/update/:id",AdminAuth,product.updateProduct)
router.get("/getall",product.getAllProducts)
router.get("/getalldata",product.getAllData)


router.post("/addSubProd/:id",AdminAuth,product.AddSubProduct)
router.post("/deleteSubProd/:id/:subId",AdminAuth,product.deleteSubProduct)
router.post("/updateSubProd/:id/:subId",AdminAuth,product.updateSubProduct)
router.get("/getSubProd/:productId",product.getAllSubProducts)




router.post("/addProdModel/:productId/:subProductId",AdminAuth,product.AddModelToSubProduct)
router.post("/deleteProdModel/:productId/:subProductId/:model_id",AdminAuth,product.deleteModelFromSubProduct)
router.post("/updateProdModel/:productId/:subProductId/:modelid",AdminAuth,product.updateModelInSubProduct)
router.get("/getProdModel/:productId/:subProductId",product.getAllModelsInSubProduct)



module.exports=router