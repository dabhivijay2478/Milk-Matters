import React, { useState, useEffect } from 'react';
import Card from 'components/card';
import axios from 'axios';
import PieChart from 'components/charts/PieChart';

const PieChartCard = () => {
  const [chartData, setChartData] = useState({
    series: [],
    labels: [],
  });

  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    axios
      .get('/get-products')
      .then((response) => {
        const products = response.data.products;

        // Group products by title and count the number of products with the same title
        const productCounts = products.reduce((countMap, product) => {
          const title = product.attributes.title;
          countMap[title] = (countMap[title] || 0) + 1;
          return countMap;
        }, {});

        // Extract product titles as labels and counts as data
        const labels = Object.keys(productCounts);
        const series = Object.values(productCounts);

        setChartData({
          series,
          labels,
        });

        setLoading(false); // Set loading to false when data is available
      })
      .catch((error) => {
        console.error(error);
        setLoading(false); // Set loading to false in case of an error
      });
  }, []);

  return (
    <Card extra="rounded-[20px] p-3">
      <div className="flex flex-row justify-between px-3 pt-2">
        <div>
          <h4 className="text-lg font-bold text-navy-700 dark:text-white">
            Cattle Feed
          </h4>
        </div>


      </div>
      <div className="mb-auto flex h-[220px] w-full items-center justify-center">
        {loading ? ( // Show loading indicator while data is being fetched
          <p>Loading...</p>
        ) : (
          <PieChart series={chartData.series} labels={chartData.labels} />
        )}
      </div>
    </Card>
  );
};

export default PieChartCard;
