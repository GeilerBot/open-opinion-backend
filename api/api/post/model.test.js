import { Post } from '.'

let post

beforeEach(async () => {
  post = await Post.create({ postID: 'test', time: 'test', views: 'test', verified: 'test', author: 'test', message: 'test', title: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = post.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(post.id)
    expect(view.postID).toBe(post.postID)
    expect(view.time).toBe(post.time)
    expect(view.views).toBe(post.views)
    expect(view.verified).toBe(post.verified)
    expect(view.author).toBe(post.author)
    expect(view.message).toBe(post.message)
    expect(view.title).toBe(post.title)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = post.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(post.id)
    expect(view.postID).toBe(post.postID)
    expect(view.time).toBe(post.time)
    expect(view.views).toBe(post.views)
    expect(view.verified).toBe(post.verified)
    expect(view.author).toBe(post.author)
    expect(view.message).toBe(post.message)
    expect(view.title).toBe(post.title)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
