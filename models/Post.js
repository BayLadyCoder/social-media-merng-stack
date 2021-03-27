const { model, Schema } = require("mongoose");

const postSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  comments: [
    {
      content: {
        type: String,
        required: true,
      },
      username: {
        type: String,
        required: true,
      },
      created_at: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  likes: [
    {
      username: {
        type: String,
        required: true,
      },
      created_at: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: "social-media-merng_user",
  },
});

module.exports = model("social-media-merng_post", postSchema);
