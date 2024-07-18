import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import ClassScheduleCard from "./ClassScheduleCard";

export default function ClassesSchedule() {
  const { allActivities, handlePreviousMonth, handleNextMonth, currentMonth } =
    useContext(AuthContext);

  return (
    <>
      <section className="w-10/12 bg-blue-500ray-50 lg:mx-auto">
        <div className="py-6 sm:py-16 block lg:py-8 relative bg-opacity-50">
          <div className="relative mx-auto h-full px-4 pb-20   md:pb-10 sm:max-w-xl md:max-w-full md:px-24 lg:max-w-screen-xl lg:px-8">
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 relative">
              <div className="max-w-xl mx-auto text-center">
                <div className="flex justify-between items-center py-1.5 ml-0 rounded-full w-80 lg:w-full">
                  <button onClick={handlePreviousMonth}>
                    {" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-10 h-10 mr-2 mt-0.5 transition-transform duration-300 transform hover:scale-125"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-4.28 9.22a.75.75 0 0 0 0 1.06l3 3a.75.75 0 1 0 1.06-1.06l-1.72-1.72h5.69a.75.75 0 0 0 0-1.5h-5.69l1.72-1.72a.75.75 0 0 0-1.06-1.06l-3 3Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>

                  <p className="font-anek text-2xl font-semibold tracking-widest text-g uppercase mt-3 lg:text-4xl">
                    ÜBERSICHT {currentMonth}
                  </p>
                  <button onClick={handleNextMonth}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-10 h-10 ml-2 mt-0.5 transition-transform duration-300 transform hover:scale-125"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm4.28 10.28a.75.75 0 0 0 0-1.06l-3-3a.75.75 0 1 0-1.06 1.06l1.72 1.72H8.25a.75.75 0 0 0 0 1.5h5.69l-1.72 1.72a.75.75 0 1 0 1.06 1.06l3-3Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-2 mt-12 sm:grid-cols-1 mt-2 w-80 lg:mt-2 lg:w-10/12 mx-auto">
                {!allActivities ? (
                  <>
                    <img
                      className="mx-auto h-[calc(70vh-32px)] lg:hidden"
                      src="https://res.cloudinary.com/dtrymbvrp/image/upload/v1715669996/symbols/freepik-export-20240514065734UGY2_wpm9md.png"
                      alt="logo"
                    />
                    <img
                      className="hidden lg:inline mx-auto h-[calc(85vh-32px)]"
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
    </>
  );
}
