import type { NextAuthConfig } from "next-auth";
import NextAuth from "next-auth";

export const authConfig = {
    pages: {
        signIn: '/login',
    },
    providers: [

    ], //menambahkan provider dengan array kosong untuk sekarang
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
            if (isOnDashboard) {
                if (isLoggedIn) return true;
                return false; //Redirect ke Unautenticated user untuk masuk ke page login
            } else if (isLoggedIn) {
                return Response.redirect(new URL('/dashboard', nextUrl));
            }
            return true;
        },
    },
} satisfies NextAuthConfig;