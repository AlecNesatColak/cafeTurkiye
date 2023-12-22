import { Button, Form, Input } from "antd";
import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { hideLoading, showLoading } from "../redux/alertsSlice";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      dispatch(showLoading()); 
      const response = await axios.post("/api/user/register", values);
      console.log(response);
      dispatch(hideLoading());
      if (response.data.success) {
        toast("Redirecting to login page");
        navigate("/login");
        toast.success(response.data.msg);
      } else {
        toast.error(response.data.msg);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Internal server error");
    }
  };
  return (
    <div className="authentication">
      <div className="authentication-form card p-3">
        <h1 className="card-title">Welcome to the Cafe!</h1>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Name" name="name">
            <Input placeholder="Name"></Input>
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input placeholder="Email"></Input>
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input placeholder="Password" type="password"></Input>
          </Form.Item>
          <Form.Item label="Confirm Password" name="confirmPassword">
            <Input placeholder="Confirm Password" type="password"></Input>
          </Form.Item>
          <Button className="primary-button mt-3" htmlType="submit">
            Register
          </Button>

          <Link className="anchor mt-2" to='/login'>
            {" "}
            Already have an account? Login here.
          </Link>
        </Form>
      </div>
    </div>
  );
};

export default Register;
