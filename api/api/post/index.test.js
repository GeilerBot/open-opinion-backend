import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Post } from '.'

const app = () => express(apiRoot, routes)

let post

beforeEach(async () => {
  post = await Post.create({})
})

test('POST /post 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ postID: 'test', time: 'test', views: 'test', verified: 'test', author: 'test', message: 'test', title: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.postID).toEqual('test')
  expect(body.time).toEqual('test')
  expect(body.views).toEqual('test')
  expect(body.verified).toEqual('test')
  expect(body.author).toEqual('test')
  expect(body.message).toEqual('test')
  expect(body.title).toEqual('test')
})

test('GET /post 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /post/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${post.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(post.id)
})

test('GET /post/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /post/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${post.id}`)
    .send({ postID: 'test', time: 'test', views: 'test', verified: 'test', author: 'test', message: 'test', title: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(post.id)
  expect(body.postID).toEqual('test')
  expect(body.time).toEqual('test')
  expect(body.views).toEqual('test')
  expect(body.verified).toEqual('test')
  expect(body.author).toEqual('test')
  expect(body.message).toEqual('test')
  expect(body.title).toEqual('test')
})

test('PUT /post/:id 404', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ postID: 'test', time: 'test', views: 'test', verified: 'test', author: 'test', message: 'test', title: 'test' })
  expect(status).toBe(404)
})

test('DELETE /post/:id 204', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${post.id}`)
  expect(status).toBe(204)
})

test('DELETE /post/:id 404', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})
