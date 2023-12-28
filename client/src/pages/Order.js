import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Button, Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { hideLoading, showLoading } from "../redux/alertsSlice";

function Order() {
  const [orders, setOrders] = useState([]);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const createOrder = async (values) => {
    try {
      dispatch(showLoading());
      const token = localStorage.getItem("token");
      console.log("Token:", token);
      const response = await axios.post(
        "/api/order/create-order",
        {
          ...values,
          userId: user._id,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      toast.success(response.data.msg);
      dispatch(hideLoading());
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Internal server error");
    }
  };

  const deleteDrink = async (values) => {
    try {
      
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Internal server error");
    }
  }

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("/api/order/all-orders", {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log("Orders Response:", response);
        setOrders(response.data.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <Layout>
      <div>
        <h1 className="p-2">Orders</h1>
        <Form onFinish={createOrder}>
          <Form.Item
            name="orderName"
            rules={[{ required: true, message: "Please enter the order name" }]}
          >
            <Input placeholder="Order Name" />
          </Form.Item>

          <Button type="primary" htmlType="submit">
            Create a new order
          </Button>
        </Form>
      </div>
      <hr />
      <div>
        <h1 className="p-2">Existing Orders</h1>
        <div className="">
          {orders.map((order) => (
            <div className="" key={order._id}>
              <h3>Order Name: {order.orderName}</h3>
              <ul className="">
                {order.drinks.map((drinkInfo) => (
                  <div className="border">
                    <li key={drinkInfo.drink._id}>
                      {console.log("DrinkInfo:", drinkInfo)}
                      {/* Log drinkInfo for debugging */}
                      <p>Drink Name: {drinkInfo.drink.drinkName}</p>
                      <p>Drink Price: ${drinkInfo.drink.drinkPrice}</p>
                      <p>Drink Description: {drinkInfo.drink.drinkDescription}</p>
                      <p>Quantity: {drinkInfo.quantity}</p>
                    </li>
                    <Button type="primary" htmlType="submit" onClick={()=>deleteDrink()}>Delete</Button>
                  </div>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

// Helper function to format order date
function formatOrderDate(date) {
  // You can use a library like moment.js for more advanced formatting
  return new Date(date).toLocaleDateString();
}

export default Order;
