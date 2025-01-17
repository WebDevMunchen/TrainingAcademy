import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { useForm } from "react-hook-form";
import axiosClient from "../../utils/axiosClient";
import { NavLink } from "react-router-dom";

export default function ClassScheduleCard({ activity }) {
  const { setUser, user, setAllActivities, currentMonth, currentYear } =
    useContext(AuthContext);
  const { handleSubmit } = useForm();

  const onSubmit = () => {
    axiosClient
      .put(`/classActivity/registerClass/${activity?._id}`, {
        withCredentials: true,
      })
      .then((response) => {
        return axiosClient.get("/user/profile");
      })
      .then((responseProfile) => {
        setUser(responseProfile.data);
        return axiosClient.get(
          `/classActivity/allActivities?month=${currentMonth}&year=${currentYear}`
        );
      })
      .then((responseActivities) => {
        setAllActivities(responseActivities.data);
      })
      .catch((error) => {});
  };

  const showLegend = () => {
    document.getElementById("legend").showModal();
  };

  const date = new Date(activity.date);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const formattedDate = `${day}/${month}/${year}`;

  const priorDate = new Date(date);
  priorDate.setDate(day - 2);
  const dayPrior = priorDate.getDate();
  const monthPrior = priorDate.getMonth() + 1;
  const yearPrior = priorDate.getFullYear();
  const formattedDatePrior = `${dayPrior}/${monthPrior}/${yearPrior}`;

  const activityDate = new Date(activity.date);
  const activityTime = activity?.time?.split(":");
  activityDate.setHours(activityTime[0], activityTime[1]);

  const currentTime = new Date();
  const oneDayBeforeActivity = new Date(
    activityDate.getTime() - 2 * 24 * 60 * 60 * 1000
  );

  const activityDatePassed = currentTime > activityDate;
  const oneDayPrior =
    currentTime > oneDayBeforeActivity && currentTime < activityDate;

  return (
    <>
      <div className="bg-white border p-4 relative group shadow-lg lg:p-6">
        <div className="absolute bg-blue-500/50 top-0 left-0 w-24 h-1 transition-all duration-200 group-hover:bg-orange-300 group-hover:w-1/2"></div>
        <div className="relative">
          <div className="flex justify-between lg:hidden">
            <p className="mb-2 font-semibold lg:hidden">
              Registrierungsende:{" "}
              <span className="font-normal">
                {formattedDatePrior} um {activity.time}
              </span>
            </p>
            <p className="w-48 inline font-semibold text-right lg:hidden">
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
          <div className="flex justify-center lg:justify-between">
            <p className="hidden lg:inline invisible w-72">
              Placeholder Longer
            </p>

            <h3 className="flex justify-center mx-auto text-center mb-2 text-xl font-semibold text-black lg:hidden">
              {activity.title}
            </h3>
            <div className="flex flex-col">
              <p className="hidden lg:inline font-semibold text-right">
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
              <p className="hidden lg:flex font-semibold">
                Registrierungsende:{" "}
                <span className="font-normal ml-1">
                  {formattedDatePrior} um {activity.time}
                </span>
              </p>
            </div>
          </div>
          <div className="flex justify-center mt-6 mb-4">
            <h3 className="hidden text-center lg:flex justify-center text-xl font-semibold text-black">
              {activity.title}
            </h3>
          </div>
          <div className="flex justify-center mt-2 mb-1">
            <p>Zielgruppe</p>
          </div>
          <div className="flex justify-center gap-1 py-1">

            {activity.department.map((image, index) => {
              return (
                <img key={index} src={image} alt="logo" className="w-12 h-12" />
              );
            })}
          </div>
          <div className="flex items-center justify-center">
            <button
              onClick={showLegend}
              className="font-medium text-blue-600 text-center transition-transform duration-300 transform hover:scale-125 mx-auto mt-1"
            >
              Legende
            </button>
          </div>
          <dialog id="legend" className="modal">
            <div className="modal-box w-full max-w-6xl">
              <h2 className="text-center font-poppins font-semibold text-3xl">
                Legende
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 p-3">
                  <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 flex flex-col items-center">
                    <img
                      className="w-20 mx-auto"
                      src="https://res.cloudinary.com/dtrymbvrp/image/upload/v1737040594/alle_wyewox.png"
                      alt="alle"
                    />
                    <p className="font-poppins font-medium text-center text-md">
                      Alle
                    </p>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 flex flex-col items-center">
                    <img
                      src="https://res.cloudinary.com/dtrymbvrp/image/upload/v1737040592/vertrieb_mhopgl.png"
                      alt="Vertrieb"
                      className="w-20 mx-auto"
                    />
                    <p className="font-poppins font-medium text-center text-md">
                      Vertrieb
                    </p>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 flex flex-col items-center">
                    <img
                      src="https://res.cloudinary.com/dtrymbvrp/image/upload/v1737040592/logistik_blm8tf.png"
                      alt="Logistik"
                      className="w-20 mx-auto"
                    />
                    <p className="font-poppins font-medium text-center text-md">
                      Logistik
                    </p>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 flex flex-col items-center">
                    <img
                      src="https://res.cloudinary.com/dtrymbvrp/image/upload/v1737040593/fuhrpark_bhkb9q.png"
                      alt="Fuhrpark"
                      className="w-20 mx-auto"
                    />
                    <p className="font-poppins font-medium text-center text-md">
                      Fuhrpark
                    </p>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 flex flex-col items-center">
                    <img
                      src="https://res.cloudinary.com/dtrymbvrp/image/upload/v1737040592/IT_cyoqz8.png"
                      alt="IT & Services"
                      className="w-20 mx-auto"
                    />
                    <p className="font-poppins font-medium text-center text-md">
                      IT & Services
                    </p>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 flex flex-col items-center">
                    <img
                      src="https://res.cloudinary.com/dtrymbvrp/image/upload/v1737040593/HR_bhni2i.png"
                      alt="HR & Training"
                      className="w-20 mx-auto"
                    />
                    <p className="font-poppins font-medium text-center text-md">
                      HR & Training
                    </p>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 flex flex-col items-center">
                    <img
                      src="https://res.cloudinary.com/dtrymbvrp/image/upload/v1737040593/buha_xuo2tb.png"
                      alt="Buchhaltung"
                      className="w-20 mx-auto"
                    />
                    <p className="font-poppins font-medium text-center text-md">
                      Buchhaltung
                    </p>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 flex flex-col items-center">
                    <img
                      src="https://res.cloudinary.com/dtrymbvrp/image/upload/v1737040594/showroom_nsrmiw.png"
                      alt="showroom"
                      className="w-20 mx-auto"
                    />
                    <p className="font-poppins font-medium text-center text-md">
                      Showroom
                    </p>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 flex flex-col items-center">
                    <img
                      src="https://res.cloudinary.com/dtrymbvrp/image/upload/v1737040596/design_x4hg1y.png"
                      alt="Design & Marketing"
                      className="w-20 mx-auto"
                    />
                    <p className="font-poppins font-medium text-center text-md">
                      Design & Marketing
                    </p>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 flex flex-col items-center">
                    <img
                      src="https://res.cloudinary.com/dtrymbvrp/image/upload/v1737040595/bestandsmanagement_dacigz.png"
                      alt="Bestandsmanagement"
                      className="w-20 mx-auto"
                    />
                    <p className="font-poppins font-medium text-center text-md">
                    Bestandsmanagement
                    </p>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 flex flex-col items-center">
                    <img
                      src="https://res.cloudinary.com/dtrymbvrp/image/upload/v1737040595/haustechnik_uj6pa6.png"
                      alt="Haustechnik"
                      className="w-20 mx-auto"
                    />
                    <p className="font-poppins font-medium text-center text-md">
                      Haustechnik
                    </p>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 flex flex-col items-center">
                    <img
                      src="https://res.cloudinary.com/dtrymbvrp/image/upload/v1737040595/unternehmensentwicklung_qiggf8.png"
                      alt="Unternehmensentwicklung"
                      className="w-20 mx-auto"
                    />
                    <p className="font-poppins font-medium text-center text-md">
                    Unternehmensentwicklung
                    </p>
                  </div>
                </div>
              <div className="modal-action flex justify-center">
                <form method="dialog" className="flex gap-2">
                  <button className="btn w-28">Schließen</button>
                </form>
              </div>
            </div>
          </dialog>
          <p className="w-full text-center lg:flex justify-center lg:w-7/12 mx-auto mt-2 text-base text-gray-600">
            {activity.description}
          </p>
          {/* Desktop */}
          <div className="hidden lg:grid grid-cols-3 grid-rows-1 gap-2 text-center lg:gap-0 lg:text-left justify-items-center">
            <div className="flex flex-col">
              <p className="mt-4 text-base text-gray-600">
                <span className="font-bold">Datum:</span> {formattedDate}
              </p>
              <p className="mt-4 text-base text-gray-600">
                <span className="font-bold">Uhrzeit:</span> {activity.time}
              </p>
            </div>
            <div className="flex flex-col">
              <p className="mt-4 text-base text-gray-600 lg:hidden">
                <span className="font-bold">Dauer:</span> <br />
                {activity.duration + " Min."}
              </p>
              <p className="hidden lg:inline mt-4 text-base text-gray-600">
                <span className="font-bold">Dauer:</span>{" "}
                {activity.duration + " Min."}
              </p>
              <p className="mt-4 text-base text-gray-600">
                <span className="font-bold">Referent*in:</span>{" "}
                {activity.teacher}
              </p>
            </div>
            <div className="flex flex-col">
              <p className="mt-4 text-base text-gray-600">
                <span className="font-bold">Location:</span> {activity.location}
              </p>
              <p className="mt-4 text-base text-gray-600 lg:hidden">
                <span className="font-bold">Kapazität:</span>{" "}
                {activity.capacity + " Teilneh."}
              </p>
              <p className="hidden lg:inline mt-4 text-base text-gray-600">
                <span className="font-bold">Kapazität:</span>{" "}
                {activity.capacity + " Teilnehmer"}
              </p>
            </div>
          </div>
          {/* Mobile  */}
          <div className="grid grid-cols-3 grid-rows-1 text-center lg:gap-0 lg:text-left justify-items-center lg:hidden">
            <div className="flex flex-col">
              <p className="mt-4 text-base text-gray-600">
                <span className="font-bold">Datum:</span>
                <br /> {formattedDate}
              </p>
              <p className="mt-4 text-base text-gray-600">
                <span className="font-bold">Uhrzeit:</span>
                <br /> {activity.time}
              </p>
            </div>
            <div className="flex flex-col">
              <p className="mt-4 text-base text-gray-600 lg:hidden">
                <span className="font-bold">Dauer:</span> <br />
                {activity.duration + " Min."}
              </p>
              <p className="hidden lg:inline mt-4 text-base text-gray-600">
                <span className="font-bold">Dauer:</span>
                <br />
                {activity.duration + " Min."}
              </p>

              <p className="mt-4 text-base text-gray-600">
                <span className="font-bold">Referent*in:</span>
                <br />
                {activity.teacher}
              </p>
            </div>
            <div className="flex flex-col">
              <p className="mt-4 text-base text-gray-600">
                <span className="font-bold">Location:</span>
                <br /> {activity.location}
              </p>
              <p className="mt-4 text-base text-gray-600 lg:hidden">
                <span className="font-bold">Kapazität:</span>
                <br />
                {activity.capacity + " Teilneh."}
              </p>
              <p className="hidden lg:inline mt-4 text-base text-gray-600">
                <span className="font-bold">Kapazität:</span>
                <br />
                {activity.capacity + " Teilnehmer"}
              </p>
            </div>
          </div>

          <div className="flex justify-center mt-1">
            {user.role === "user" && !activityDatePassed && !oneDayPrior && (
              <>
                {activity.capacity - activity.usedCapacity > 0 ? (
                  <>
                    {user.classesRegistered.some(
                      (classObj) =>
                        classObj.registeredClassID?._id === activity?._id
                    ) ? (
                      <button
                        className="bg-gradient-to-b from-green-500 to-green-700 font-medium p-2 mt-3 md:p-2 text-white uppercase rounded cursor-not-allowed"
                        disabled
                      >
                        Angemeldet
                      </button>
                    ) : (
                      <form onSubmit={handleSubmit(onSubmit)}>
                        <input
                          type="submit"
                          className="bg-gradient-to-b from-blue-500 to-blue-700 font-medium p-2 mt-3 md:p-2 text-white uppercase rounded cursor-pointer font-medium transition hover:shadow-lg hover:-translate-y-0.5"
                          value="Anmelden"
                        />
                      </form>
                    )}
                  </>
                ) : (
                  <>
                    <button
                      className="mt-3 bg-gradient-to-b from-red-500 to-red-700 font-medium p-2 mt-2 md:p-2 text-white uppercase rounded cursor-not-allowed"
                      disabled
                    >
                      Ausgebucht
                    </button>
                  </>
                )}
              </>
            )}

            {user.role === "user" && (activityDatePassed || oneDayPrior) && (
              <button
                className="mt-3 bg-gradient-to-b from-gray-400 to-gray-600 font-medium p-2 mt-2 md:p-2 text-white uppercase rounded cursor-not-allowed"
                disabled
              >
                Registrierung abgeschlossen
              </button>
            )}
          </div>

          <div className="flex justify-center gap-4">
            {(user.role === "ASP" ||
              user.role === "admin" ||
              user.role === "teacher") && (
              <NavLink
                to={`/classInformation/${activity?._id}`}
                className="flex items-center justify-center text-center bg-gradient-to-b from-gray-700 to-gray-900 font-medium p-2 mt-3 md:p-2 text-white uppercase w-52 rounded cursor-pointer hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
              >
                Details Anzeigen
              </NavLink>
            )}
            {user.role === "admin" && (
              <NavLink
                to={`/classInformation/participation/${activity?._id}`}
                className="text-center bg-gradient-to-b from-gray-700 to-gray-900 font-medium p-2 mt-3 md:p-2 text-white uppercase w-52 rounded cursor-pointer hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
              >
                Teilnahme verwalten
              </NavLink>
            )}
          </div>

          <div className="flex justify-center">
            {(user.role === "ASP" || user.role === "admin") &&
              !activityDatePassed &&
              !oneDayPrior && (
                <>
                  {activity.capacity - activity.usedCapacity > 0 ? (
                    <>
                      {user.classesRegistered.some(
                        (classObj) =>
                          classObj.registeredClassID?._id === activity?._id
                      ) ? (
                        <button
                          className="bg-gradient-to-b from-green-500 to-green-700 font-medium p-2 mt-3 md:p-2 text-white uppercase rounded cursor-not-allowed"
                          disabled
                        >
                          Angemeldet
                        </button>
                      ) : (
                        <form onSubmit={handleSubmit(onSubmit)}>
                          <input
                            type="submit"
                            className="bg-gradient-to-b from-blue-500 to-blue-700 font-medium p-2 mt-3 md:p-2 text-white uppercase rounded cursor-pointer font-medium transition hover:shadow-lg hover:-translate-y-0.5"
                            value="Anmelden"
                          />
                        </form>
                      )}
                    </>
                  ) : (
                    <button
                      className="mt-3 bg-gradient-to-b from-red-500 to-red-700 font-medium p-2 mt-2 md:p-2 text-white uppercase rounded cursor-not-allowed"
                      disabled
                    >
                      Ausgebucht
                    </button>
                  )}
                </>
              )}

            {(user.role === "ASP" || user.role === "admin") &&
              (activityDatePassed || oneDayPrior) && (
                <button
                  className="mt-3 bg-gradient-to-b from-gray-400 to-gray-600 font-medium p-2 mt-2 md:p-2 text-white uppercase rounded cursor-not-allowed"
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
