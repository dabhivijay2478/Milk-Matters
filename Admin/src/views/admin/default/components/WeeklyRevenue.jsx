import React, { useEffect, useState } from "react";
import Card from "components/card";

import axios from "axios";
import BarChart from "components/charts/BarChart";
import { MdBarChart, MdShoppingBag } from "react-icons/md";

const WeeklyRevenue = () => {
  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    axios.get("/get-orders")
      .then((response) => {
        const orders = response.data.orders;
        if (Array.isArray(orders) && orders.length > 0) {
          setOrderData(orders);
        } else {
          console.error("No orders data received.");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <Card extra="flex flex-col bg-white w-full rounded-3xl py-6 px-2 text-center">
      <div className="flex justify-between">
        <button className="custom-button-style mt-1 flex items-center justify-center gap-2 rounded-lg bg-lightPrimary p-2 text-gray-600 transition duration-200 hover:cursor-pointer hover:bg-gray-100 active:bg-gray-200 dark:bg-navy-700 dark:hover:opacity-90 dark:active:opacity-80">
          <MdShoppingBag />
          <span className="text-sm font-medium text-gray-600">Total Order's</span>
        </button>
        <button className="custom-button-style z-[1] flex items-center justify-center rounded-lg bg-lightPrimary p-2 text-brand-500 transition duration-200 hover:bg-gray-100 active:bg-gray-200 dark:bg-navy-700 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/10">
          <MdBarChart className="h-6 w-6" />
        </button>
      </div>

      <div className="md:mt-16 lg:mt-0">
        <div className="h-[250px] w-full xl:h-[350px]">
          <BarChart orderData={orderData} />
        </div>
      </div>
    </Card>
  );
};

export default WeeklyRevenue;
