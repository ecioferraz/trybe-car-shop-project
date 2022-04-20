import App from './app';
import CustomRouter from './routes/Router';

import CarController from './controllers/CarController';
import MotorcycleController from './controllers/MotorcycleController';

import { Car } from './interfaces/CarInterface';
import { Motorcycle } from './interfaces/MotorcycleInterface';

const server = new App();

const carController = new CarController();
const motorcycleController = new MotorcycleController();

const carRouter = new CustomRouter<Car>();
carRouter.addRoute(carController);

const motorcycleRouter = new CustomRouter<Motorcycle>();
motorcycleRouter.addRoute(motorcycleController);

server.addRouter(carRouter.router);
server.addRouter(motorcycleRouter.router);

export default server;
