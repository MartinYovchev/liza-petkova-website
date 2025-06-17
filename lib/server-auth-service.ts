import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import { ApiResponse, Session } from "../app/admin/types";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "your-secret-key"
);

export class ServerAuthService {
  static async createSession(session: Omit<Session, "id">): Promise<string> {
    const token = await new SignJWT({
      ...session,
      createdAt: session.createdAt.toISOString(),
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("24h")
      .sign(JWT_SECRET);

    return token;
  }

  static async verifySession(token: string): Promise<Session | null> {
    try {
      const { payload } = await jwtVerify(token, JWT_SECRET);

      return {
        ...(payload as Omit<Session, "id" | "createdAt">),
        id: token,
        createdAt: new Date(payload.createdAt as string),
      } as Session;
    } catch (error) {
      console.error("Session verification failed:", error);
      return null;
    }
  }

  static async getSession(): Promise<Session | null> {
    try {
      const cookieStore = await cookies();
      const token = cookieStore.get("session")?.value;

      if (!token) return null;

      return this.verifySession(token);
    } catch (error) {
      console.error("Failed to get session:", error);
      return null;
    }
  }

  static async login(
    email: string,
    password: string
  ): Promise<ApiResponse<Session>> {
    try {
      if (
        email === process.env.ADMIN_EMAIL &&
        password === process.env.ADMIN_PASSWORD
      ) {
        const session: Omit<Session, "id"> = {
          name: "Admin User",
          email,
          role: "admin",
          createdAt: new Date(),
        };

        const token = await this.createSession(session);
        const cookieStore = await cookies();

        cookieStore.set("session", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 60 * 60 * 24, // 24 hours
          path: "/",
        });

        return {
          success: true,
          data: { ...session, id: token },
        };
      }

      return {
        success: false,
        error: "Invalid credentials",
      };
    } catch (error) {
      console.error("Login failed:", error);
      return {
        success: false,
        error: "An unexpected error occurred during login",
      };
    }
  }

  static async logout(): Promise<void> {
    try {
      const cookieStore = await cookies();
      cookieStore.delete("session");
    } catch (error) {
      console.error("Logout failed:", error);
      throw new Error("Failed to logout");
    }
  }
}
