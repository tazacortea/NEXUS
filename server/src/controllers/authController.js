import bcrypt from "bcryptjs";
import { User } from "../models/User.js";
import { createToken } from "../middleware/auth.js";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function publicUser(user) {
  return { id: user._id, name: user.name, email: user.email, profile: user.profile, createdAt: user.createdAt };
}

export async function register(req, res, next) {
  try {
    const { name, email, password } = req.body;
    if (!name?.trim() || !emailPattern.test(email || "") || typeof password !== "string" || password.length < 6) {
      return res.status(400).json({ message: "Use a name, a valid email, and a password of at least 6 characters." });
    }
    const existing = await User.findOne({ email: email.toLowerCase().trim() });
    if (existing) return res.status(409).json({ message: "An account with this email already exists." });

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({ name: name.trim(), email: email.toLowerCase().trim(), password: hashedPassword });
    return res.status(201).json({ token: createToken(user._id.toString()), user: publicUser(user) });
  } catch (error) {
    next(error);
  }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email?.toLowerCase().trim() }).select("+password");
    if (!user || !(await bcrypt.compare(password || "", user.password))) {
      return res.status(401).json({ message: "Email or password is incorrect." });
    }
    return res.json({ token: createToken(user._id.toString()), user: publicUser(user) });
  } catch (error) {
    next(error);
  }
}

export function me(req, res) {
  return res.json({ user: publicUser(req.user) });
}
