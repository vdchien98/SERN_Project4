import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import '../pages/Registration.scss';
import { useNavigate } from 'react-router-dom';

function Registration() {
    const initialValues = {
        username: '',
        password: '',
    };
    const schema = yup.object().shape({
        username: yup.string().min(3).max(255).required('Bạn phải nhập tên đăng ký'),
        password: yup.string().min(4).max(255).required('Bạn phải nhập mật khẩu '),
    });
    const navigate = useNavigate();
    const onSubmit = (data) => {
        // console.log(data);
        axios.post('http://localhost:3001/auth', data).then((response) => {
            console.log(data);
            navigate('/login');
        });
    };
    return (
        <div className="createPostPage">
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                // autocomplete="off"={ }
                validationSchema={schema}
            >
                <Form className="formContainer">
                    <label>Username : </label>
                    <ErrorMessage name="username" component="span" />
                    <Field autocomplete="off" id="inputCreatePost" name="username" placeholder="(Ex.DangChien)"></Field>
                    <label>Password : </label>
                    <ErrorMessage name="password" component="span" />
                    <Field type="password" autocomplete="off" id="inputCreatePost" name="password" placeholder="(Ex.123456789)"></Field>
                    <button type="submit">Đăng Ký</button>
                </Form>
            </Formik>
        </div>
    );
}

export default Registration;
