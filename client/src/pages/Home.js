import React, { useEffect } from "react";
import axios from "axios";
import Layout from "../components/Layout";

function Home() {
  const getData = async () => {
    try {
      const response = await axios.post(
        "/api/user/get-user-info-by-id",
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
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Layout>
        <h1>Favorites</h1>
        <div className="header"></div>
        <h1>My Orders</h1>
        <div className="header"></div>
        <h1>My Cart</h1>
        <div className="header"></div>
    </Layout>
  )
}

export default Home;
