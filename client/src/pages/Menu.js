import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { Button, Select } from "antd";
import axios from "axios";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Option } from "antd/es/mentions";

function Menu() {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [existingOrders, setExistingOrders] = useState([]);
  const [drinks, setDrinks] = useState([]);

  const addToOrder = async (selectedOrder, drinkId, drinkName) => {
    try {
      const response = await axios.post(
        "/api/order/add-to-order",
        {
          orderName: selectedOrder,
          drinkId,
          drinkName,
        },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response);
      toast.success("Drink added to order successfully");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch existing orders
        const ordersResponse = await axios.get("/api/order/all-orders", {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setExistingOrders(ordersResponse.data.data);

        // Fetch drinks
        const drinksResponse = await axios.get("/api/drink/all-drinks");
        setDrinks(drinksResponse.data.data);

        toast.success("Data fetched successfully");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to ensure the effect runs once when the component mounts

  return (
    <Layout>
      <h1>Menu</h1>
      <div className="flex">
        <Select
          placeholder="Select an existing order or create a new one"
          value={selectedOrder}
          onChange={(value) => setSelectedOrder(value)}
        >
          <Option value={null}>Create a new order</Option>
          {existingOrders.map((order) => (
            <Option key={order._id} value={order.orderName}>
              {order.orderName}
            </Option>
          ))}
        </Select>

        <ul>
          {drinks?.map((drink) => (
            <li key={drink._id}>
              <div className="border p-3 flex">
                <h3>{drink.drinkName}</h3>
                <p>{drink.drinkDescription}</p>
                <p>${drink.drinkPrice}</p>
                <Button
                  type="primary"
                  onClick={() =>
                    addToOrder(selectedOrder, drink._id, drink.drinkName)
                  }
                >
                  Add
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
}

export default Menu;
