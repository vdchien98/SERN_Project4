import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import './Post.scss';
function Post() {
    let { id } = useParams();
    const [postObject, setPostObject] = useState({});
    useEffect(() => {
        axios.get(`http://localhost:3001/posts/byId/${id}`).then((response) => {
            // console.log(response.data);
            setPostObject(response.data);
        });
    }, []);

    return (
        <div className="postPage">
            <div className="leftSide">
                <div className="post" id="individual">
                    <div className="title">{postObject.title}</div>
                    <div className="body">{postObject.postText}</div>
                    <div className="footer">{postObject.username}</div>
                </div>
            </div>
            <div className="rightSide">Commet Section</div>
        </div>
    );
}

export default Post;
