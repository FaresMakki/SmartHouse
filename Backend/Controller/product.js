const {productschema} = require("../utils/ValidationShemas");
const prodschema = require("../Models/produit");

const { ObjectId } = require('mongodb');


exports.AddSubProduct=async (req,res)=> {
    try{
        let product=await prodschema.findOne({_id:req.params.id})

        if (!product) return res.status(404).send("Product not found");

        const subProductExists = product.subDevices.some(sub => sub.name === req.body.name);

        if (subProductExists) {
            return res.status(400).json({ message: "Sub-product already exists" });
        }

        const subProd = {
            name:req.body.name,
            models: [],
            picture:req.body.picture,
            description:req.body.description,
            settings:req.body.settings
        };
        product.subDevices.push(subProd);
        await product.save();
        const subprod = product.subDevices[product.subDevices.length - 1];


        res.status(200).json({message:"Subproduct added successfully",subprod});

    } catch (err) {
        res.status(400).json({ err });
    }
}
exports.deleteSubProduct = async (req, res) => {
    try {
        console.log(req.params)
        let product = await prodschema.findOne({ _id: req.params.id });

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        const subProductIndex = product.subDevices.findIndex(sub => sub._id.toString() === req.params.subId);

        if (subProductIndex === -1) {
            return res.status(404).json({ message: "Sub-product not found" });
        }

        product.subDevices.splice(subProductIndex, 1);

        await product.save();

        res.status(200).json({ message: "Sub-product deleted successfully" });
    } catch (err) {
        res.status(400).json({ err: err.message });
    }
};
exports.updateSubProduct = async (req, res) => {
    try {
        console.log(req.params)
        let product = await prodschema.findOne({ _id: req.params.id });

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        const subProduct = product.subDevices.find(sub => sub._id.toString() === req.params.subId);

        if (!subProduct) {
            return res.status(404).json({ message: "Sub-product not found" });
        }

        if (req.body.name) subProduct.name = req.body.name;
        if (req.body.picture) subProduct.picture = req.body.picture;
        if (req.body.settings) subProduct.settings = req.body.settings;

        await product.save();

        res.status(200).json({ message: "Sub-product updated successfully", subProduct });
    } catch (err) {
        res.status(400).json({ err: err.message });
    }
};
exports.getAllSubProducts = async (req, res) => {
    try {


        const product = await prodschema.aggregate([
            { $match: { _id: new ObjectId(req.params.productId) } },
            {
                $project: {
                    subDevices: {
                        $map: {
                            input: "$subDevices",
                            as: "subDevice",
                            in: {
                                _id: "$$subDevice._id",
                                name: "$$subDevice.name",
                                picture: "$$subDevice.picture",
                                createdAt: "$$subDevice.createdAt",
                            }
                        }
                    }
                }
            },
            { $limit: 1 }
        ]);



        if(product.length===0){
            return res.status(404).json({ message: "no sub product for this product" });

        }

        res.status(200).json(
            product[0]
        );
    } catch (err) {
        res.status(400).json({ err: err.message });
    }
};


