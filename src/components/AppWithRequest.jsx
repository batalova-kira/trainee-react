import axios from 'axios';
import React, { Component } from 'react';
import css from './AppWithRequest.module.css';
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
    const { data } = await axios.get(
      'https://jsonplaceholder.typicode.com/posts'
    );
    this.setState({ posts: data });
  };

  // виклик функції (методу) для нашого мережевого запиту під час першого рендеру цього компоненту
  componentDidMount() {
    this.fetchPosts();
  }

  render() {
    return (
      <div className={css.container}>
        <h1>HTTP Requests</h1>
        <ul className={css.postList}>
          {this.state.posts !== null &&
            this.state.posts.map(post => {
              return (
                <li key={post.id} className={css.postListItem}>
                  <h2 className={css.itemTitle}>{post.title}</h2>
                  <p className={css.itemBody}>
                    <b>Body</b>
                    {post.body}
                  </p>
                </li>
              );
            })}
        </ul>
      </div>
    );
  }
}
