import './App.scss';
import axios from 'axios';
import { useEffect, useState } from 'react';
function App() {
    const [listOfPosts, setListOfPosts] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:3001/posts').then((response) => {
            // console.log(response.data);
            setListOfPosts(response.data);
        });
    }, []);
    return (
        <div className="App">
            {listOfPosts.map((value, key) => {
                return (
                    <>
                        <div className="card-body post" key={key}>
                            <h5 className="card-title title">{value.title}</h5>
                            <p className="card-text body">{value.postText}</p>
                            <h4 className="footer">{value.username}</h4>
                        </div>
                    </>
                );
            })}
        </div>
    );
}

export default App;
