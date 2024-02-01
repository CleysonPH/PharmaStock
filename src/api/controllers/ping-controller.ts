import { type Request, type Response } from 'express';

export class PingController {
  static ping (_: Request, res: Response): void {
    res.json({ message: 'pong' });
  }
}
