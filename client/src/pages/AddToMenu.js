import React from "react";
import Layout from "../components/Layout";
import { Col, Form, Input, Row, TimePicker } from "antd";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../redux/alertsSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function AddToMenu() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    console.log(values);
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/drink/add-to-menu",
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
      <h1 className="page-title">Add a Drink to the Menu</h1>
      <hr />

      <Form layout="vertical" onFinish={onFinish}>
        <h1 className="card-title mt-3">Drink Information</h1>
        <Row gutter={20}>
          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item
              label="Drink Name"
              name="drinkName"
              rules={[{ required: true }]}
            >
              <Input placeholder="Drink Name"></Input>
            </Form.Item>
          </Col>
          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item
              label="Drink Price"
              name="drinkPrice"
              rules={[{ required: true }]}
            >
              <Input placeholder="Drink Price"></Input>
            </Form.Item>
          </Col>
          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item
              label="Drink Description"
              name="drinkDescription"
              rules={[{ required: true }]}
            >
              <Input placeholder="Drink Description"></Input>
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </Form.Item>
      </Form>
    </Layout>
  );
}

export default AddToMenu;
