const {verifyTokenS} = require("./VerifyTokenS");
const User = require("../Models/user");

const UserAuth = async (req, res, next) => {
    try {
        const token = verifyTokenS(req);

        if (!token) return res.status(403).send("Invalid token");

        const user = await User.findOne({ _id: token._id });

        if (!user) return res.status(403).send("Access denied");

        req.user = user;
        next();
    } catch (error) {
        console.error(error);
        res.status(403).send("Authorization failed");
    }
};

module.exports = { UserAuth };