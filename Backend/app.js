require('./Connections')
const express = require('express')
const app = express()
const port = 3001
const User_Router=require("./Routes/user")
const Admin_Router=require("./Routes/admin")
const Product_Router=require("./Routes/product")
const cookieParser = require('cookie-parser');
const passport = require('./utils/oauth');  // Ensure oauth.js is correctly imported

app.use(passport.initialize());


app.use(cookieParser());

app.use(express.json());

app.use("/user",User_Router)
app.use("/admin",Admin_Router)
app.use("/product",Product_Router)




app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})



