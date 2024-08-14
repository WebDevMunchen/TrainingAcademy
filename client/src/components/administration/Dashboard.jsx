import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import SideMenu from "./SideMenu";
import ClassListPreview from "./ClassListPreview";
import { NavLink } from "react-router-dom";

export default function Dashboard() {
  const {
    allActivities,
    allUsers,
    handlePreviousMonth,
    handleNextMonth,
    currentMonth,
    handleYearChange,
    currentYear,
  } = useContext(AuthContext);

  const [totalAttendees, setTotalAttendees] = useState(0);
  const [totalCapacity, setTotalCapacity] = useState(0);
  const [pendingClassesCount, setPendingClassesCount] = useState(0);

  useEffect(() => {
    if (allActivities && allActivities?.length > 0) {
      const registeredAttendees = allActivities.reduce((total, activity) => {
        return total + activity?.usedCapacity;
      }, 0);
      setTotalAttendees(registeredAttendees);

      const capacity = allActivities.reduce((total, activity) => {
        return total + activity?.capacity;
      }, 0);
      setTotalCapacity(capacity);
    } else {
      setTotalAttendees(0);
      setTotalCapacity(0);
    }

    if (allActivities && allActivities?.length > 0) {
      let count = 0;
      allActivities.forEach((activity) => {
        if (
          activity?.registeredUsers &&
          activity?.registeredUsers?.length > 0
        ) {
          activity?.registeredUsers.forEach((user) => {
            if (
              user?.classesRegistered &&
              user?.classesRegistered?.length > 0
            ) {
              user?.classesRegistered.forEach((classRegistered) => {
                if (
                  classRegistered?.status === "ausstehend" &&
                  classRegistered?.registeredClassID === activity?._id
                ) {
                  count++;
                }
              });
            }
          });
        }
      });
      setPendingClassesCount(count);
    } else {
      setPendingClassesCount(0);
    }
  }, [allActivities, allUsers]);

  const remainingSpots = totalCapacity - totalAttendees;

  const years = Array.from({ length: 10 }, (_, i) =>
    (new Date().getFullYear() + i).toString()
  );

  return (
    <>
      <div className="bg-gray-50/50 flex">
        <SideMenu />
        <div className="p-4 xl:flex-1">
          <div className="mt-6">
            <div className="hidden lg:grid mb-6 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
              <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
                <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-green-600 to-green-400 text-white shadow-green-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    className="w-6 h-6 text-white"
                  >
                    <path d="M6.25 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM3.25 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM19.75 7.5a.75.75 0 00-1.5 0v2.25H16a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H22a.75.75 0 000-1.5h-2.25V7.5z"></path>
                  </svg>
                </div>
                <div className="p-4 text-right">
                  <h6 className="block antialiased tracking-normal  text-base font-semibold leading-relaxed text-blue-gray-900 mb-1">
                    Anzahl der registrierten Mitarbeiter
                  </h6>
                  <h4 className="block antialiased tracking-normal  text-2xl font-semibold leading-snug text-blue-gray-900">
                    {!allUsers ? <>Loading</> : allUsers?.length}
                  </h4>
                </div>
                <div className="flex gap-3 items-center border-t border-blue-gray-50 p-4">
                  <p className="block antialiased  text-base leading-relaxed font-semibold text-gray-400">
                    Neuen User registrieren
                  </p>
                  <NavLink to={"/admin/register"}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="#24b359"
                      className="w-7 h-7 transition-transform duration-300 transform hover:scale-150"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </NavLink>
                </div>
              </div>
              <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
                <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-blue-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                  >
                    <path d="M11.7 2.805a.75.75 0 0 1 .6 0A60.65 60.65 0 0 1 22.83 8.72a.75.75 0 0 1-.231 1.337 49.948 49.948 0 0 0-9.902 3.912l-.003.002c-.114.06-.227.119-.34.18a.75.75 0 0 1-.707 0A50.88 50.88 0 0 0 7.5 12.173v-.224c0-.131.067-.248.172-.311a54.615 54.615 0 0 1 4.653-2.52.75.75 0 0 0-.65-1.352 56.123 56.123 0 0 0-4.78 2.589 1.858 1.858 0 0 0-.859 1.228 49.803 49.803 0 0 0-4.634-1.527.75.75 0 0 1-.231-1.337A60.653 60.653 0 0 1 11.7 2.805Z" />
                    <path d="M13.06 15.473a48.45 48.45 0 0 1 7.666-3.282c.134 1.414.22 2.843.255 4.284a.75.75 0 0 1-.46.711 47.87 47.87 0 0 0-8.105 4.342.75.75 0 0 1-.832 0 47.87 47.87 0 0 0-8.104-4.342.75.75 0 0 1-.461-.71c.035-1.442.121-2.87.255-4.286.921.304 1.83.634 2.726.99v1.27a1.5 1.5 0 0 0-.14 2.508c-.09.38-.222.753-.397 1.11.452.213.901.434 1.346.66a6.727 6.727 0 0 0 .551-1.607 1.5 1.5 0 0 0 .14-2.67v-.645a48.549 48.549 0 0 1 3.44 1.667 2.25 2.25 0 0 0 2.12 0Z" />
                    <path d="M4.462 19.462c.42-.419.753-.89 1-1.395.453.214.902.435 1.347.662a6.742 6.742 0 0 1-1.286 1.794.75.75 0 0 1-1.06-1.06Z" />
                  </svg>
                </div>
                <div className="p-4 text-right">
                  <h6 className="block antialiased tracking-normal  text-base font-semibold leading-relaxed text-blue-gray-900 mb-1">
                    Schulungen in diesem Monat
                  </h6>
                  <h4 className="block antialiased tracking-normal  text-2xl font-semibold leading-snug text-blue-gray-900">
                    {!allActivities ? <>0</> : allActivities?.length}
                  </h4>
                </div>
                <div className="flex gap-3 items-center border-t border-blue-gray-50 p-4">
                  <p className="block antialiased  text-base leading-relaxed font-semibold text-gray-400">
                    Neue Schulung erstellen
                  </p>
                  <NavLink to={"/admin/createClass"}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="#24b359"
                      className="w-7 h-7 transition-transform duration-300 transform hover:scale-150"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </NavLink>
                </div>
              </div>
              <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
                <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-pink-600 to-pink-400 text-white shadow-pink-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.25 6.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM15.75 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM2.25 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM6.31 15.117A6.745 6.745 0 0 1 12 12a6.745 6.745 0 0 1 6.709 7.498.75.75 0 0 1-.372.568A12.696 12.696 0 0 1 12 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 0 1-.372-.568 6.787 6.787 0 0 1 1.019-4.38Z"
                      clipRule="evenodd"
                    />
                    <path d="M5.082 14.254a8.287 8.287 0 0 0-1.308 5.135 9.687 9.687 0 0 1-1.764-.44l-.115-.04a.563.563 0 0 1-.373-.487l-.01-.121a3.75 3.75 0 0 1 3.57-4.047ZM20.226 19.389a8.287 8.287 0 0 0-1.308-5.135 3.75 3.75 0 0 1 3.57 4.047l-.01.121a.563.563 0 0 1-.373.486l-.115.04c-.567.2-1.156.349-1.764.441Z" />
                  </svg>
                </div>
                <div className="p-4 text-right">
                  <h6 className="block antialiased tracking-normal  text-base font-semibold leading-relaxed text-blue-gray-900 mb-1">
                    Teilnehmer in diesem Monat
                  </h6>
                  <h4 className="block antialiased tracking-normal  text-2xl font-semibold leading-snug text-blue-gray-900">
                    {totalAttendees}
                  </h4>
                </div>
                <div className="border-t border-blue-gray-50 p-4">
                  <p className="block antialiased  text-base leading-relaxed font-semibold text-gray-400">
                    Insgesamt noch{" "}
                    <span className="font-bold text-cyan-600">
                      {" "}
                      {remainingSpots}{" "}
                    </span>{" "}
                    freie Plätze
                  </p>
                </div>
              </div>

              <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
                <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-orange-600 to-orange-400 text-white shadow-orange-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.502 6h7.128A3.375 3.375 0 0 1 18 9.375v9.375a3 3 0 0 0 3-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 0 0-.673-.05A3 3 0 0 0 15 1.5h-1.5a3 3 0 0 0-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6ZM13.5 3A1.5 1.5 0 0 0 12 4.5h4.5A1.5 1.5 0 0 0 15 3h-1.5Z"
                      clipRule="evenodd"
                    />
                    <path
                      fillRule="evenodd"
                      d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625V9.375Zm9.586 4.594a.75.75 0 0 0-1.172-.938l-2.476 3.096-.908-.907a.75.75 0 0 0-1.06 1.06l1.5 1.5a.75.75 0 0 0 1.116-.062l3-3.75Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="p-4 text-right">
                  <h6 className="block antialiased tracking-normal  text-base font-semibold leading-relaxed text-blue-gray-900 mb-1">
                    Ausstehende Genehmigungen
                  </h6>
                  <h4 className="block antialiased tracking-normal  text-2xl font-semibold leading-snug text-blue-gray-900">
                    {pendingClassesCount}
                  </h4>
                </div>
                <div className="flex gap-3 items-center border-t border-blue-gray-50 p-4">
                  <p className="block antialiased  text-base leading-relaxed font-semibold text-gray-400">
                    Zur Schulungsübersicht
                  </p>
                  <NavLink to={"/classes"}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="#4687f3"
                      className="w-7 h-7 transition-transform duration-300 transform hover:scale-150"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm4.28 10.28a.75.75 0 0 0 0-1.06l-3-3a.75.75 0 1 0-1.06 1.06l1.72 1.72H8.25a.75.75 0 0 0 0 1.5h5.69l-1.72 1.72a.75.75 0 1 0 1.06 1.06l3-3Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </NavLink>
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex justify-between mb-2 mt-2 mx-16">
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
                <p className="font-anek text-4xl font-semibold tracking-widest text-g uppercase">
                  {currentMonth}
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
              <div className="flex justify-center mb-2">
                <div className="relative inline-flex">
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
              </div>
            </div>

            <div className="mx-auto w-11/12 mb-4 grid grid-cols-1 gap-6">
              <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden xl:col-span-2">
                <div className="p-6 h-[calc(57.5vh-32px)] overflow-x-scroll px-0 pt-0 pb-2">
                  <table className="w-full min-w-[640px] table-auto">
                    <thead>
                      <tr>
                        <th className="w-1/4 border-b border-blue-gray-50 py-3 px-6 text-left">
                          <p className="block antialiased  text-[11px] font-medium uppercase text-blue-gray-400">
                            Thema
                          </p>
                        </th>
                        <th className="border-b border-blue-gray-50 py-3 px-6 text-center">
                          <p className="block antialiased  text-[11px] font-medium uppercase text-blue-gray-400">
                            Zielgruppe
                          </p>
                        </th>
                        <th className="border-b border-blue-gray-50 py-3 px-6 text-center">
                          <p className="block antialiased  text-[11px] font-medium uppercase text-blue-gray-400">
                            Location
                          </p>
                        </th>
                        <th className="border-b border-blue-gray-50 py-3 px-6 text-center">
                          <p className="block antialiased  text-[11px] font-medium uppercase text-blue-gray-400">
                            Datum
                          </p>
                        </th>
                        <th className="border-b border-blue-gray-50 py-3 px-6 text-center">
                          <p className="block antialiased  text-[11px] font-medium uppercase text-blue-gray-400">
                            Uhrzeit
                          </p>
                        </th>
                        <th className="w-1/12 border-b border-blue-gray-50 py-3 px-6 text-center">
                          <p className="block antialiased  text-[11px] font-medium uppercase text-blue-gray-400">
                            Ausstehende Genehmigungen
                          </p>
                        </th>
                        <th className="w-1/12 border-b border-blue-gray-50 py-3 px-6 text-center">
                          <p className="block antialiased  text-[11px] font-medium uppercase text-blue-gray-400">
                            Stornierungen
                          </p>
                        </th>
                        <th className="border-b border-blue-gray-50 py-3 px-6 text-center">
                          <p className="block antialiased  text-[11px] font-medium uppercase text-blue-gray-400">
                            Teilnehmer Angemeldet
                          </p>
                        </th>
                        <th className="border-b border-blue-gray-50 py-3 px-6 text-center">
                          <p className="block antialiased  text-[11px] font-medium uppercase text-blue-gray-400">
                            Links
                          </p>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {allActivities?.length === 0 ? (
                        <>
                          <tr>
                            <td colSpan="9">
                              <img
                                className="h-[calc(42vh-40px)] lg:mx-auto lg:h-[calc(48vh-32px)] lg:w-[calc(55vh-32px)]"
                                src="https://res.cloudinary.com/dtrymbvrp/image/upload/v1715671755/symbols/freepik-export-20240514065734UGY2_wpm9md_rahv71.png"
                                alt="logo"
                              />
                            </td>
                          </tr>
                        </>
                      ) : (
                        allActivities.map((activity) => {
                          return (
                            <ClassListPreview
                              key={activity._id}
                              activity={activity}
                            />
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
