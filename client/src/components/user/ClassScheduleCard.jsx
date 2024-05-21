import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { useForm } from "react-hook-form";
import axiosClient from "../../utils/axiosClient";
import { NavLink } from "react-router-dom";

export default function ClassScheduleCard({ activity }) {
  const { setUser, user, setAllActivities, currentMonth } = useContext(AuthContext);
  const { handleSubmit } = useForm();

  const onSubmit = () => {
    axiosClient
      .put(`/classActivity/registerClass/${activity._id}`, { withCredentials: true })
      .then((response) => {
        return axiosClient.get("/user/profile");
      })
      .then((responseProfile) => {
        setUser(responseProfile.data);
        return axiosClient.get(`/classActivity/allActivities?month=${currentMonth}`);
      })
      .then((responseActivities) => {
        setAllActivities(responseActivities.data);
      })
      .catch((error) => {
      });
  };

  const dateString = activity.date;
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const formattedDate = `${day}/${month}/${year}`;

  const activityDate = new Date(activity.date);
  const activityTime = activity.time.split(":");
  activityDate.setHours(activityTime[0], activityTime[1]);

  const currentTime = new Date();
  const oneDayBeforeActivity = new Date(activityDate.getTime() - 24 * 60 * 60 * 1000);

  const activityDatePassed = currentTime > activityDate;
  const oneDayPrior = currentTime > oneDayBeforeActivity && currentTime < activityDate;

  return (
    <>
      <div className="m-2 bg-white border p-4 relative group shadow-lg">
        <div className="absolute bg-blue-500/50 top-0 left-0 w-24 h-1 transition-all duration-200 group-hover:bg-orange-300 group-hover:w-1/2"></div>
        <div className="py-2 relative">
          <div className="flex justify-between">
            <p className="hidden lg:inline text-white">Placeholder longer</p>
            <h3 className="hidden lg:flex justify-center text-lg font-semibold text-black">
              {activity.title}
            </h3>
            <h3 className="flex justify-center mx-auto text-lg font-semibold text-black lg:hidden">
              {activity.title}
            </h3>
            <p className="hidden lg:inline font-semibold">
              Freie Plätze:{" "}
              {activity.capacity - activity.usedCapacity > 5 ? (
                <span className="shrink-0 rounded-full bg-emerald-500 px-3 font-mono text-md font-medium tracking-tight text-white">
                  {activity.capacity - activity.usedCapacity}
                </span>
              ) : (
                <span className="shrink-0 rounded-full bg-red-500 px-3 font-mono text-md font-medium tracking-tight text-white">
                  {activity.capacity - activity.usedCapacity}
                </span>
              )}
            </p>

          </div>
          <p className="font-semibold flex justify-center gap-2 lg:hidden">
              Freie Plätze:{" "}
              {activity.capacity - activity.usedCapacity > 5 ? (
                <span className="shrink-0 rounded-full bg-emerald-500 px-3 font-mono text-md font-medium tracking-tight text-white">
                  {activity.capacity - activity.usedCapacity}
                </span>
              ) : (
                <span className="shrink-0 rounded-full bg-red-500 px-3 font-mono text-md font-medium tracking-tight text-white">
                  {activity.capacity - activity.usedCapacity}
                </span>
              )}
            </p>
          <div className="flex justify-center mt-2 mb-1">
            <p>Ziel Gruppe</p>
          </div>
          <div className="flex justify-center gap-2">
            {activity.department.map((image, index) => {
              return <img key={index} src={image} alt="logo" className="w-12 h-12" />;
            })}
          </div>
          <p className="text-center lg:flex justify-center mt-4 text-base text-gray-600">
            {activity.description}
          </p>
          <div className="grid grid-cols-3 grid-rows-1 gap-2 text-center lg:gap-0 lg:text-left justify-items-center">
            <div className="flex flex-col">
            <p className="mt-4 text-base text-gray-600 lg:hidden">
                <span className="font-bold">Kapazität:</span>{" "}
                {activity.capacity + " Teilneh."}
              </p>
              <p className="hidden lg:inline mt-4 text-base text-gray-600">
                <span className="font-bold">Kapazität:</span>{" "}
                {activity.capacity + " Teilnehmer"}
              </p>
              <p className="mt-4 text-base text-gray-600">
                <span className="font-bold">Datum:</span> {formattedDate}
              </p>
            </div>
            <div className="flex flex-col">
              <p className="mt-4 text-base text-gray-600">
                <span className="font-bold">Uhrzeit:</span> {activity.time}
              </p>
              <p className="mt-4 text-base text-gray-600 lg:hidden">
                <span className="font-bold">Dauer:</span>{" "}<br />
                {activity.duration + " Min."}
              </p>
              <p className="hidden lg:inline mt-4 text-base text-gray-600">
                <span className="font-bold">Dauer:</span>{" "}
                {activity.duration + " Min."}
              </p>
            </div>
            <div className="flex flex-col">
              <p className="mt-4 text-base text-gray-600">
                <span className="font-bold">Location:</span> {activity.location}
              </p>
              <p className="mt-4 text-base text-gray-600">
                <span className="font-bold">Lehrer:</span> {activity.teacher}
              </p>
            </div>
          </div>

          <div className="flex justify-center">
            {user.role === "user" &&
              !activityDatePassed &&
              !oneDayPrior &&
              (activity.capacity - activity.usedCapacity !== 0 ? (
                <form onSubmit={handleSubmit(onSubmit)}>
                  <input
                    type="submit"
                    className={`bg-gradient-to-b from-gray-700 to-gray-900 font-medium p-2 mt-3 md:p-2 text-white uppercase rounded cursor-pointer font-medium transition ${
                      activity.registeredUsers.some((userObj) => userObj._id === user._id)
                        ? "cursor-not-allowed"
                        : "hover:shadow-lg hover:-translate-y-0.5"
                    }`}
                    value={
                      activity.registeredUsers.some((userObj) => userObj._id === user._id)
                        ? "Bereits Angemeldet"
                        : "Anmelden"
                    }
                    disabled={activity.registeredUsers.some((userObj) => userObj._id === user._id)}
                  />
                </form>
              ) : (
                <button
                  className="mt-8 bg-gradient-to-b from-red-500 to-red-700 font-medium p-2 mt-2 md:p-2 text-white uppercase rounded cursor-not-allowed"
                  disabled
                >
                  Kapazität Voll
                </button>
              ))}
            {user.role === "user" && (activityDatePassed || oneDayPrior) && (
              <button
                className="mt-8 bg-gradient-to-b from-blue-500 to-blue-700 font-medium p-2 mt-2 md:p-2 text-white uppercase rounded cursor-not-allowed"
                disabled
              >
                Registrierung abgeschlossen
              </button>
            )}
          </div>

          <div className="flex justify-center">
            {(user.role === "ASP" || user.role === "admin" || user.role === "teacher") && (
              <NavLink
                to={`/classInformation/${activity._id}`}
                className="w-fit bg-gradient-to-b from-gray-700 to-gray-900 font-medium p-2 mt-3 md:p-2 text-white uppercase w-1/2 rounded cursor-pointer hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
              >
                Details Anzeigen
              </NavLink>
            )}
          </div>
          <div className="flex justify-center">
            {(user.role === "ASP" || user.role === "admin") &&
              !activityDatePassed &&
              !oneDayPrior &&
              (activity.capacity - activity.usedCapacity !== 0 ? (
                <form onSubmit={handleSubmit(onSubmit)}>
                  <input
                    type="submit"
                    className={`bg-gradient-to-b from-gray-700 to-gray-900 font-medium p-2 mt-3 md:p-2 text-white uppercase rounded cursor-pointer font-medium transition ${
                      activity.registeredUsers.some((userObj) => userObj._id === user._id)
                        ? "cursor-not-allowed"
                        : "hover:shadow-lg hover:-translate-y-0.5"
                    }`}
                    value={
                      activity.registeredUsers.some((userObj) => userObj._id === user._id)
                        ? "Bereits Angemeldet"
                        : "Anmelden"
                    }
                    disabled={activity.registeredUsers.some((userObj) => userObj._id === user._id)}
                  />
                </form>
              ) : (
                <button
                  className="bg-gradient-to-b from-red-500 to-red-700 font-medium p-2 mt-3 md:p-2 text-white uppercase rounded cursor-not-allowed"
                  disabled
                >
                  Kapazität Voll
                </button>
              ))}
            {(user.role === "ASP" || user.role === "admin") &&
              (activityDatePassed || oneDayPrior) && (
                <button
                  className="bg-gradient-to-b from-blue-500 to-blue-700 font-medium p-2 mt-3 md:p-2 text-white uppercase rounded cursor-not-allowed"
                  disabled
                >
                  Registrierung abgeschlossen
                </button>
              )}
          </div>
        </div>
      </div>
    </>
  );
}