exports.AddModelToSubProduct = async (req, res) => {
    try {
        const newModel = {
            modelName: req.body.modelName,
            modelDetails: req.body.modelDetails,
            picture: req.body.modelpicture,
        };

        const result = await prodschema.updateOne(
            {
                _id: req.params.productId,
                "subDevices._id": req.params.subProductId,
                "subDevices.models.modelName": { $ne: newModel.modelName }
            },
            {
                $push: { "subDevices.$[subProduct].models": newModel }
            },
            {
                arrayFilters: [{ "subProduct._id": req.params.subProductId }]
            }
        );

        if (result.modifiedCount === 0) {
            return res.status(400).json({ message: "Model already exists or sub-product not found." });
        }

        res.status(200).json({ message: "Model added successfully" });
    } catch (err) {
        res.status(400).json({ err });
    }
};
exports.deleteModelFromSubProduct = async (req, res) => {
    try {
        const result = await prodschema.updateOne(
            {
                _id: req.params.productId,
                "subDevices._id": req.params.subProductId
            },
            {
                $pull: { "subDevices.$[subProduct].models": { _id: req.params.model_id } }
            },
            {
                arrayFilters: [{ "subProduct._id": req.params.subProductId }]
            }
        );

        if (result.modifiedCount === 0) {
            return res.status(400).json({ message: "Model not found or sub-product not found." });
        }

        res.status(200).json({ message: "Model deleted successfully" });
    } catch (err) {
        res.status(400).json({ err: err.message });
    }
};
exports.updateModelInSubProduct = async (req, res) => {
    try {
        const { modelName, modelDetails, modelpicture } = req.body;

        const updateFields = {};
        if (modelName) updateFields["subDevices.$[subProduct].models.$[model].modelName"] = modelName;
        if (modelDetails) updateFields["subDevices.$[subProduct].models.$[model].modelDetails"] = modelDetails;
        if (modelpicture) updateFields["subDevices.$[subProduct].models.$[model].picture"] = modelpicture;

        if (Object.keys(updateFields).length === 0) {
            return res.status(400).json({ message: "No valid attributes provided for update." });
        }

        const result = await prodschema.updateOne(
            {
                _id: req.params.productId,
                "subDevices._id": req.params.subProductId,
                "subDevices.models._id": req.params.modelid
            },
            {
                $set: updateFields
            },
            {
                arrayFilters: [
                    { "subProduct._id": req.params.subProductId },
                    { "model._id": req.params.modelid }
                ]
            }
        );

        if (result.modifiedCount === 0) {
            return res.status(400).json({ message: "Model not found or sub-product not found." });
        }

        res.status(200).json({ message: "Model updated successfully" });
    } catch (err) {
        res.status(400).json({ err: err.message });
    }
};
exports.getAllModelsInSubProduct = async (req, res) => {
    try {
        const product = await prodschema.findOne(
            {
                _id: req.params.productId,
                "subDevices._id": req.params.subProductId
            },
            { "subDevices.$": 1 }
        );

        if (!product || !product.subDevices || product.subDevices.length === 0) {
            return res.status(404).json({ message: "Product or sub-product not found." });
        }

        const models = product.subDevices[0].models;

        res.status(200).json({
            message: "Models retrieved successfully",
            models
        });
    } catch (err) {
        res.status(400).json({ err: err.message });
    }
};



exports.AddProduct=async (req,res)=> {
    try{

        const model = {
            category:req.body.category,
            description:req.body.description,
            subDevices:[]

        };



        const validation=productschema.safeParse(model)

        if (!validation.success){
            return res.status(400).json({message:validation.error.errors[0].message});

        }


        const prod = new prodschema(model);
        const savedprod = await prod.save();
        res.status(200).json({message:"product added successfully",product:savedprod});

    } catch (err) {
        res.status(400).json({ err });
    }
}
exports.deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;

        const deletedProduct = await prodschema.findByIdAndDelete(productId);

        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ message: "Product deleted successfully", product: deletedProduct });
    } catch (err) {
        res.status(400).json({ err });
    }
};
exports.updateProduct = async (req, res) => {
    try {
        const productId = req.params.id;

        let product = await prodschema.findById(productId);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        if (req.body.category) {
            product.category = req.body.category;
        }
        if (req.body.description) {
            product.description = req.body.description;
        }

        await product.save();

        res.status(200).json({
            message: 'Product updated successfully',
        });
    } catch (err) {
        res.status(400).json({ err: err.message });
    }
};
exports.getAllProducts = async (req, res) => {
    try {
        const products = await prodschema.find({}, { subDevices: 0 });

        if (products.length === 0) {
            return res.status(404).json({ message: "No products found." });
        }

        res.status(200).json({
            message: "[id] retrieved successfully",
            products
        });
    } catch (err) {
        res.status(400).json({ err: err.message });
    }
};
exports.getAllData = async (req, res) => {
    try {
        const products = await prodschema.find();

        if (products.length === 0) {
            return res.status(404).json({ message: "No products found." });
        }

        res.status(200).json({
            message: "[id] retrieved successfully",
            products
        });
    } catch (err) {
        res.status(400).json({ err: err.message });
    }
};

