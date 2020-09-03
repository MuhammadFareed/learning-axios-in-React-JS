import React, { Component } from 'react';
import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';
import axios from '../../axios';

class Blog extends Component {
    state = {
        posts: [],
        selectedPostId: 0,
        selectedPost: null,
        error: false
    }
    componentDidMount = () => {
        axios.get('https://jsonplaceholder.typicode.com/todos')
        .then(response => {
            const posts = response.data;
            const updatedPosts = posts.slice(0,2);
            const newUpdatedPosts = updatedPosts.map(updatedPost => {
                return {
                    ...updatedPost,
                    author: 'Fareed'
                }
            }) 

            console.log(newUpdatedPosts);
            this.setState({
                posts: newUpdatedPosts
            });
        });
    }   
    postSelectedHandler = (id) => {
        this.setState({
            selectedPostId: id
        });
    }
    deletePostHandler = () => {
        axios.delete('/todos/' + this.state.selectedPostId)
            .then(res => {
                console.log(res);
            }
        ).catch(err => {
            console.log(err);
            this.setState({
                error: true
            });
        });

        const idToDelete = this.state.selectedPostId;
        const newPosts = this.state.posts.filter(post => {
            return post.id !== idToDelete;
        });
        this.setState({
            posts: newPosts
        })
        console.log(this.state.posts);
    }
    render () {
        let renderedPosts = <h1 style={{textAlign: 'center'}}>Went something wrong!!! Sorry...</h1>
        if(!this.state.error) {
            renderedPosts = this.state.posts.map(post => {
                return <Post
                    clicked={() => this.postSelectedHandler(post.id)}
                    key={post.id}
                    title={post.title}
                    author={post.author}
                />
            })
        }
        return (
            <div>
                <section className="Posts">
                    {renderedPosts}
                </section>
                <section>
                    <FullPost
                        id={this.state.selectedPostId} 
                        deleted={this.deletePostHandler}
                    />
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;