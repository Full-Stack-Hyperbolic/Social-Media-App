import React from 'react';
import { Card, Icon, Label, Image, CardContent } from 'semantic-ui-react';
import moment from 'moment';

const PostCard = ({
  post: { body, createdAt, id, username, likeCount, commentCount, likes },
}) => {
  return (
    <Card>
      <Card.Content>
        <Image
          floated='right'
          size='mini'
          src='https://react.semantic-ui.com/images/avatar/large/molly.png'
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta>{moment(createdAt).fromNow(true)}</Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <CardContent>
        <p>Buttons here</p>
      </CardContent>
    </Card>
  );
};

export default PostCard;
