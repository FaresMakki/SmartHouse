const {productschema} = require("../utils/ValidationShemas");
const prodschema = require("../Models/produit");


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
            picture:req.body.picture
        };
        product.subDevices.push(subProd);
        await product.save();

        res.status(200).json({message:"Subproduct added successfully"});

    } catch (err) {
        res.status(400).json({ err });
    }
}
exports.AddModelToSubProduct = async (req, res) => {
    try {
        const newModel = {
            modelName: req.body.modelName,
            modelDetails: req.body.modelDetails,
            modelpicture: req.body.picture
        };

        // Find and update the specific sub-product within the product if model is not already present
        const result = await prodschema.updateOne(
            {
                _id: req.params.productId,
                "subDevices._id": req.params.subProductId,
                "subDevices.models.modelName": { $ne: newModel.modelName } // Check model uniqueness
            },
            {
                $push: { "subDevices.$[subProduct].models": newModel } // Add the model to the specific sub-product
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

