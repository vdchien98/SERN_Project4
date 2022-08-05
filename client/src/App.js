import './App.scss';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import Home from '../src/pages/Home';
import CreatePost from '../src/pages/CreatePost';

function App() {
    return (
        <div className="App">
            <Router>
                <Link to="/createpost">Tạo một bài viết mới </Link>
                <Link to="/">Home </Link>

                <Routes>
                    <Route path="/" exact element={<Home />} />
                    <Route path="/createpost" exact element={<CreatePost />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
