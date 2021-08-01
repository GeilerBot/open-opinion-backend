import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy, addViews } from "./controller";
import { schema } from "./model";
export Post, { schema } from "./model";

const router = new Router();
const { postID, time, views, verified, author, message, title, imgSrc } =
  schema.tree;

/**
 * @api {post} /post Create post
 * @apiName CreatePost
 * @apiGroup Post
 * @apiParam postID Post's postID.
 * @apiParam time Post's time.
 * @apiParam views Post's views.
 * @apiParam verified Post's verified.
 * @apiParam author Post's author.
 * @apiParam message Post's message.
 * @apiParam title Post's title.
 * @apiSuccess {Object} post Post's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Post not found.
 */
router.post(
  "/",
  body({
    postID,
    time,
    views,
    verified,
    author,
    message,
    title,
    imgSrc,
  }),
  create
);

/**
 * @api {get} /post Retrieve posts
 * @apiName RetrievePosts
 * @apiGroup Post
 * @apiUse listParams
 * @apiSuccess {Object[]} posts List of posts.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get("/", query(), index);

/**
 * @api {get} /post/:id Retrieve post
 * @apiName RetrievePost
 * @apiGroup Post
 * @apiSuccess {Object} post Post's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Post not found.
 */
router.get("/:id", show);

/**
 * @api {put} /post/:id Update post
 * @apiName UpdatePost
 * @apiGroup Post
 * @apiParam postID Post's postID.
 * @apiParam time Post's time.
 * @apiParam views Post's views.
 * @apiParam verified Post's verified.
 * @apiParam author Post's author.
 * @apiParam message Post's message.
 * @apiParam title Post's title.
 * @apiSuccess {Object} post Post's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Post not found.
 */
router.patch("/:id", body({ verified }), update);

/**
 * @api {delete} /post/:id Delete post
 * @apiName DeletePost
 * @apiGroup Post
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Post not found.
 */
router.delete("/:id", destroy);

router.patch("/addView/:postID", addViews);

export default router
