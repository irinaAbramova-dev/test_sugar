declare module "next-auth" {
    interface Session {
        id: string,
        accessToken: string;
        refreshToken: string;
        expiresIn: number;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string,
        accessToken: string;
        refreshToken: string;
        expiresIn: number;
    }
}
