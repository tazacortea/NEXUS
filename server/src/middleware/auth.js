import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

function getJwtSecret() {
  return process.env.JWT_SECRET || "nexus-local-development-secret-change-me";
}

export function createToken(userId) {
  return jwt.sign({ sub: userId }, getJwtSecret(), { expiresIn: "7d" });
}

export async function requireAuth(req, res, next) {
  try {
    const header = req.headers.authorization || "";
    const token = header.startsWith("Bearer ") ? header.slice(7) : null;
    if (!token) return res.status(401).json({ message: "Authentication is required." });

    const payload = jwt.verify(token, getJwtSecret());
    const user = await User.findById(payload.sub);
    if (!user) return res.status(401).json({ message: "This account no longer exists." });

    req.user = user;
    next();
  } catch {
    return res.status(401).json({ message: "Your session is invalid or has expired. Please sign in again." });
  }
}
