import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../helpers/AuthContext';

import './Post.scss';
function Post() {
    let { id } = useParams(); // lấy cái id trong đường dẫn <Route path="/post/:id" exact element={<Post />} /> bên App
    const [postObject, setPostObject] = useState({});
    const [comments, setComments] = useState([]);
    const formComment = {
        commentBody: '',
    };
    const [formCommentData, setFormCommentData] = useState({ ...formComment });
    const { authState } = useContext(AuthContext);

    useEffect(() => {
        axios.get(`http://localhost:3001/posts/byId/${id}`).then((response) => {
            setPostObject(response.data);
        });

        axios.get(`http://localhost:3001/comments/${id}`).then((response) => {
            setComments(response.data);
        });
    }, []);
    const handleChange = (e) => {
        setFormCommentData((p) => {
            return { ...p, [e.target.name]: e.target.value, PostId: id };
        });
    };
    const addComment = (formCommentData) => {
        axios
            .post(`http://localhost:3001/comments`, formCommentData, {
                headers: {
                    accessToken: localStorage.getItem('accessToken'),
                },
            })
            .then((response) => {
                if (response.data.error) {
                    console.log(response.data.error);
                } else {
                    setComments([...comments, response.data]);
                    setFormCommentData({});
                }
            });
    };

    const deleteComment = (id) => {
        axios
            .delete(`http://localhost:3001/comments/${id}`, {
                headers: {
                    accessToken: localStorage.getItem('accessToken'),
                },
            })
            .then((response) => {
                console.log('đã xóa ', response);
                setComments(
                    comments.filter((val) => {
                        return val.id !== id;
                    })
                );
                console.log('------***---/////-', comments);
            });
    };

    console.log('-------', comments);
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
                                <label>User name: {comment.username}</label>
                                {authState.username === comment.username && (
                                    <button
                                        onClick={() => {
                                            deleteComment(comment.id);
                                        }}
                                        style={{ marginLeft: '15px' }}
                                    >
                                        Xóa bình luận{' '}
                                    </button>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default Post;
