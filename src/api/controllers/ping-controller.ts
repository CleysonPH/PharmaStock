import { type Request, type Response } from 'express';

export class PingController {
  ping (_: Request, res: Response): void {
    res.json({ message: 'pong' });
  }
}
