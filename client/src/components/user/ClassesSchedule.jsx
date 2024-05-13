import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import ClassScheduleCard from "./ClassScheduleCard";

export default function ClassesSchedule() {
  const { allActivities, handlePreviousMonth, handleNextMonth, currentMonth } =
    useContext(AuthContext);

  return (
    <>
      <section className="w-10/12 mx-auto bg-blue-500ray-50">
        <div className="py-10 sm:py-16 block lg:py-12 relative bg-opacity-50  z-40">
          <div className="relative mx-auto h-full px-4 pb-20   md:pb-10 sm:max-w-xl md:max-w-full md:px-24 lg:max-w-screen-xl lg:px-8">
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 relative">
              <div className="max-w-xl mx-auto text-center">
                <div className="inline-flex py-1.5 mx-auto rounded-full  ">
                  <button onClick={handlePreviousMonth}>
                    {" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-10 h-10 mr-2 mt-0.5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-4.28 9.22a.75.75 0 0 0 0 1.06l3 3a.75.75 0 1 0 1.06-1.06l-1.72-1.72h5.69a.75.75 0 0 0 0-1.5h-5.69l1.72-1.72a.75.75 0 0 0-1.06-1.06l-3 3Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>

                  <p className="text-4xl font-semibold tracking-widest text-g uppercase">
                    Übersciht {currentMonth}
                  </p>
                  <button onClick={handleNextMonth}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-10 h-10 ml-2 mt-0.5"
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
              <div className="grid grid-cols-1 gap-2 mt-12 sm:grid-cols-1 lg:mt-12 w-10/12 ml-auto mr-auto">
                {!allActivities ? (
                  <p>Loading</p>
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
