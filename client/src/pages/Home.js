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
    return (
        <div>
            {listOfPosts.map((value, key) => {
                return (
                    <>
                        <div
                            className="post"
                            key={key}
                            onClick={() => {
                                navigate(`/post/${value.id}`);
                            }}
                        >
                            <h5 className="title">{value.title}</h5>
                            <p className="body">{value.postText}</p>
                            <h4 className="footer">{value.username}</h4>
                        </div>
                    </>
                );
            })}
        </div>
    );
}

export default Home;
