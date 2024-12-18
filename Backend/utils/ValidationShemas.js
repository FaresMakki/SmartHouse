const z = require("zod")
const createUserschema = z.object({
    FirstName: z.string({
        required_error: "FirstName is required",
        invalid_type_error: 'FirstName should be a string'

    }).min(2, "FirstName should be more than 2 character").max(20, "FirstName is too long").regex(/^[a-zA-Z]+$/, "FirstName should contain only letters"),

    LastName: z.string({
        required_error: "LastName is required",
        invalid_type_error: 'LastName should be a string'

    }).min(2, "LastName should be more than 2 character").max(20, "LastName is too long").regex(/^[a-zA-Z]+$/, "LastName should contain only letters"),

    PhoneNum: z.string({
        required_error: "PhoneNum is required",
        invalid_type_error: "PhoneNum should be a string"
    })
        .min(6, "PhoneNum should be at least 6 digits")
        .max(20, "PhoneNum should be at most 20 digits")
        .regex(/^\+\d+$/, "PhoneNum should start with '+' and contain only digits"),

    e_mail: z.string().min(6, {message: "email must be more than 6 caractere"}).max(40, {message: "email must be less than 40 caractere"}).email(),
    Password: z.string().min(6, {message: "Password must be more than 6 caractere"}).max(40, {message: "Password must be less than 40 caractere"})
})
const loginschema = z.object({
    e_mail: z.string().min(6, {message: "email must be more than 6 caractere"}).max(40, {message: "email must be less than 40 caractere"}).email(),
    Password: z.string().min(6, {message: "Password must be more than 6 caractere"}).max(40, {message: "Password must be less than 40 caractere"})

})
const productschema = z.object({
    category: z.string().min(3, {message: "category must be more than 6 caractere"}).max(40, {message: "category must be less than 40 caractere"}),
    description: z.string().min(3, {message: "description must be more than 6 caractere"}).max(40, {message: "description must be less than 40 caractere"})

})


module.exports = {createUserschema, loginschema, productschema};
