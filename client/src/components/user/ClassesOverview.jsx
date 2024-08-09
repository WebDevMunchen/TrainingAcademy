import { useContext, useState, useMemo } from "react";
import { AuthContext } from "../../context/AuthProvider";
import ClassesOverviewCard from "./ClassOverviewCard";

export default function ClassesOverview() {
  const { user } = useContext(AuthContext);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const compareDates = (a, b) => {
    const dateA = new Date(a?.registeredClassID?.date);
    const dateB = new Date(b?.registeredClassID?.date);
    return dateB - dateA;
  };

  const getYearFromDate = (date) => new Date(date).getFullYear();

  const filterByYear = (classes, year) => {
    return classes.filter((activity) => getYearFromDate(activity?.registeredClassID?.date) === year);
  };

  const years = useMemo(() => {
    if (!user?.classesRegistered) return [];
    const uniqueYears = Array.from(new Set(user.classesRegistered.map((activity) => getYearFromDate(activity?.registeredClassID?.date))));
    return uniqueYears.sort((a, b) => b - a);
  }, [user?.classesRegistered]);

  return (
    <section className="bg-blue-500ray-50">
      <div className="py-6 sm:py-16 block lg:py-8 relative bg-opacity-50">
        <div className="relative mx-auto h-full px-4 pb-20 md:pb-10 sm:max-w-xl md:max-w-full md:px-24 lg:max-w-screen-xl lg:px-8">
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 relative">
            <div className="max-w-xl mx-auto text-center">
              <div className="inline-flex px-4 py-1.5 mx-auto rounded-full">
                <p className="font-anek text-4xl font-semibold tracking-widest text-g uppercase">
                  Meine Schulungen
                </p>
              </div>
            </div>
            <div className="text-center">
              <div className="relative inline-flex mt-2 mb-2">
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
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(Number(e.target.value))}
                >
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-2 mt-12 sm:grid-cols-1 mt-2 lg:mt-2 sm:w-11/12 lg:w-10/12 mx-auto">
              {!user ? (
                <p>Loading</p>
              ) : (
                filterByYear(user.classesRegistered, selectedYear)
                  .slice()
                  .sort(compareDates)
                  .map((activity) => (
                    <ClassesOverviewCard
                      key={activity._id}
                      activity={activity}
                    />
                  ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
