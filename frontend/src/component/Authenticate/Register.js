import React, { useState } from "react";
import {
    Form,
    Input,
    Button,
    DatePicker,
} from 'antd';
import { withRouter, Redirect } from 'react-router-dom'
import FirebaseController from '../../firebase.js'


const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 8,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 8,
    },
};

function Register(props) {
    if (props.isLoggedIn) {
        props.history.push('/');
    }
    var success = false

    const onFinish = async (values) => {
        try {
            await FirebaseController.register(values.email, values.password, values.nickname, values.birthday);
            success = true;
        } catch (error) {
            alert(error.message)
        }

        if (success === true) {
            alert('Success');
            props.history.push('/login');
        }
    };
    const onFinishFailed = (errorInfo) => {
        alert("Something went wrong. Try again")
        // console.log("Failed:", errorInfo);
    };

    return (
        <div>
            <br></br>
            <br></br>
            <Form
                {...layout}
                name="basic"
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: "Please input your email!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Nickname"
                    name="nickname"
                    rules={[
                        {
                            required: true,
                            message: "Please input your nickname!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    label="Birthday"
                    name="birthday"
                    rules={[
                        {
                            required: true,
                            message: 'Please choose your birthday!',
                        },
                    ]}
                >
                    <DatePicker />
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        Register
                    </Button>
                    <br></br>
                    <Button type="link" href="/login">
                        Go to Login
                    </Button>
                </Form.Item>
            </Form>
        </div >
    );
};

export default withRouter(Register);
