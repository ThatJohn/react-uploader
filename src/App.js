import React, { Component } from 'react'
import './styles.scss'
import Post from './Post';

export default class App extends Component {

  state = {
    title: '',
    body: '',
    posts: [],
    featured_image: null
  }

  componentDidMount(){
    this.getPosts();
  }

  getPosts = () => {
    fetch('http://localhost:3000/posts')
    .then(response => response.json())
    .then(posts => this.setState({posts: posts}))
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    return (
      <div className="container">
        <h1>Create a new post</h1>
        <hr/>
        <div>
          <form onSubmit={this.handleSubmit}>
            <div className="post-title">
              <label htmlFor="title">Post title: </label>
              <input name="title" type="text" onChange={this.handleChange} value={this.state.title} />
            </div>
            <div className="post-body">
              <label htmlFor="body">Post body</label>
              <textarea name="body" onChange={this.handleChange} value={this.state.body} />
            </div>
            <div className="post-image">
              <label htmlFor="img">Select image:</label>
              <input type="file" accept="image/*" multiple={false} onChange={this.onImageChange} />
            </div>
            <button className="submit" type="submit">Create post</button>
          </form>
        </div>
        {this.state.posts.map(post => (
          <Post key={post.id} title={post.title} body={post.body} url={post.featured_image.url} />
        ))}
      </div>
    )
  }
}