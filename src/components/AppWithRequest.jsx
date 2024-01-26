import axios from 'axios';
import React, { Component } from 'react';
import { StyledAppWithRequests } from './AppWithRequest.styled';
import { Loader } from './Loader/Loader';

// rcc - react class component
//rafce - react arrow functions expression component

// {
// "userId": 1,
// "id": 1,
// "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
// "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
// },

export default class AppWithRequest extends Component {
  state = {
    posts: null,
    isLoading: false,
    error: null,
  };

  // функція (метод) для нашого мережевого запиту
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

  // виклик функції (методу) для нашого мережевого запиту під час першого рендеру цього компоненту
  componentDidMount() {
    this.fetchPosts();
  }

  render() {
    return (
      <StyledAppWithRequests>
        <h1>HTTP Requests</h1>
        {this.state.error !== null && (
          <p className="error-bage">
            Ooops, some error occured..Error message: {this.state.error}
          </p>
        )}
        {this.state.isLoading && <Loader />}
        <ul className="postList">
          {this.state.posts !== null &&
            this.state.posts.map(post => {
              return (
                <li key={post.id} className="postListItem">
                  <h2 className="itemTitle">{post.title}</h2>
                  <p className="itemBody">
                    <b>Body</b>
                    {post.body}
                  </p>
                </li>
              );
            })}
        </ul>
      </StyledAppWithRequests>
    );
  }
}
