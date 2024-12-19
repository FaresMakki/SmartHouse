const express=require('express')
const router=express.Router();
const product=require("../Controller/product")
const {AdminAuth} = require("../utils/AdminAuth");


router.post("/add",product.AddProduct)
router.post("/delete/:id",product.deleteProduct)
router.post("/update/:id",product.updateProduct)
router.get("/getall",product.getAllProducts)
router.get("/getalldata",product.getAllData)


router.post("/addSubProd/:id",product.AddSubProduct)
router.post("/deleteSubProd/:id/:subId",product.deleteSubProduct)
router.post("/updateSubProd/:id/:subId",product.updateSubProduct)
router.get("/getSubProd/:productId",product.getAllSubProducts)




router.post("/addProdModel/:productId/:subProductId",product.AddModelToSubProduct)
router.post("/deleteProdModel/:productId/:subProductId/:model_id",product.deleteModelFromSubProduct)
router.post("/updateProdModel/:productId/:subProductId/:modelid",AdminAuth,product.updateModelInSubProduct)
router.get("/getProdModel/:productId/:subProductId",product.getAllModelsInSubProduct)



module.exports=router