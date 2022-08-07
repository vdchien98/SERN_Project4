import './App.scss';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import Home from '../src/pages/Home';
import CreatePost from '../src/pages/CreatePost';
import Post from '../src/pages/Post';
import Registration from '../src/pages/Registration';
import Login from '../src/pages/Login';

function App() {
    return (
        <div className="App">
            <Router>
                <div className="navbar">
                    <Link to="/">Home </Link>
                    <Link to="/createpost">Tạo một bài viết mới </Link>
                    <Link to="/login">Đăng nhập</Link>
                    <Link to="/registration">Đăng ký</Link>
                </div>

                <Routes>
                    <Route path="/login" exact element={<Login />} />
                    <Route path="/" exact element={<Home />} />
                    <Route path="/createpost" exact element={<CreatePost />} />
                    <Route path="/post/:id" exact element={<Post />} />
                    <Route path="/registration" exact element={<Registration />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
