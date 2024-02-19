import React from 'react';
import { useParams } from 'react-router-dom';

const PostComments = () => {
  const { postId } = useParams();
  return <div>PostComments: {postId}</div>;
};

export default PostComments;
