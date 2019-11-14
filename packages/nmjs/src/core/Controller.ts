import { LifeCycle } from './LifeCrycle';

export class Controller implements LifeCycle {}
(Controller.prototype as any).isController = {};
