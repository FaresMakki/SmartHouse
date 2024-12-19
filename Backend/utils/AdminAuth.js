const jwt = require("jsonwebtoken");
const Admin = require("../Models/admin");
const {verifyTokenS} = require("./VerifyTokenS");

const AdminAuth = async (req, res, next) => {
    try {

        const token = verifyTokenS(req);
        if (!token) return res.status(403).send("Invalid token");

        const admin = await Admin.findOne({ _id: token._id });
        if (!admin) return res.status(403).send("Access denied");

        req.user = admin;
        next();
    } catch (error) {
        console.error(error);
        res.status(403).send("Authorization failed");
    }
};

module.exports = { AdminAuth };
