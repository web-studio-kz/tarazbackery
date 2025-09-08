const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const YandexStrategy = require('passport-yandex').Strategy;
const { User } = require('../models');

passport.use(
    new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: `${process.env.API_URL}/api/users/google/callback`
    },
    async (accessToken, refreshToken, profile, done) => {
        try {
            const email = profile.emails && profile.emails.length > 0 ? profile.emails[0].value : null;
            if (!email) {
                return done(new Error("Не удалось получить email от Google."), null);
            }

            const existingUser = await User.findOne({ where: { email } });

            if (existingUser) {
                console.log('Existing user found:', existingUser.email);
                return done(null, existingUser);
            } else {
                const newUserProfile = {
                    email: email,
                    name: profile.displayName,
                    isTemporary: true
                };
                console.log('New user profile created:', newUserProfile.email);
                return done(null, newUserProfile);
            }
        } catch (error) {
            console.error("Error in Google Strategy:", error);
            return done(error, null);
        }
    })
);


passport.use(
    new YandexStrategy({
        clientID: process.env.YANDEX_CLIENT_ID,
        clientSecret: process.env.YANDEX_CLIENT_SECRET,
        callbackURL: `${process.env.API_URL}/api/users/yandex/callback`
    },
    async (accessToken, refreshToken, profile, done) => {
        try {
            const email = profile.emails && profile.emails.length > 0 ? profile.emails[0].value : null;
            if (!email) {
                return done(new Error("Не удалось получить email от Яндекса."), null);
            }

            const existingUser = await User.findOne({ where: { email } });

            if (existingUser) {
                console.log('Existing user found:', existingUser.email);
                return done(null, existingUser);
            } else {
                const newUserProfile = {
                    email: email,
                    name: profile.displayName,
                    isTemporary: true
                };
                console.log('New user profile created:', newUserProfile.email);
                return done(null, newUserProfile);
            }
        } catch (error) {
            console.error("Error in Yandex Strategy:", error);
            return done(error, null);
        }
    })
);