import "next-auth";
import "next-auth/jwt";

import { Role, SessionUser } from "@/types/user";

declare module "next-auth" {
    interface User extends SessionUser {
        emailVerified: Date | null;
    }
    
    interface Session {
        user: User;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        user: User;
    }
}
