import React, { useEffect, useState } from "react";
import axios from "axios";
import Products from "./components/Products";
import UserTable from "./components/UserTable";
import Orders from "./components/Orders";
import Stocks from "./components/Stocks";
import { columnsUser, columnsProducts, columnsOrders, columnsStocks } from "./variables/columnsData";

const Tables = () => {
  const [userData, setUserData] = useState([]);
  const [productData, setProductData] = useState([]);
  const [orderData, setOrderData] = useState([]);
  const [stockData, setStockData] = useState([]);

  useEffect(() => {
    fetchUserData();
    fetchProductData();
    fetchOrdersData();
    fetchStockData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await axios.get("/get-users");
      setUserData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchProductData = async () => {
    try {
      const response = await axios.get("/get-products");
      setProductData(response.data.products);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchOrdersData = async () => {
    try {
      const response = await axios.get("/get-orders");
      setOrderData(response.data.orders);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchStockData = async () => {
    try {
      const response = await axios.get("/get-inventory");
      setStockData(response.data.inventoryItems);
    } catch (error) {
      console.error(error);
    }
  };

  const Refresh = () => {
    fetchUserData();
    fetchProductData();
    fetchOrdersData();
    fetchStockData();
  };

  return (
    <div>
      <div className="mt-5">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={Refresh}
        >
          Refresh
        </button>
      </div>
      <div className="mt-5 grid h-full grid-cols-1 gap-5 md:grid-cols-2">
        <UserTable columnsData={columnsUser} tableData={userData} />
        <Products columnsData={columnsProducts} tableData={productData} />
      </div>

      <div className="mt-5 grid h-full grid-cols-1 gap-5 md:grid-cols-2">
        <Orders columnsData={columnsOrders} tableData={orderData} />
        <Stocks columnsData={columnsStocks} tableData={stockData} />
      </div>
    </div>
  );
};

export default Tables;
