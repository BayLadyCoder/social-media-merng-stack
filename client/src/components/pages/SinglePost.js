import React, { useContext, useState, useRef } from "react";
import { QUERY_GET_POST, MUTATION_CREATE_COMMENT } from "../../util/graphql";
import { useQuery, useMutation } from "@apollo/client";
import {
  Grid,
  Card,
  Image,
  Button,
  Icon,
  Label,
  Form,
  Popup,
} from "semantic-ui-react";
import { AuthContext } from "../../context/auth";
import Moment from "react-moment";
import LikeButton from "../LikeButton";
import DeleteButton from "../DeleteButton";

const SinglePost = (props) => {
  const [commentContent, setCommentContent] = useState("");
  const { user } = useContext(AuthContext);
  const postId = props.match.params.postId;
  const commentInputRef = useRef(null);

  const { data } = useQuery(QUERY_GET_POST, {
    variables: { postId },
  });

  const [createComment] = useMutation(MUTATION_CREATE_COMMENT, {
    variables: { postId, content: commentContent },
    onError(error) {
      console.error(error);
    },
    update(cache, result) {
      setCommentContent("");
      commentInputRef.current.blur();
    },
  });

  const deletePostCallback = () => {
    props.history.push("/");
  };

  let postMarkup;

  if (data && data.getPost) {
    const {
      id,
      content,
      created_at,
      username,
      comments,
      likes,
      commentCount,
      likeCount,
    } = data.getPost;

    postMarkup = (
      <Grid>
        <Grid.Row>
          <Grid.Column width={2}>
            <Popup
              inverted
              content={username}
              trigger={
                <Image
                  src="https://react.semantic-ui.com/images/avatar/large/molly.png"
                  size="small"
                  float="right"
                />
              }
            />
          </Grid.Column>
          <Grid.Column width={10}>
            <Card fluid>
              <Card.Content>
                <Card.Header>{username}</Card.Header>
                <Card.Meta>
                  <Moment fromNow ago>
                    {created_at}
                  </Moment>
                </Card.Meta>
                <Card.Description>{content}</Card.Description>
              </Card.Content>
              <hr />
              <Card.Content>
                <LikeButton user={user} post={{ id, likes, likeCount }} />
                <Popup
                  inverted
                  content="Add a comment"
                  trigger={
                    <Button
                      as="div"
                      labelPosition="right"
                      onClick={() => console.log("Comment on post")}
                    >
                      <Button basic color="blue">
                        <Icon name="comments" />
                      </Button>
                      <Label basic color="blue" pointing="left">
                        {commentCount}
                      </Label>
                    </Button>
                  }
                />

                {user && user.username === username && (
                  <DeleteButton postId={postId} callback={deletePostCallback} />
                )}
              </Card.Content>
            </Card>
            {user && (
              <Card fluid>
                <Card.Content>
                  <p>Add new comment</p>
                  <Form>
                    <div className="ui action input fluid">
                      <input
                        type="text"
                        placeholder="Comment..."
                        name="commentContent"
                        value={commentContent}
                        onChange={(event) =>
                          setCommentContent(event.target.value)
                        }
                        ref={commentInputRef}
                      />
                      <button
                        type="submit"
                        className="ui button teal"
                        disabled={commentContent.trim() === ""}
                        onClick={createComment}
                      >
                        Submit
                      </button>
                    </div>
                  </Form>
                </Card.Content>
              </Card>
            )}
            {comments &&
              comments.map((comment) => (
                <Card fluid key={comment.id}>
                  <Card.Content>
                    {user && user.username === comment.username && (
                      <DeleteButton postId={id} commentId={comment.id} />
                    )}
                    <Card.Header>{comment.username}</Card.Header>
                    <Card.Meta>
                      <Moment fromNow ago>
                        {comment.created_at}
                      </Moment>
                    </Card.Meta>
                    <Card.Description>{comment.content}</Card.Description>
                  </Card.Content>
                </Card>
              ))}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  } else {
    postMarkup = <p>Loading post...</p>;
  }

  return postMarkup;
};

export default SinglePost;
