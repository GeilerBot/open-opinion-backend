import { success, notFound } from '../../services/response/'
import { Post } from '.'
const { Validator } = require("encrypted-randomizer");
const privateKey = "YHGcf9327huwnc38234nef0cv23w40";

export const create = (req, res, next) => {
  let {
    bodymen: { body },
  } = req;
  const date = new Date();
  const postID = date.getTime();
  const time = date.toUTCString();
  const decryptChecker = new Validator(privateKey, req.headers.ts);
  const verificationState = decryptChecker.verifyState(req.headers.erhs);
  body.postID = postID;
  body.time = time;
  body.verified = true;
  body.views = 0;
  if (verificationState) {
    return (
      Post.create(body)
        // .then((post) => post.view(true))
        .then(success(res, 201))
        .catch(next)
    );
  } else {
    return notFound(res);
  }
};

export const index = (req, res, next) => {
  let {
    querymen: { query, select, cursor },
  } = req;
  const decryptChecker = new Validator(privateKey, req.headers.ts);
  const verificationState = decryptChecker.verifyState(req.headers.erhs);
  if (verificationState) {
    return Post.find(query, select, cursor)
      .then((posts) => posts.map((post) => post.view()))
      .then(success(res))
      .catch(next);
  } else {
    // return notFound(res);
  }
  res.send({ done: "done" });
};

export const show = (req, res, next) => {
  const decryptChecker = new Validator(privateKey, req.headers.ts);
  const verificationState = decryptChecker.verifyState(req.headers.erhs);
  if (verificationState) {
    return Post.findOne(req.params.postID)
      .then(notFound(res))
      .then((post) => (post ? post.view() : null))
      .then(success(res))
      .catch(next);
  } else {
    return notFound(res);
  }
};

export const update = ({ bodymen: { body }, params }, res, next) =>
  Post.findOne(params.postID)
    .then(notFound(res))
    .then((post) => (post ? Object.assign(post, body).save() : null))
    // .then((post) => post ? post.view(true) : null)
    .then(success(res))
    .catch(next);

export const destroy = ({ params }, res, next) =>
  Post.findOne(params.postID)
    .then(notFound(res))
    // .then((post) => (post ? post.remove() : null))
    .then(success(res, 204))
    .catch(next);

export const addViews = (req, res, next) => {
  const decryptChecker = new Validator(privateKey, req.headers.ts);
  const verificationState = decryptChecker.verifyState(req.headers.erhs);
  if (verificationState) {
    return (
      Post.updateOne({ postID: req.params.postID }, { $inc: { views: 1 } })
        .then(notFound(res))
        // .then((post) => (post ? Object.assign(post, body).save() : null))
        // .then((post) => post ? post.view(true) : null)
        .then(success(res))
        .catch(next)
    );
  } else {
    // return notFound(res);
    res.send({ done: "not done" });
  }
};
