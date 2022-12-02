import React from "react";
import PropTypes from "prop-types";
import PostHeader from "./PostHeader";

function Post(props) {
    return (
        <>
            <article>
                <PostHeader
                    onRemove={props.onRemove}
                    post={{
                        id: props.post.id,
                        title: props.post.title,
                        read: props.post.read
                    }}
                />
                <br />
                <small>{props.post.subtitle}</small>
                <br />
                Likes: {props.post.likes}
            </article>
            <br />
        </>
    );
}

Post.propTypes = {
    onRemove: PropTypes.func.isRequired,
    post: PropTypes.shape({
        id: PropTypes.number.isRequired,
        likes: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        subtitle: PropTypes.string.isRequired,
        read: PropTypes.bool.isRequired,
    }).isRequired,
};

export default Post;