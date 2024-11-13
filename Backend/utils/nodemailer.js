const nodemailer=require("nodemailer")

const transport=nodemailer.createTransport({
    service:"Gmail",
    auth: {
        user: "faresmakki121@gmail.com",
        pass: "zuqmfshnaimlkjbr"
    }
})
module.exports.sendConfirmationEmail=(Email,activationcode,id)=>{
    transport.sendMail({

        from: "faresmakki121@gmail.com",
        to: Email,
        subject: "EmailConfirmation",
        html:`<h1>Email de confirmation</h1>
              <h2>bonjour</h2>
              <p>pour activer votre compte veuiller cliquer sur ce lien</p>
              <a href="http://localhost:3001/confirmation/${activationcode}/${id}">Cliquer ici !</a>
`

    })
}