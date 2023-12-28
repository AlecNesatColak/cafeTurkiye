import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { Button } from "antd";

function Menu() {
  const [drinks, setDrinks] = useState([]);

  const addToCart = async () => {
    try {
      const response = await axios.post(
        "/api/drink/add-to-cart",
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      console.log(response, "");
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    // Fetch drinks data when the component mounts
    const fetchDrinks = async () => {
      try {
        const response = await axios.get("/api/drink/all-drinks");
        setDrinks(response.data.data);
      } catch (error) {
        console.error("Error fetching drinks:", error);
      }
    };

    fetchDrinks();
  }, []); // The empty dependency array ensures that this effect runs once when the component mounts

  return (
    <Layout>
      <h1>Menu</h1>
      <div className="flex">
        <ul>
          {drinks.map((drink) => (
            <li key={drink._id}>
              <h3>{drink.drinkName}</h3>
              <p>{drink.drinkDescription}</p>
              <p>${drink.drinkPrice}</p>
              <Button type="primary" onClick={()=>addToCart()}>Add</Button>
            </li>
          ))}
        </ul>
        
      </div>
    </Layout>
  );
}

export default Menu;
