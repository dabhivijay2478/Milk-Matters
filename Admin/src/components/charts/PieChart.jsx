import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = (props) => {
  const { series, labels } = props;
  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Products',
        data: series,
        backgroundColor: [
          '#5A67D8',
          '#F8FAFC',
          '#F1F5F9',
          '#E2E8F0',
          '#CBD5E1',
          '#94A3B8',
          '#64748B',
          '#475569',
          '#334155',
          '#1E293B',
          '#0F172A',
          '#020617',
        ],
        borderColor: [
          '#5A67D8',
          '#F8FAFC',
          '#F1F5F9',
          '#E2E8F0',
          '#CBD5E1',
          '#94A3B8',
          '#64748B',
          '#475569',
          '#334155',
          '#1E293B',
          '#0F172A',
          '#020617',
        ],
        borderWidth: 1,
      },
    ],
  };
  return <Pie data={data} />;
};


export default PieChart;
