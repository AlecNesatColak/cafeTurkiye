import { Button, Form, Input } from "antd";
import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { hideLoading, showLoading } from "../redux/alertsSlice";

const Login = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      dispatch(showLoading())
      const response = await axios.post("/api/user/login", values);
      dispatch(hideLoading())
      if (response.data.success) {
        toast.success(response.data.msg);
        toast("Redirecting to home page");
        localStorage.setItem("token", response.data.data);
        Navigate("/");
      } else {
        toast.error(response.data.msg);
      }
    } catch (error) {
      dispatch(hideLoading())
      toast.error("Internal server error");
    }
  };
  return (
    <div className="authentication">
      <div className="authentication-form card p-3">
        <h1 className="card-title">Welcome Back!</h1>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Email" name="email">
            <Input placeholder="Email"></Input>
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input placeholder="Password" type="password"></Input>
          </Form.Item>
          <Button className="primary-button mt-3" htmlType="submit">
            Login
          </Button>

          <Link className="anchor mt-2" to="/register">
            {" "}
            Don't have an account? Register for one here.
          </Link>
        </Form>
      </div>
    </div>
  );
};

export default Login;
