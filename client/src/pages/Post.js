import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import './Post.scss';
function Post() {
    let { id } = useParams(); // lấy cái id trong đường dẫn <Route path="/post/:id" exact element={<Post />} /> bên App
    const [postObject, setPostObject] = useState({});
    const [comments, setComments] = useState([]);
    const formComment = {
        commentBody: '',
    };
    const [formCommentData, setFormCommentData] = useState({ ...formComment });

    useEffect(() => {
        axios.get(`http://localhost:3001/posts/byId/${id}`).then((response) => {
            // console.log(response.data);
            setPostObject(response.data);
        });

        axios.get(`http://localhost:3001/comments/${id}`).then((response) => {
            // console.log(response.data);
            setComments(response.data);
        });
    }, []);
    const handleChange = (e) => {
        setFormCommentData((p) => {
            console.log('+++++++', { ...p, [e.target.name]: e.target.value });
            return { ...p, [e.target.name]: e.target.value, PostId: id };
        });
    };
    const addComment = (formCommentData) => {
        // console.log('xin chào mọi người', formCommentData);
        axios.post(`http://localhost:3001/comments`, formCommentData).then((response) => {
            // console.log('xin chào mọi người');
            const commentToAdd = formCommentData;
            setComments([...comments, commentToAdd]);
            console.log('========', comments);
        });
    };
    return (
        <div className="postPage">
            <div className="leftSide">
                <div className="post" id="individual">
                    <div className="title">{postObject.title}</div>
                    <div className="body">{postObject.postText}</div>
                    <div className="footer">{postObject.username}</div>
                </div>
            </div>
            <div className="rightSide">
                <div className="addCommentContainer">
                    <input
                        type="text"
                        placeholder="Comment..."
                        autoComplete="off"
                        // value={formCommentData}
                        name="commentBody"
                        onChange={handleChange}
                    />
                    <button
                        onClick={() => {
                            addComment(formCommentData);
                        }}
                    >
                        Add Comment
                    </button>
                </div>
                <div className="listOfComments">
                    {comments.map((comment, key) => {
                        return (
                            <div key={key} className="comment">
                                {comment.commentBody}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default Post;
