import './App.scss';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import Home from '../src/pages/Home';
import CreatePost from '../src/pages/CreatePost';
import Post from '../src/pages/Post';

function App() {
    return (
        <div className="App">
            <Router>
                <div className="navbar">
                    <Link to="/createpost">Tạo một bài viết mới </Link>
                    <Link to="/">Home </Link>
                </div>

                <Routes>
                    <Route path="/" exact element={<Home />} />
                    <Route path="/createpost" exact element={<CreatePost />} />
                    <Route path="/post/:id" exact element={<Post />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
