import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './Login.scss';
import { useNavigate } from 'react-router-dom';
function Login() {
    const form = {
        username: '',
        password: '',
    };
    const [formData, setFormData] = useState({ ...form });
    const navigate = useNavigate();
    const handleChange = (e) => {
        setFormData((p) => {
            // console.log('+++++++', { ...p, [e.target.name]: e.target.value });
            return { ...p, [e.target.name]: e.target.value };
        });
    };
    const login = (data) => {
        console.log(data);
        axios.post(`http://localhost:3001/auth/login`, data).then((response) => {
            // console.log('========', response.data);
            if (response.data.error) {
                alert(response.data.error);
            } else {
                sessionStorage.setItem('accessToken', response.data);
                navigate("/")
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
