import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MiniCalendar from "components/calendar/MiniCalendar";
import WeeklyRevenue from "views/admin/default/components/WeeklyRevenue";
import TotalSpent from "views/admin/default/components/TotalSpent";
import PieChartCard from "views/admin/default/components/PieChartCard";

import { MdPerson, MdShoppingBag, MdShoppingCart } from "react-icons/md";

import Widget from "components/widget/Widget";

import { RiStockLine } from 'react-icons/ri';


const Dashboard = () => {
  const [userCount, setUserCount] = useState(null);
  const [Order, setOrdercount] = useState(null);
  const [Product, setProductcount] = useState(null);
  const [Inventory, setInventoryCount] = useState(null);




  useEffect(() => {
    fetchUserCount();
    fetchOrderCount()
    fetchProductCount()
    countInventory()
  }, []);


  const fetchUserCount = async () => {
    try {
      const response = await axios.get('/countUsers');
      setUserCount(response.data.count);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchOrderCount = async () => {
    try {
      const response = await axios.get('/countOrder');
      setOrdercount(response.data.count);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchProductCount = async () => {
    try {
      const response = await axios.get('/countProduct');
      setProductcount(response.data.count);
    } catch (error) {
      console.log(error);
    }
  };
  const countInventory = async () => {
    try {
      const response = await axios.get('/countInventory');
      setInventoryCount(response.data.count);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      {/* Card widget */}

      <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">
        <Widget
          icon={<MdPerson className="h-7 w-7" />}
          title={"Total User"}
          subtitle={userCount}
        />
        <Widget
          icon={<MdShoppingCart className="h-6 w-6" />}
          title={"Total Order's"}
          subtitle={Order}
        />
        <Widget
          icon={<MdShoppingBag className="h-7 w-7" />}
          title={"Total Product's ( Cattle Feed's )"}
          subtitle={Product}
        />
        <Widget
          icon={<RiStockLine className="h-6 w-6" />}
          title={"Total Stock's"}
          subtitle={Inventory}
        />

        {/* <Widget
          icon={<IoMdHome className="h-6 w-6" />}
          title={"Total Projects"}
          subtitle={"$2433"}
        /> */}
      </div>


      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
        <TotalSpent />
        <WeeklyRevenue />
      </div>


      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-2">
        <div></div>


        <div className="grid grid-cols-1 gap-5 rounded-[20px] md:grid-cols-2">
          {/* <DailyTraffic /> */}
          <PieChartCard />
        </div>



        <div className="grid grid-cols-1 gap-5 rounded-[20px] md:grid-cols-2">
          <div className="grid grid-cols-1 rounded-[20px]">
            <MiniCalendar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
