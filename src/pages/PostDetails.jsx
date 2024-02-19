import axios from 'axios';
import { Loader } from 'components/Loader/Loader';
import React, { useEffect, useState } from 'react';
import { NavLink, Route, Routes, useParams } from 'react-router-dom';
import PostComments from './PostComments';

const PostDetails = () => {
  const { postId } = useParams();
  const [postDetails, setPostDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          `https://jsonplaceholder.typicode.com/posts/${postId}`
        );
        setPostDetails(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPostDetails();
  }, [postId]);

  return (
    <div>
      <h1>PostDetails</h1>
      {error !== null && <p className="error-bage">{error}</p>}
      {isLoading && <Loader />}
      {postDetails !== null && (
        <div>
          <h2>{postDetails.title}</h2>
          <h3>PostId: {postDetails.id}</h3>
          <code>{postDetails.body}</code>
        </div>
      )}
      <div>
        <NavLink className="header-link" to="comments">
          Comments
        </NavLink>
        <Routes>
          <Route path="comments" element={<PostComments />} />
        </Routes>
      </div>
    </div>
  );
};

export default PostDetails;
