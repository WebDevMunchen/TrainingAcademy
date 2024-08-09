import ReactApexChart from "react-apexcharts";
import axiosClient from "../../utils/axiosClient";
import { useEffect, useState } from "react";
import SideMenu from "./SideMenu";
import { NavLink } from "react-router-dom";

export default function PieCharStatisticsDecline() {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [options, setOptions] = useState({
    series: [],
    labels: [],
  });
  const [noStatistics, setNoStatistics] = useState(false);

  const getChartOptions = (labels = [], series = []) => {
    return {
      series,
      colors: [
        "#1C64F2",
        "#16BDCA",
        "#1F2937",
        "#e07f7f",
        "#7fe0ac",
        "#7fc1e0",
      ],
      chart: {
        height: 480,
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

  const fetchData = async (year) => {
    try {
      // Fetch all class activities
      const response = await axiosClient.get(`/classActivity/allActivities`);
      const data = response.data;
  
      const reasonCounts = {};
  
      data.forEach((activity) => {
        if (activity.year === year.toString()) {
          // Extract reasons from registeredUsers
          activity.registeredUsers.forEach((user) => {
            user.classesRegistered.forEach((reg) => {
              if (reg.reason) {
                reasonCounts[reg.reason.trim()] = (reasonCounts[reg.reason.trim()] || 0) + 1;
              }
            });
          });
        }
      });
  
      // Prepare labels and series for the chart
      const labels = Object.keys(reasonCounts);
      const series = Object.values(reasonCounts);
  
      if (series.length === 0) {
        setNoStatistics(true);
      } else {
        setOptions(getChartOptions(labels, series));
        setNoStatistics(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  

  useEffect(() => {
    fetchData(selectedYear);
  }, [selectedYear]);

  const handleYearChange = (event) => {
    setSelectedYear(Number(event.target.value));
  };

  return (
    <div className="bg-gray-50/50 flex">
      <SideMenu />
      <div className="mt-4 bg-white p-4 shadow rounded-lg h-[calc(93vh-32px)] w-10/12 mr-auto ml-auto">
        <div className="mx-auto mt-12 max-w-3xl w-full bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6">
          <div className="flex justify-between items-start w-full">
            <div className="flex-col items-center">
              <div className="flex-col items-center mb-1">
              <p className="text-xl py-1.5 px-2.5 font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">

                  Jahresüberischt
                </p>
                <select
                  value={selectedYear}
                  onChange={handleYearChange}
                  className="mt-2 px-2.5 ml-2 form-select bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"

                >
                  {[currentYear, currentYear - 1, currentYear - 2].map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex flex-col gap-1 mb-8">

                  <NavLink
                    to={"/admin/approverCancelationStatistic"}
                    className={
                      location.pathname === "/admin/approverCancelationStatistic"
                        ? "w-fit text-xl px-5 py-1.5 rounded-lg bg-[#293751] font-semibold leading-tight tracking-tight text-white md:text-2xl dark:text-white"
                        : "middle none  font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-sm py-3 rounded-lg text-white hover:bg-white/10 active:bg-white/30 w-full flex items-center gap-4 px-4 capitalize"
                    }
                  >
                    Ablehnungsstatistik
                  </NavLink>
                  <NavLink
                    to={"/admin/cancelationStatistic"}
                    className="text-xl py-1.5 px-2.5 font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
                  >
                    Stornierungsstatistik
                  </NavLink>
                </div>
          </div>
          <div className="flex justify-center mt-4">
            {noStatistics ? (
              <p className="flex items-center text-md h-[calc(40vh-32px)] text-3xl font-medium text-gray-600">
                Noch keine Statistik vorhanden
              </p>
            ) : (
              <ReactApexChart
                options={options}
                series={options.series}
                type="pie"
                height={480}
                width={680}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
