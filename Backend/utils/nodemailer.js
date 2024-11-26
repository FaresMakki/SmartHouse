const nodemailer=require("nodemailer")

const transport=nodemailer.createTransport({
    service:"Gmail",
    auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PASSWORD,
    }
})
module.exports.sendConfirmationEmail = (Email, activationcode, id) => {
    const confirmationUrl = `${process.env.FRONTEND_URL}/auth/confirmation/${activationcode}/${id}`;

    transport.sendMail({
        from: process.env.EMAIL_USER,
        to: Email,
        subject: "Email Confirmation",
        html: `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Email Confirmation</title>
            </head>
            <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
                    <tr>
                        <td style="padding: 40px 30px;">
                            <h1 style="color: #333333; font-size: 28px; margin-bottom: 20px;">Email Confirmation</h1>
                            <h2 style="color: #666666; font-size: 18px; margin-bottom: 20px;">Heya,</h2>
                            <p style="color: #666666; font-size: 16px; line-height: 1.5; margin-bottom: 20px;">Thank you for signing up for Homely. To activate your account and start managing your smart home, please click the button below:</p>
                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                <tr>
                                    <td align="center">
                                        <a href="${confirmationUrl}" style="display: inline-block; padding: 14px 30px; background-color: #FF8C00; color: #ffffff; text-decoration: none; font-weight: bold; font-size: 16px; border-radius: 200px;">Activate my account</a>
                                    </td>
                                </tr>
                            </table>
                            <p style="color: #666666; font-size: 14px; line-height: 1.5; margin-top: 30px;">If you did not create an account on Homely please ignore this email.</p>
                        </td>
                    </tr>
                    <tr>
                        <td bgcolor="#f4f4f4" style="padding: 30px;">
                            <p style="color: #888888; font-size: 12px; text-align: center; margin: 0;">© 2024 Homely. All rights reserved.</p>
                        </td>
                    </tr>
                </table>
            </body>
            </html>
        `
    })
        .then(() => console.log("Email sent successfully"))
        .catch((error) => console.error("Error sending email:", error));
};