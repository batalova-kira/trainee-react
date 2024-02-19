import axios from 'axios';
import { Loader } from 'components/Loader/Loader';
import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

const PostsPage = () => {
  // отриммати значення пошукового параметра
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchedPosts, setSearchedPosts] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  //?query=123
  const queryValue = searchParams.get('query'); //123
  // CTRL + SHIFT + L
  console.log('queryValue: ', queryValue);

  //витягнути значення пошукового параментра з форми та перезаписати його
  const onFormSubmit = e => {
    e.preventDefault();
    const value = e.currentTarget.elements.searchKey.value;

    setSearchParams({ query: value });
  };

  useEffect(() => {
    if (!queryValue) return;
    const fetchSearchedPosts = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const { data } = await axios.get(
          `https://jsonplaceholder.typicode.com/posts/${queryValue}`
        );
        //Мені потрібно буде зробити setSearchedPosts(data)
        setSearchedPosts([data]);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSearchedPosts();
  }, [queryValue]);

  return (
    <div>
      <form onSubmit={onFormSubmit}>
        <label>
          <span>Search post by Id:</span>
          <input type="text" name="searchKey" required placeholder="12" />
        </label>
        <button type="submit">Search post</button>
      </form>
      {error !== null && <p className="error-bage">{error}</p>}
      {isLoading && <Loader />}
      {searchedPosts !== null &&
        searchedPosts.map(post => {
          return (
            <Link key={post.id} to={`/posts/${post.id}`}>
              <div>
                <h2>{post.title}</h2>
                <code>{post.body}</code>
              </div>
            </Link>
          );
        })}
    </div>
  );
};

export default PostsPage;
