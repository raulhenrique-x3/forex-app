import { Router } from "express";
import UserController from "../controllers/UserController";
import { USD_TO_GBP, GBP_TO_USD } from "../controllers/ApiController";
import ExchangeController from "../controllers/ExchangeController";
import SearchUserController from "../controllers/SearchUserController";
import SessionController from "../controllers/SessionController";
import WalletControler from "../controllers/WalletControler";
import HistoryController from "../controllers/HistoryController";
import { USD_GBP_HISTORY, GBP_USD_HISTORY } from "../controllers/ApiHistoryController";

const routes = Router();

routes.post("/register", UserController.create);
routes.post("/session/", SessionController.create);
routes.get("/home/:id", SearchUserController.create);
routes.get("/api/usd_to_gbp", USD_TO_GBP.create);
routes.get("/api/gbp_to_usd", GBP_TO_USD.create);
routes.get("/api/history/usd_to_gbp", USD_GBP_HISTORY.create);
routes.get("/api/history/gbp_to_usd", GBP_USD_HISTORY.create);
routes.put("/session/:id", WalletControler.create);
routes.put("/exchange/:id", ExchangeController.create);
routes.put("/history/:id", HistoryController.create);

export default routes;
