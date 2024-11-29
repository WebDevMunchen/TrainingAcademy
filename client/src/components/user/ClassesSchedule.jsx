import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import ClassScheduleCard from "./ClassScheduleCard";

export default function ClassesSchedule() {
  const {
    allActivities,
    handleNextMonth,
    handlePreviousMonth,
    handleYearChange,
    currentMonth,
    currentYear,
  } = useContext(AuthContext);

  const startYear = 2023;
  const years = Array.from({ length: 7 }, (_, i) =>
    (startYear + i).toString()
  );

  return (
    <section className="bg-blue-500ray-50 lg:mx-auto">
      <div className="py-6 sm:py-16 block lg:py-8 relative bg-opacity-50">
        <div className="relative mx-auto h-full pb-20 md:pb-10 sm:max-w-xl md:max-w-full md:px-24 lg:max-w-screen-xl lg:px-8">
          <div className="mx-auto sm:px-6 lg:px-8 relative">
            <div className="flex justify-center max-w-xl mx-auto text-center">
              <p className="text-center font-poppins text-2xl font-semibold tracking-widest text-g uppercase mt-3 mb-1 lg:text-4xl lg:w-fit">
                ÜBERSICHT {currentMonth}
              </p>
            </div>
            <div className="flex gap-3 justify-center items-center py-1.5 ml-0 rounded-full lg:w-full">
              <button onClick={handlePreviousMonth}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-10 h-10 mr-2 transition-transform duration-300 transform hover:scale-125"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-4.28 9.22a.75.75 0 0 0 0 1.06l3 3a.75.75 0 1 0 1.06-1.06l-1.72-1.72h5.69a.75.75 0 0 0 0-1.5h-5.69l1.72-1.72a.75.75 0 0 0-1.06-1.06l-3 3Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <div className="relative inline-flex ">
                <svg
                  className="w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 412 232"
                >
                  <path
                    d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z"
                    fill="#648299"
                    fillRule="nonzero"
                  />
                </svg>
                <select
                  className="border border-gray-300 rounded-full text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none"
                  value={currentYear}
                  onChange={handleYearChange}
                >
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
              <button onClick={handleNextMonth}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-10 h-10 ml-2 transition-transform duration-300 transform hover:scale-125"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm4.28 10.28a.75.75 0 0 0 0-1.06l-3-3a.75.75 0 1 0-1.06 1.06l1.72 1.72H8.25a.75.75 0 0 0 0 1.5h5.69l-1.72 1.72a.75.75 0 1 0 1.06 1.06l3-3Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
            <div className="grid grid-cols-1 gap-2 mt-12 sm:grid-cols-1 mt-2 w-11/12 lg:mt-2 lg:w-11/12 mx-auto">
              {allActivities.length === 0 ? (
                <>
                  <img
                    className="mx-auto h-[calc(70vh-32px)] w-[calc(80vh-52px)] lg:hidden"
                    src="https://res.cloudinary.com/dtrymbvrp/image/upload/v1715669996/symbols/freepik-export-20240514065734UGY2_wpm9md.png"
                    alt="logo"
                  />
                  <img
                    className="hidden lg:inline mx-auto h-[calc(70vh-32px)] w-[calc(70vh-32px)]"
                    src="https://res.cloudinary.com/dtrymbvrp/image/upload/v1715669996/symbols/freepik-export-20240514065734UGY2_wpm9md.png"
                    alt="logo"
                  />
                </>
              ) : (
                allActivities.map((activity) => (
                  <ClassScheduleCard key={activity._id} activity={activity} />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
