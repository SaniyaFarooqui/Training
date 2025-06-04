// middleware/isAuthenticated.ts
import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Extend Express.Request to include `user`
declare global {
  namespace Express {
    interface Request {
      user: { id: string; email: string };
    }
  }
}

const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Authorization header missing" });
  }

  const [scheme, token] = authHeader.split(" ");

  if (scheme !== "Bearer" || !token) {
    return res.status(401).json({ error: "Invalid authorization format" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;

    // Optionally: Use Prisma to fetch full user
    const user = await prisma.users.findUnique({
      where: { id: decoded.id },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Attach user info to the request
    req.user = { id: user.id, email: user.email };

    next();
  } catch (err: any) {
    console.error(err);
    return res.status(401).json({ error: "Token is invalid or expired" });
  }
};

export default isAuthenticated;
