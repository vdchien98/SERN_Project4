import React from 'react';
import { useContext, useState } from 'react';
import axios from 'axios';
import './Login.scss';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../helpers/AuthContext';
function Login() {
    const form = {
        username: '',
        password: '',
    };
    const [formData, setFormData] = useState({ ...form });
    const { setAuthState } = useContext(AuthContext);
    const navigate = useNavigate();
    const handleChange = (e) => {
        setFormData((p) => {
            return { ...p, [e.target.name]: e.target.value };
        });
    };
    const login = (data) => {
        axios.post(`http://localhost:3001/auth/login`, data).then((response) => {
            if (response.data.error) {
                alert(response.data.error);
            } else {
                console.log('***-----', response.data);
                localStorage.setItem('accessToken', response.data.token);
                setAuthState({ username: response.data.username, id: response.data.id, status: true });
                navigate('/');
            }
        });
    };
    return (
        <div className="LoginPost">
            <div className="addCommentContainer">
                <label>User name</label>
                <input type="text" placeholder="Tên Đăng nhập..." name="username" onChange={handleChange} />
                <label>Password</label>
                <input
                    type="password"
                    placeholder="Mật khẩu ..."
                    // autoComplete="off"
                    // // value={formCommentData}
                    name="password"
                    onChange={handleChange}
                />
                <button
                    onClick={() => {
                        login(formData);
                    }}
                >
                    Login
                </button>
            </div>
        </div>
    );
}

export default Login;
