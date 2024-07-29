import ReactApexChart from "react-apexcharts";
import axiosClient from "../../utils/axiosClient";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import SideMenu from "./SideMenu";

const getChartOptions = (labels = [], series = []) => {
  return {
    series,
    colors: ["#1C64F2", "#16BDCA", "#1F2937", "#e07f7f", "#7fe0ac", "#7fc1e0"],
    chart: {
      height: 920,
      type: "pie",
    },
    stroke: {
      colors: ["white"],
    },
    plotOptions: {
      pie: {
        labels: {
          show: true,
        },
        size: "100%",
        dataLabels: {
          offset: -25,
        },
      },
    },
    labels,
    dataLabels: {
      enabled: true,
      style: {
        fontFamily: "Inter, sans-serif",
      },
    },
    legend: {
      position: "bottom",
      fontFamily: "Inter, sans-serif",
    },
  };
};

export default function PieChartSingle() {
  const { id } = useParams();

  const [activity, setActivity] = useState(null);
  const [options, setOptions] = useState({
    series: [],
    labels: []
  });

  useEffect(() => {
    axiosClient
      .get(`/classActivity/${id}`)
      .then((response) => {
        const data = response.data;
        setActivity(data);
        console.log(response.data)

        const reasonCounts = {};
        data.stornoReason.forEach((reason) => {
          reasonCounts[reason] = (reasonCounts[reason] || 0) + 1;
        });

        const labels = Object.keys(reasonCounts);
        const series = Object.values(reasonCounts);

        setOptions(getChartOptions(labels, series));
      })
      .catch((error) => {
        console.error("Error fetching activity data:", error);
      });
  }, [id]);

  return (
    <div className="bg-gray-50/50 flex">
        <SideMenu />
        <div className="mt-4 bg-white p-4 shadow rounded-lg h-[calc(93vh-32px)] w-10/12 mr-auto ml-auto">

    <div className="mx-auto mt-12 max-w-xl w-full bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6">
      <div className="flex justify-between items-start w-full">
        <div className="flex-col items-center">
          <div className="flex-col items-center mb-1">
            <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white me-1">
              Stornierungsstatistik
            </h5>
        <p className="mt-2 block antialiased text-md font-medium text-blue-gray-600 text-center">
          {activity?.title}
        </p>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-4">
        <ReactApexChart
          options={options}
          series={options.series}
          type="pie"
          height={920}
        />
      </div>
    </div>
    </div>
    </div>
  );
}
