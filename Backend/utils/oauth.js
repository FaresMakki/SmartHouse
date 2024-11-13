const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const usermodel = require('../Models/user'); // Adjust path to your user model

passport.use(new GoogleStrategy({
    clientID:process.env.CLIENTID ,
    clientSecret:process.env.CLIENTSECRET,
    callbackURL: 'http://localhost:3001/user/callback',
}, async (accessToken, refreshToken, profile, done) => {
    try {
        // Check if the user exists in your database
        let user = await usermodel.findOne({ e_mail: profile.emails[0].value });

        // If the user doesn’t exist, create a new one
        if (!user) {

            user = new usermodel({
                FirstName: profile.name.givenName,
                LastName: profile.name.familyName,
                e_mail: profile.emails[0].value,
                PreferredSettings: [],
                Rooms: [],
                PersonalDevices: [],
                isActive: true,
                oauth:true
            });
            await user.save();
        }

        // Pass user to the next step
        return done(null, user);
    } catch (err) {
        return done(err, null);
    }
}));

module.exports = passport;
