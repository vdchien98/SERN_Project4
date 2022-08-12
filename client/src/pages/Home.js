import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
    const [listOfPosts, setListOfPosts] = useState([]);
    // let history = useHistory();
    let navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:3001/posts').then((response) => {
            // console.log(response.data);
            setListOfPosts(response.data);
        });
    }, []);
    const likeAPost = (postId) => {
        axios
            .post('http://localhost:3001/likes', { PostId: postId }, { headers: { accessToken: localStorage.getItem('accessToken') } })
            .then((response) => {
                setListOfPosts(
                    listOfPosts.map((post) => {
                        if (post.id === postId) {
                            if (response.data.liked) {
                                return { ...post, Likes: [...post.Likes, 0] };
                            } else {
                                const likesArray = post.Likes;
                                likesArray.pop();
                                return { ...post, Likes: likesArray };
                            }
                        } else {
                            return post;
                        }
                    })
                );
            });
    };
    return (
        <div>
            {listOfPosts.map((value, key) => {
                return (
                    <>
                        <div className="post" key={key}>
                            <h5 className="title">{value.title}</h5>
                            <p
                                className="body"
                                onClick={() => {
                                    navigate(`/post/${value.id}`);
                                }}
                            >
                                {value.postText}
                            </p>
                            <div className="footer">
                                {value.username}{' '}
                                <button
                                    onClick={() => {
                                        likeAPost(value.id);
                                    }}
                                >
                                    {' '}
                                    Like
                                </button>
                                <label> {value.Likes.length}</label>
                            </div>
                        </div>
                    </>
                );
            })}
        </div>
    );
}

export default Home;
