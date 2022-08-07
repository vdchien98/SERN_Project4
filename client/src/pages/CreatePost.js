import React from 'react';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import '../pages/CreatePost.scss';
import { useNavigate } from 'react-router-dom';

function CreatePost() {
    let navigate = useNavigate();

    const initialValues = {
        title: '',
        postText: '',
        username: '',
    };
    const schema = yup.object().shape({
        title: yup.string().required('Bạn phải nhập tiêu đề '),
        postText: yup.string().required('Bạn phải nhập nội dung '),
        username: yup.string().min(3).max(255).required('Bạn phải nhập tên tác giác'),
    });
    const onSubmit = (data) => {
        // console.log(data);
        axios
            .post('http://localhost:3001/posts', data, {
                headers: {
                    accessToken: sessionStorage.getItem('accessToken'),
                },
            })
            .then((response) => {
                if (response.data.error) {
                    alert('Bạn chưa đăng nhập ', response.data.error);
                    navigate(`/login`);
                } else {
                    navigate(`/`);
                }
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
                    <label>Title : </label>
                    <ErrorMessage name="title" component="span" />
                    <Field autocomplete="off" id="inputCreatePost" name="title" placeholder="(Ex.Tình yêu)"></Field>
                    <label>Post : </label>
                    <ErrorMessage name="postText" component="span" />
                    <Field autocomplete="off" id="inputCreatePost" name="postText" placeholder="(Ex.postText)"></Field>
                    <label>Username : </label>
                    <ErrorMessage name="username" component="span" />
                    <Field autocomplete="off" id="inputCreatePost" name="username" placeholder="(Ex.DangChien)"></Field>
                    <button type="submit">Submit</button>
                </Form>
            </Formik>
        </div>
    );
}

export default CreatePost;
