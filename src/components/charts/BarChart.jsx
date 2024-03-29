"use client";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import styles from "./chart.module.css";
import { Spinner } from "@nextui-org/react";

const BarChartComponent = ({ data, isLoading }) => {
  return (
    <div className={styles.container}>
      <div className={styles.title_wrapper}>
        <span className={styles.title}>Found & Lost each campus</span>
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center h-full">
          <Spinner label="Loading..." />
        </div>
      ) : (
        <ResponsiveContainer width="100%" height="90%">
          <BarChart
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
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="campNameEng" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="lost"
              fill="#8884d8"
              activeBar={<Rectangle fill="pink" stroke="blue" />}
            />
            <Bar
              dataKey="found"
              fill="#82ca9d"
              activeBar={<Rectangle fill="gold" stroke="purple" />}
            />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default BarChartComponent;
