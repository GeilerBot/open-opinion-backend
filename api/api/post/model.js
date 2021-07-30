import mongoose, {
  Schema
} from 'mongoose'

const postSchema = new Schema({
  postID: {
    type: Number
  },
  time: {
    type: String
  },
  views: {
    type: Number
  },
  verified: {
    type: Boolean
  },
  author: {
    type: String
  },
  message: {
    type: String
  },
  title: {
    type: String
  },
  imgSrc: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => {
      delete ret._id
    }
  }
})

postSchema.methods = {
  view(full) {
    const view = {
      // simple view
      id: this.id,
      postID: this.postID,
      time: this.time,
      views: this.views,
      verified: this.verified,
      imgSrc: this.imgSrc,
      post: {
        author: this.author,
        message: this.message,
        title: this.title,
      },
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }
    return full ? {
      ...view
    } : view
  }
}

const model = mongoose.model('Post', postSchema)

export const schema = model.schema
export default model
