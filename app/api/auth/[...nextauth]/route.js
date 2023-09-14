import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google'
import GithubProvider from 'next-auth/providers/github'
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDB } from '@utils/database'
import User from '@models/user'

async function refreshAccessToken(token) {
    try {
        const url =
            'https://oauth2.googleapis.com/token?' +
            new URLSearchParams({
                client_id: process.env.GOOGLE_CLIENT_ID,
                client_secret: process.env.GOOGLE_CLIENT_SECRET,
                grant_type: 'refresh_token',
                refresh_token: token.refreshToken?token.refreshToken:""
            })

        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: 'POST'
        })

        const refreshedTokens = await response.json()

        if (!response.ok) {
            throw refreshedTokens
        }

        return {
            ...token,
            accessToken: refreshedTokens.access_token,
            accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
            refreshToken: refreshedTokens.refresh_token ?? token.refreshToken // Fall back to old refresh token
        }
    } catch (error) {
        console.log(error)

        return {
            ...token,
            error: 'RefreshAccessTokenError'
        }
    }
}

const handler = NextAuth({
    session: {
        strategy: 'jwt',
        maxAge: 2 * 24*60*60
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET
        }),
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        }),
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Credentials",
            credentials: {
                username: { label: "Email", type: "email", name: "email" },
                password: { label: "Password", type: "password", name:"password" }
            },
            async authorize(credentials, req) {
                
                const user= {};
                if (user) {
                    // Any object returned will be saved in `user` property of the JWT
                    return user
                } else {
                    return null
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user, account }) {
            console.log("JWT user & token " + JSON.stringify(user))
            console.log("JWT  token " + JSON.stringify(token))
            console.log("JWT Account " + JSON.stringify(account))
            // Initial sign in
            if (account && user) {
                return {
                    accessToken: account.access_token,
                    accessTokenExpires: Date.now() + account.expires_in * 1000,
                    refreshToken: account.refresh_token,
                    user
                }
            }

            // Return previous token if the access token has not expired yet
            if (token.accessTokenExpires && Date.now() < token.accessTokenExpires) {
                return token
            }

            // Access token has expired, try to update it
            return refreshAccessToken(token)
        },
        async session({ session }) {
            // const sessionUser = await User.findOne({ email: session.user.email });
            // session.user.id = sessionUser._id.toString();
            session.user = token.user
            session.accessToken = token.accessToken
            session.error = token.error
            console.log("Session: " + JSON.stringify(session))
            return session;
        },
        async signIn({ user, account, profile, credentials }) {
            try {
                await connectToDB();
                if(user===null || user===undefined) return false;
                console.log("user: "+JSON.stringify(user))
                console.log("Account : "+JSON.stringify(account));
                console.log("Profile: "+JSON.stringify(profile))
                console.log("Email: "+JSON.stringify(email))
                console.log("credentials: "+JSON.stringify(credentials))

                if(account.type === "credentials") {
                    return true;
                }

                const userExists = await User.findOne({
                    email: profile.email
                });

                console.log("is exists: "+userExists);

                if (!userExists) {
                    // await User.create({
                    //     image: profile.picture,
                    //     email: profile.email,
                    //     username: profile.name.replaceAll(" ", "").toLowerCase(),
                    // })
                }
                return true

            } catch (err) {
                console.log("Error while signin: " + JSON.stringify(err));
                return false;
            }
        }
    }

})

export { handler as GET, handler as POST }
