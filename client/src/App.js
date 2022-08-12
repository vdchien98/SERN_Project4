import './App.scss';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import Home from '../src/pages/Home';
import CreatePost from '../src/pages/CreatePost';
import Post from '../src/pages/Post';
import Registration from '../src/pages/Registration';
import Login from '../src/pages/Login';
import PageNotFound from '../src/pages/PageNotFound';

import { AuthContext } from './helpers/AuthContext';
import { useState, useEffect } from 'react';
import axios from 'axios';
function App() {
    const [authState, setAuthState] = useState({ username: '', id: 0, status: false });
    useEffect(() => {
        axios
            .get('http://localhost:3001/auth/auth', {
                headers: {
                    accessToken: localStorage.getItem('accessToken'),
                },
            })
            .then((response) => {
                if (response.data.error) {
                    setAuthState({ ...authState, status: false });
                } else {
                    setAuthState({
                        // 888
                        username: response.data.username,
                        id: response.data.id,
                        status: true,
                    });
                }
            });
    }, []);
    console.log('-------', authState);

    const logout = () => {
        localStorage.removeItem('accessToken');
        setAuthState({ username: '', id: 0, status: false });
    };
    return (
        <div className="App">
            <AuthContext.Provider value={{ authState, setAuthState }}>
                <Router>
                    <div className="navbar">
                        <Link to="/">Home </Link>
                        <Link to="/createpost">Tạo một bài viết mới </Link>
                        {!authState.status ? (
                            <>
                                <Link to="/login">Đăng nhập</Link>
                                <Link to="/registration">Đăng ký</Link>
                            </>
                        ) : (
                            <button onClick={logout}>Log Out</button>
                        )}
                        <h2>{authState.username}</h2>
                    </div>

                    <Routes>
                        <Route path="/login" exact element={<Login />} />
                        <Route path="/" exact element={<Home />} />
                        <Route path="/createpost" exact element={<CreatePost />} />
                        <Route path="/post/:id" exact element={<Post />} />
                        <Route path="/registration" exact element={<Registration />} />
                        <Route path="*" exact element={<PageNotFound />} />
                    </Routes>
                </Router>
            </AuthContext.Provider>
        </div>
    );
}

export default App;
