const Post = require("../../models/Post");
const checkAuth = require("../../util/checkAuth");

const { UserInputError, AuthenticationError } = require("apollo-server");

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
    async deleteComment(_, { postId, commentId }, context) {
      const { username } = checkAuth(context);

      const post = await Post.findById(postId);

      if (post) {
        const commentIndex = post.comments.findIndex(
          (comment) => comment.id === commentId
        );

        if (post.comments[commentIndex].username === username) {
          post.comments.splice(commentIndex, 1);
          await post.save();
          return post;
        } else {
          throw new AuthenticationError("Action not allowed");
        }
      }
    },
  },
};
