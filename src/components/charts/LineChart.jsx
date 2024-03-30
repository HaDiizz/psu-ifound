"use client";

import styles from "./chart.module.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Spinner } from "@nextui-org/react";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-200/20 text-black p-5 rounded-lg flex flex-col dark:bg-slate-700/70 dark:text-white">
        <span className="text-small">{label}</span>
        <span className="text-tiny text-indigo-500 font-bold">{`Number of users : ${payload[0].value}`}</span>
      </div>
    );
  }

  return null;
};

const LineChartComponent = ({ data, isLoading }) => {
  return (
    <div className={styles.container}>
      <div className={styles.title_wrapper}>
        <span className={styles.title}>User Registration Weekly Recap</span>
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center h-full">
          <Spinner label="Loading..." />
        </div>
      ) : (
        <ResponsiveContainer width="100%" height="90%">
          <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <XAxis dataKey="_id" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line
              type="monotone"
              dataKey="user"
              stroke="#8884d8"
              strokeDasharray="5 5"
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default LineChartComponent;
