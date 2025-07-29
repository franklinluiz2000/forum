// src/auth/interfaces/request-with-user.interface.ts
import { Request } from 'express';

export interface RequestWithUser extends Request {
  user: {
    sub: number; // ou string, conforme seu `user.id` no banco
    email: string;
  };
}
