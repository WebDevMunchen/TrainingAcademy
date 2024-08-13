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
      .put(`/classActivity/registerClass/${activity._id}`, {
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
      <div className="bg-white border p-8 relative group shadow-lg">
        <div className="absolute bg-blue-500/50 top-0 left-0 w-24 h-1 transition-all duration-200 group-hover:bg-orange-300 group-hover:w-1/2"></div>
        <div className="py-2 relative">
          <div className="flex justify-between lg:hidden">
            <p className="font-semibold lg:hidden">
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
            <h3 className="hidden lg:flex justify-center text-lg font-semibold text-black">
              {activity.title}
            </h3>
            <h3 className="flex justify-center mx-auto text-center mb-2 text-lg font-semibold text-black lg:hidden">
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

          <div className="flex justify-center mt-2 mb-1">
            <p>Zielgruppe</p>
          </div>
          <div className="flex justify-center gap-2">
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
            <div className="modal-box w-full max-w-5xl">
              <h2 className="text-center font-anek font-semibold text-4xl">
                Legende
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 p-3">
                <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 flex flex-col items-center">
                  <img
                    className="w-20 mx-auto"
                    src="https://res.cloudinary.com/dtrymbvrp/image/upload/v1715088433/symbols/hczkglpvaybhguywjgku.png"
                    alt="alle"
                  />
                  <p className="font-anek font-medium text-center text-lg">
                    Alle
                  </p>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 flex flex-col items-center">
                  <img
                    src="https://res.cloudinary.com/dtrymbvrp/image/upload/v1715088434/symbols/ng4emaukxn9adrxpnvlu.png"
                    alt="Vertrieb"
                    className="w-20 mx-auto"
                  />
                  <p className="font-anek font-medium text-center text-lg">
                    Vertrieb
                  </p>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 flex flex-col items-center">
                  <img
                    src="https://res.cloudinary.com/dtrymbvrp/image/upload/v1715088434/symbols/o4qwfioe3dkqrkhmumd4.png"
                    alt="Logistik"
                    className="w-20 mx-auto"
                  />
                  <p className="font-anek font-medium text-center text-lg">
                    Logistik
                  </p>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 flex flex-col items-center">
                  <img
                    src="https://res.cloudinary.com/dtrymbvrp/image/upload/v1715088434/symbols/uaozccdgnwtcelxvqjug.png"
                    alt="Fuhrpark"
                    className="w-20 mx-auto"
                  />
                  <p className="font-anek font-medium text-center text-lg">
                    Fuhrpark
                  </p>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 flex flex-col items-center">
                  <img
                    src="https://res.cloudinary.com/dtrymbvrp/image/upload/v1715088434/symbols/ke8amlflgcdrvdfghzoz.png"
                    alt="IT & Services"
                    className="w-20 mx-auto"
                  />
                  <p className="font-anek font-medium text-center text-lg">
                    IT & Services
                  </p>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 flex flex-col items-center">
                  <img
                    src="https://res.cloudinary.com/dtrymbvrp/image/upload/v1715088433/symbols/gmnv44k0nydrmfnbr67y.png"
                    alt="HR & Training"
                    className="w-20 mx-auto"
                  />
                  <p className="font-anek font-medium text-center text-lg">
                    HR & Training
                  </p>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 flex flex-col items-center">
                  <img
                    src="https://res.cloudinary.com/dtrymbvrp/image/upload/v1715088433/symbols/ip7khvjx1dgxosk6lxnb.png"
                    alt="Buchhaltung"
                    className="w-20 mx-auto"
                  />
                  <p className="font-anek font-medium text-center text-lg">
                    Buchhaltung
                  </p>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 flex flex-col items-center">
                  <img
                    src="https://res.cloudinary.com/dtrymbvrp/image/upload/v1715088434/symbols/ydkcdshvmwdffe4tyf9f.png"
                    alt="item8"
                    className="w-20 mx-auto"
                  />
                  <p className="font-anek font-medium text-center text-lg">
                    Einkauf & Anmietung
                  </p>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 flex flex-col items-center">
                  <img
                    src="https://res.cloudinary.com/dtrymbvrp/image/upload/v1715088433/symbols/wodezi58z28wwhcvhsev.png"
                    alt="Design & Planung"
                    className="w-20 mx-auto"
                  />
                  <p className="font-anek font-medium text-center text-lg">
                    Design & Planung
                  </p>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 flex flex-col items-center">
                  <img
                    src="https://res.cloudinary.com/dtrymbvrp/image/upload/v1715088434/symbols/ikluglsekc6msbuvgn0z.png"
                    alt="Projektmanagement"
                    className="w-20 mx-auto"
                  />
                  <p className="font-anek font-medium text-center text-lg">
                    Projektmanagement
                  </p>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 flex flex-col items-center">
                  <img
                    src="https://res.cloudinary.com/dtrymbvrp/image/upload/v1715088434/symbols/p0m4tdmsd5qdmysdzolk.png"
                    alt="Officemanagement"
                    className="w-20 mx-auto"
                  />
                  <p className="font-anek font-medium text-center text-lg">
                    Officemanagement
                  </p>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 flex flex-col items-center">
                  <img
                    src="https://res.cloudinary.com/dtrymbvrp/image/upload/v1715088433/symbols/l85s2hjejj6kzkzung8o.png"
                    alt="Gesundheitsmanagement"
                    className="w-20 mx-auto"
                  />
                  <p className="font-anek font-medium text-center text-lg">
                    Gesundheitsmanagement
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
          <p className="text-center lg:flex justify-center mt-2 text-base text-gray-600">
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
                <span className="font-bold">Dauer:</span> <br />
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
                <span className="font-bold">Referent*in:</span>{" "}
                {activity.teacher}
              </p>
            </div>
          </div>
          <div className="flex justify-center">
            {user.role === "user" && !activityDatePassed && !oneDayPrior && (
              <>
                {activity.capacity - activity.usedCapacity > 0 ? (
                  <>
                    {user.classesRegistered.some(
                      (classObj) =>
                        classObj.registeredClassID._id === activity._id
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
                to={`/classInformation/${activity._id}`}
                className="text-center bg-gradient-to-b from-gray-700 to-gray-900 font-medium p-2 mt-3 md:p-2 text-white uppercase w-52 rounded cursor-pointer hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
              >
                Details Anzeigen
              </NavLink>
            )}
            {user.role === "admin" && (
              <NavLink
                to={`/classInformation/participation/${activity._id}`}
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
                          classObj.registeredClassID._id === activity._id
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
