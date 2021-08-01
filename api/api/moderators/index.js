import { Router } from "express";
import { authUser, show } from "./controller";

const router = new Router();

/**
 * @api {post} /moderators Create moderators
 * @apiName CreateModerators
 * @apiGroup Moderators
 * @apiSuccess {Object} moderators Moderators's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Moderators not found.
 */
router.post("/", authUser);

export default router;
