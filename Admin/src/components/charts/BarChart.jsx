import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

const BarChart = (props) => {
  const [chartData, setChartData] = useState({
    labels: [],
    series: [],
  });

  useEffect(() => {
    const { orderData } = props;

    if (Array.isArray(orderData) && orderData.length > 0) {
      const productTitles = {};

      orderData.forEach((order) => {
        const productTitle = order.product.attributes.title;
        if (productTitles[productTitle]) {
          productTitles[productTitle] += order.productQuantity;
        } else {
          productTitles[productTitle] = order.productQuantity;
        }
      });

      const chartData = {
        labels: Object.keys(productTitles),
        series: [Object.values(productTitles)],
      };

      setChartData(chartData);
    }
  }, [props.orderData]);

  return (
    <ReactApexChart
      options={{
        xaxis: {
          categories: chartData.labels,
        },
      }}
      series={chartData.series}
      type="bar"
      height="100%"
    />
  );
};

export default BarChart;
