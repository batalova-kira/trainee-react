import axios from 'axios';
import React, { Component } from 'react';

import { Loader } from '../components/Loader/Loader.jsx';
import { StyledPosts } from './PostsPages.styled.js';
import { Link } from 'react-router-dom';

// rcc - react class component
//rafce - react arrow functions expression component

export default class PostsPage extends Component {
  state = {
    posts: null,
    selectedPostId: null,
    comments: null,

    isLoading: false,
    error: null,
  };

  // функція (метод) для нашого мережевого запиту постів
  fetchPosts = async () => {
    try {
      this.setState({ isLoading: true });
      const { data } = await axios.get(
        'https://jsonplaceholder.typicode.com/posts'
      );
      this.setState({ posts: data });
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  // функція (метод) для мережевого запиту коментарів до постів
  fetchPostsComments = async () => {
    try {
      this.setState({ isLoading: true });
      const { data } = await axios.get(
        `https://jsonplaceholder.typicode.com/comments?postId=${this.state.selectedPostId}`
      );
      this.setState({ comments: data });
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  //функція, яка при натисканні на пост зберігає в стейті ід поста

  onSelectPost = id => {
    this.setState({ selectedPostId: id });
  };
  // виклик функції (методу) для нашого мережевого запиту під час першого рендеру цього компоненту
  componentDidMount() {
    this.fetchPosts();
  }

  componentDidUpdate(_, prevState) {
    if (prevState.selectedPostId !== this.state.selectedPostId) {
      this.fetchPostsComments();
    }
  }
  render() {
    return (
      <StyledPosts>
        <h1>HTTP Requests</h1>
        {this.state.error !== null && (
          <p className="error-bage">
            Ooops, some error occured..Error message: {this.state.error}
          </p>
        )}
        {this.state.isLoading && <Loader />}
        <div className="listWrapper">
          <ul className="postList">
            {this.state.posts !== null &&
              this.state.posts.map(post => {
                return (
                  <li
                    key={post.id}
                    className="postListItem"
                    // onClick={() => this.onSelectPost(post.id)}
                  >
                    <Link to={`/posts/${post.id}`}>
                      <h2 className="itemTitle">{post.title}</h2>
                      <p className="itemBody">
                        <b>Body</b>
                        {post.body}
                      </p>
                    </Link>
                  </li>
                );
              })}
          </ul>
          <ul className="commentsList">
            <li className="commentsListItem">
              Selected post Id: {this.state.selectedPostId}
            </li>
            {!this.state.isLoading &&
              this.state.comments !== null &&
              this.state.comments.map(comment => {
                return (
                  <li key={comment.id} className="commentsListItem">
                    <h2 className="commentTitle">{comment.name}</h2>
                    <h3 className="commentEmail">{comment.email}</h3>
                    <p className="commentBody">
                      <b>Body </b>
                      {comment.body}
                    </p>
                  </li>
                );
              })}
          </ul>
        </div>
      </StyledPosts>
    );
  }
}
