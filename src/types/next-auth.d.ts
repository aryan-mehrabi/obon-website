import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";

import { User } from "./index";

declare module "next-auth" {
  interface User {
    id: string;
  }
  interface Session {
    user: User;
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    user: User;
  }
}
