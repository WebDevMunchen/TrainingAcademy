import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import ClassScheduleCard from "./ClassScheduleCard";

export default function ClassesSchedule() {
  const { allActivities } = useContext(AuthContext);

  return (
    <>
      <section className="w-10/12 mx-auto bg-blue-500ray-50">
        <div className="py-10 sm:py-16 block lg:py-12 relative bg-opacity-50  z-40">
          <div className="relative mx-auto h-full px-4 pb-20   md:pb-10 sm:max-w-xl md:max-w-full md:px-24 lg:max-w-screen-xl lg:px-8">
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 relative">
              <div className="max-w-xl mx-auto text-center">
                <div className="inline-flex px-4 py-1.5 mx-auto rounded-full  ">
                  <p className="text-4xl font-semibold tracking-widest text-g uppercase">
                    Übersciht April
                  </p>
                </div>
                <p className="mt-4 text-base leading-relaxed text-gray-600 group-hover:text-white">
                  Amet minim mollit non deserunt ullamco est sit aliqua dolor do
                  amet sint. Velit officia consequat duis enim velit mollit..
                </p>
              </div>
              <div className="grid grid-cols-1 gap-2 mt-12 sm:grid-cols-1 lg:mt-12 w-10/12 ml-auto mr-auto">
                {!allActivities ? (
                  <p>Loading</p>
                ) : (
                  allActivities?.map((activity) => {
                    return (
                      <ClassScheduleCard
                        key={activity._id}
                        activity={activity}
                      />
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
