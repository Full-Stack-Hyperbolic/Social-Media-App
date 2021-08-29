import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Image, CardContent } from 'semantic-ui-react';
import moment from 'moment';
import PostButton from './PostButton';

const PostCard = ({
  post: { body, createdAt, id, username, likeCount, commentCount, likes },
}) => {
  function likePost() {
    console.log('LIKING POST');
  }

  function commentOnPost() {
    console.log('COMMENTING ON POST');
  }

  return (
    <Card>
      <Card.Content>
        <Image
          floated='right'
          size='mini'
          src='https://react.semantic-ui.com/images/avatar/large/molly.png'
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta as={Link} to={`/posts/${id}`}>
          {moment(createdAt).fromNow(true)}
        </Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <CardContent>
        <PostButton
          color='teal'
          iconName='heart'
          labelPosition='right'
          pointing='left'
          labelText={likeCount}
          labelColor='teal'
          onClick={likePost}
        />
        <PostButton
          color='blue'
          iconName='comments'
          labelPosition='right'
          pointing='left'
          labelText={commentCount}
          labelColor='blue'
          onClick={commentOnPost}
          style={{ marginLeft: '1rem' }}
        />
      </CardContent>
    </Card>
  );
};

export default PostCard;
