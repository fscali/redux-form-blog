import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPost, deletePost } from '../actions';

class PostsShow extends Component {

    componentDidMount(){
        // this.props.match.params.id provided by react router
        const { id } = this.props.match.params;
        this.props.fetchPost(id);
    }

    onDeleteClick() {
        const { id } = this.props.match.params;
        this.props.deletePost(id, () => {
            this.props.history.push('/');
        });

    }
    render() {
        const { post } = this.props;
        if (!post){
            return (
                <div>
                    Loading..
                </div>
            )
        }
        return (
            <div>
                <Link to="/">Back to Index</Link>
                <button
                    className="btn btn-danger pull-xs-right"
                    onClick={this.onDeleteClick.bind(this)}
                >Delete post</button>
                <h3>{post.title}</h3>
                <h6>Categories: {post.categories}</h6>
                <p>{post.content}</p>
            </div>
        );
    }
}

//ownProps is the props object that is headed to this component
//this make the component more reusable, as it is aware of a single post and not of all the posts
function mapStateToProps( {posts}, ownProps ){
    return { post: posts[ownProps.match.params.id]};

}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);