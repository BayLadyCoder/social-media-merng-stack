const Post = require("../../models/Post");
const checkAuth = require("../../util/checkAuth");

module.exports = {
  Query: {
    async getPosts() {
      try {
        const posts = await Post.find().sort({ created_at: -1 }); // latest post come first
        return posts;
      } catch (err) {
        console.log(err);
        throw new Error(err);
      }
    },
    async getPost(_, { postId }) {
      try {
        const post = await Post.findById(postId);
        if (post) {
          return post;
        } else {
          throw new Error("Post not found");
        }
      } catch (error) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    async createPost(_, { content }, context) {
      const user = checkAuth(context);

      console.log(user);
      const { id, username } = user;

      const newPost = new Post({
        content,
        user: id,
        username: username,
      });

      const post = await newPost.save();
      return post;
    },
  },
};
