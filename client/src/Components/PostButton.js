import React from 'react';
import { Button, Icon, Label } from 'semantic-ui-react';

const PostButton = ({
  color,
  iconName,
  labelPosition,
  as = 'div',
  pointing,
  labelColor,
  buttonText,
  labelText,
  labelAsA,
  isOutlined = true,
  labelIsOutlined = true,
  onClick,
  style,
}) => {
  return (
    <Button
      style={style}
      as={as}
      labelPosition={labelPosition}
      onClick={onClick}
    >
      <Button basic={isOutlined} color={color}>
        <Icon name={iconName} />
        {buttonText}
      </Button>
      <Label
        as={labelAsA}
        basic={labelIsOutlined}
        color={labelColor}
        pointing={pointing}
      >
        {labelText}
      </Label>
    </Button>
  );
};

export default PostButton;
