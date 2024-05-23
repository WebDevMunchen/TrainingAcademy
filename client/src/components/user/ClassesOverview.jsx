import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import ClassesOverviewCard from "./ClassOverviewCard";

export default function ClassesOverview() {
  const { user } = useContext(AuthContext);

  const compareDates = (a, b) => {
    const dateA = new Date(a?.registeredClassID?.date);
    const dateB = new Date(b?.registeredClassID?.date);
    return dateB - dateA;
  };

  return (
    <>
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
              <div className="grid grid-cols-1 gap-2 mt-12 sm:grid-cols-1 mt-2 lg:mt-2 sm:w-11/12 lg:w-10/12 mx-auto">
                {!user ? (
                  <p>Loading</p>
                ) : (
                  user.classesRegistered
                    .slice()
                    .sort(compareDates)
                    .map((activity) => {
                      return (
                        <ClassesOverviewCard
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
