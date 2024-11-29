import { useContext, useState, useMemo } from "react";
import { AuthContext } from "../../context/AuthProvider";
import ClassesOverviewCard from "./ClassOverviewCard";

export default function ClassesOverview() {
  const { user } = useContext(AuthContext);

  const currentYear = new Date().getFullYear();

  const { years, defaultYear } = useMemo(() => {
    if (!user?.classesRegistered)
      return { years: [], defaultYear: currentYear };

    const uniqueYears = Array.from(
      new Set(
        user.classesRegistered.map(
          (activity) => activity?.registeredClassID?.year
        )
      )
    ).sort((a, b) => a - b);

    const defaultYear = uniqueYears.includes(String(currentYear))
      ? currentYear
      : uniqueYears[0];

    return {
      years: uniqueYears,
      defaultYear,
    };
  }, [user?.classesRegistered]);

  const [selectedYear, setSelectedYear] = useState(defaultYear);

  const filterByYear = (classes, year) => {
    return classes.filter(
      (activity) => activity?.registeredClassID?.year === String(year)
    );
  };

  const compareDates = (a, b) => {
    const dateA = a?.registeredClassID?.date
      ? new Date(a.registeredClassID.date)
      : 0;
    const dateB = b?.registeredClassID?.date
      ? new Date(b.registeredClassID.date)
      : 0;
    return dateB - dateA;
  };

  return (
    <section className="bg-blue-500ray-50">
      <div className="py-6 sm:py-16 block lg:py-8 relative bg-opacity-50">
        <div className="relative mx-auto h-full px-2 pb-20 md:pb-10 sm:max-w-xl md:max-w-full md:px-24 lg:max-w-screen-xl lg:px-8">
          <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 relative">
            <div className="max-w-xl mx-auto text-center">
              <div className="inline-flex px-4 py-1.5 mx-auto rounded-full">
                <p className="font-marcellus text-4xl font-semibold tracking-widest text-g uppercase">
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
                  onChange={(e) => {
                    const selected = Number(e.target.value);
                    setSelectedYear(selected);
                  }}
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
                <div className="flex mt-8 justify-center">
                  <div className="relative">
                    <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-200"></div>
                    <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-blue-500 animate-spin"></div>
                  </div>
                </div>
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
