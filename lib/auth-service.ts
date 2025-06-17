import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import { ApiResponse, Session } from "../app/admin/types";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "your-secret-key"
);

export class AuthService {
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

      // Convert the ISO string back to Date and add the token as id
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
      const response = await fetch("/api/auth/session");
      if (!response.ok) return null;
      return response.json();
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
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      return response.json();
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
      await fetch("/api/auth/logout", {
        method: "POST",
      });
    } catch (error) {
      console.error("Logout failed:", error);
      throw new Error("Failed to logout");
    }
  }
}
