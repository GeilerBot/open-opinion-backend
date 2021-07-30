import { success, notFound } from '../../services/response/'
import { Post } from '.'

export const create = ({ bodymen: { body } }, res, next) => {
  const date = new Date();
  const postID = date.getTime();
  const time = date.toUTCString();
  body.postID = postID;
  body.time = time;
  body.verified = true;
  body.views = 0;
  return Post.create(body)
    // .then((post) => post.view(true))
    .then(success(res, 201))
    .catch(next)
}

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Post.find(query, select, cursor)
    .then((posts) => posts.map((post) => post.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Post.findOne(params.postID)
    .then(notFound(res))
    .then((post) => post ? post.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Post.findOne(params.postID)
    .then(notFound(res))
    .then((post) => post ? Object.assign(post, body).save() : null)
    // .then((post) => post ? post.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Post.findOne(params.postID)
    .then(notFound(res))
    .then((post) => post ? post.remove() : null)
    .then(success(res, 204))
    .catch(next)

export const likeAPost = ({ params }, res, next) => {
  Post.findOne(params.postID)
  .then(notFound(res))
  .then((post) => post ? Object.assign(post, body).save() : null)
  // .then((post) => post ? post.view(true) : null)
  .then(success(res))
  .catch(next)
}

