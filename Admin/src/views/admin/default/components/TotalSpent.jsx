import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MdBarChart, MdPerson } from "react-icons/md";
import Card from "components/card";
import LineChart from "components/charts/LineChart";

const TotalSpent = () => {
  const [userData, setUserData] = useState({
    farmers: [],
    users: [],
    veterinarians: [],
  });

  const fetchData = async () => {
    try {
      const [farmersResponse, usersResponse, veterinariansResponse] = await Promise.all([
        axios.get('/get-farmers'),
        axios.get('/get-users'),
        axios.get('/get-veterinarians'),
      ]);

      const farmersData = farmersResponse.data;
      const usersData = usersResponse.data;
      const veterinariansData = veterinariansResponse.data;

      setUserData({
        farmers: farmersData,
        users: usersData,
        veterinarians: veterinariansData,
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const data = {
    labels: ['Farmers', 'Users', 'Veterinarians'],
    datasets: [
      {
        label: 'User Data',
        data: [
          userData.farmers.length,
          userData.users.length,
          userData.veterinarians.length,
        ],
        borderColor: 'blue',
        borderWidth: 2,
        fill: false,
      },
    ],
  };

  return (
    <Card extra="!p-[20px] text-center">
      <div className="flex justify-between">
        <button className="custom-button-style mt-1 flex items-center justify-center gap-2 rounded-lg bg-lightPrimary p-2 text-gray-600 transition duration-200 hover:cursor-pointer hover:bg-gray-100 active:bg-gray-200 dark:bg-navy-700 dark:hover:opacity-90 dark:active:opacity-80">
          <MdPerson />
          <span className="text-sm font-medium text-gray-600">Total User</span>
        </button>
        <button className="custom-button-style z-[1] flex items-center justify-center rounded-lg bg-lightPrimary p-2 text-brand-500 transition duration-200 hover:bg-gray-100 active:bg-gray-200 dark:bg-navy-700 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/10">
          <MdBarChart className="h-6 w-6" />
        </button>
      </div>

      <div className="flex h-full w-full flex-row justify-between sm:flex-wrap lg:flex-nowrap 2xl:overflow-hidden">
        <div className="h-full w-full">
          <LineChart data={data} />
        </div>
      </div>
    </Card>
  );
};

export default TotalSpent;
