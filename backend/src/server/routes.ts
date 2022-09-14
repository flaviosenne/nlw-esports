import { Router } from "express";
import { AdsController } from '../controllers/ads.controller';
import { GameController } from "../controllers/game.controller";

const routes = Router()

const gamesController = new GameController()
const adsController = new AdsController()

routes.get('/games', gamesController.store.bind(gamesController))


routes.get('/games/:gameId/ads', adsController.getByGame.bind(adsController))
routes.post('/games/:gameId/ads', adsController.create.bind(adsController))

routes.get('/games/ads/:id/discord', adsController.getDiscrod.bind(adsController))

export { routes }