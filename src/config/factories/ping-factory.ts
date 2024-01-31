import { PingController } from '@/api/controllers/ping-controller';

export class PingFacotry {

  static _pingControllerInstance: PingController;

  static get pingController() {
    if (!this._pingControllerInstance) {
      this._pingControllerInstance = new PingController();
    }
    return this._pingControllerInstance;
  }

}
