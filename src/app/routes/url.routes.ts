import { Router } from "express";
import UrlController from "../controllers/url.controller";


const router: Router = Router();

router.post("/short-url", UrlController.shortUrl);
router.get("/get-short-url", UrlController.getAllShortUrl);

export default router;