import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

const authUser = (request, accessToken, refreshToken, profile, done) => {
    return done(null, profile)
}

const StrategyImplementation = new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/api/login/google/callback",
    passReqToCallback: true
}, async (request, accessToken, refreshToken, profile, done) => {
    return done(null, profile);
});

export { StrategyImplementation };
