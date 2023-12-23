import React from "react";
import Layout from "../components/Layout";
import { Col, Form, Input, Row, TimePicker } from "antd";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../redux/alertsSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function ApplyStaff() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/user/apply-staff-account",
        {
          ...values,
          userId: user._id,
        },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response);
      dispatch(hideLoading());
      if (response.data.success) {
        navigate("/");
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
    <Layout>
      <h1 className="page-title">Apply Staff</h1>
      <hr />

      <Form layout="vertical" onFinish={onFinish}>
        <h1 className="card-title mt-3">Personal Information</h1>
        <Row gutter={20}>
          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item
              label="First Name"
              name="firstName"
              rules={[{ required: true }]}
            >
              <Input placeholder="First Name"></Input>
            </Form.Item>
          </Col>
          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item
              label="Last Name"
              name="lastName"
              rules={[{ required: true }]}
            >
              <Input placeholder="Last Name"></Input>
            </Form.Item>
          </Col>
          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item label="Email" name="email" rules={[{ required: true }]}>
              <Input placeholder="Email"></Input>
            </Form.Item>
          </Col>
          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item label="Phone" name="phone" rules={[{ required: true }]}>
              <Input placeholder="Phone"></Input>
            </Form.Item>
          </Col>
          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item
              label="Address"
              name="address"
              rules={[{ required: true }]}
            >
              <Input placeholder="Address"></Input>
            </Form.Item>
          </Col>
        </Row>

        <hr />
        <h1 className="card-title mt-3">Professional Information</h1>
        <Row gutter={20}>
          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item
              label="Specialization"
              name="specialization"
              rules={[{ required: true }]}
            >
              <Input placeholder="Specialization"></Input>
            </Form.Item>
          </Col>
          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item
              label="Experience"
              name="experience"
              rules={[{ required: true }]}
            >
              <Input placeholder="Experience" type="number"></Input>
            </Form.Item>
          </Col>
          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item
              label="Work Hours"
              name="workHours"
              rules={[{ required: true }]}
            >
              <Input placeholder="Work Hours" type="number"></Input>
            </Form.Item>
          </Col>
          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item
              label="Timings"
              name="timings"
              rules={[{ required: true }]}
            >
              <TimePicker.RangePicker />
            </Form.Item>
          </Col>
        </Row>

        <div className="d-flex">
          <button className="primary-button" htmlType="sumbit">
            Apply
          </button>
        </div>
      </Form>
    </Layout>
  );
}

export default ApplyStaff;
