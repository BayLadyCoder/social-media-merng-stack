const Post = require("../../models/Post");
const checkAuth = require("../../util/checkAuth");

const { UserInputError } = require("apollo-server");

module.exports = {
  Mutation: {
    async createComment(_, { postId, content }, context) {
      const { username } = checkAuth(context);

      if (content.trim() === "") {
        throw new UserInputError("Empty comment", {
          errors: { content: "Comment must not empty" },
        });
      }

      const post = await Post.findById(postId);

      if (post) {
        post.comments.unshift({
          content,
          username,
        });

        await post.save();
        return post;
      } else {
        throw new Error("Post not found");
      }
    },
  },
};
