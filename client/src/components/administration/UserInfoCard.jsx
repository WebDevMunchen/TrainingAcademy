import { NavLink, useNavigate, useParams } from "react-router-dom";
import SideMenu from "./SideMenu";
import { useEffect, useState } from "react";
import axiosClient from "../../utils/axiosClient";

export default function UserInfoCard() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [userInfomation, setUserInformation] = useState(null);

  useEffect(() => {
    axiosClient
      .get(`/user/profileInformation/${id}`)
      .then((response) => {
        setUserInformation(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const monthsInGerman = [
    "Januar",
    "Februar",
    "März",
    "April",
    "Mai",
    "Juni",
    "Juli",
    "August",
    "September",
    "Oktober",
    "November",
    "Dezember",
  ];

  const dateString = userInfomation?.dateOfRegistration;
  const date = new Date(dateString);

  const day = date.getDate();
  const monthIndex = date.getMonth();
  const monthGerman = monthsInGerman[monthIndex];
  const year = date.getFullYear();

  const formattedDate = `${day}.${monthGerman} - ${year}`;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("de-DE", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  const countPendingClasses = () => {
    const pendingClasses = userInfomation?.classesRegistered.filter(
      (classItem) => classItem.status === "ausstehend"
    );
    return pendingClasses.length;
  };

  const countAttendedClasses = () => {
    const attendedClasses = userInfomation?.classesRegistered.filter(
      (classItem) => classItem.statusAttended === "teilgenommen"
    );
    return attendedClasses.length;
  };

  const countNotAttended = () => {
    const notAttendedClasses = userInfomation?.classesRegistered.filter(
      (classItem) => classItem.statusAttended === "nicht teilgenommen"
    );
    return notAttendedClasses.length;
  };

  return (
    <>
      {!userInfomation ? (
        <p>Loading</p>
      ) : (
        <div className="bg-gray-50/50 flex">
          <SideMenu />
          <div className="mx-auto w-9/12">
            <div className="p-4 bg-white shadow mt-6">
              <div className="grid grid-cols-3 md:grid-cols-3">
                <div className="grid grid-cols-3 grid-rows-2 text-center order-last md:order-first mt-20 md:mt-0">
                  <div>
                    <p className="font-bold text-gray-700 text-xl">
                      {countPendingClasses()}
                    </p>
                    <p className="text-gray-400">Ausstehend</p>
                  </div>
                  <div>
                    <p className="font-bold text-gray-700 text-xl">
                      {countAttendedClasses()}
                    </p>
                    <p className="text-gray-400">Teilgenommen</p>
                  </div>
                  <div>
                    <p className="font-bold text-gray-700 text-xl">
                      {countNotAttended()}
                    </p>
                    <p className="text-gray-400">Nicht teilgenommen</p>
                  </div>
                </div>

                <div className="relative">
                  <div className="w-36 h-36 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-0 flex items-center justify-center text-indigo-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-24 w-24"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
                <div className="h-[50px] space-x-8 flex justify-between mt-32 md:mt-0 md:justify-center">
                  <NavLink
                    to={`/admin/userProfile/update/${userInfomation._id}`}
                    className="flex items-center text-white py-2 px-4 uppercase rounded bg-blue-400 hover:bg-blue-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
                  >
                    Bearbeiten
                  </NavLink>
                  <button
                    onClick={() => navigate(-1)}
                    className="text-white py-2 px-4 uppercase rounded bg-gray-700 hover:bg-gray-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
                  >
                    Zurück
                  </button>
                </div>
              </div>
              <div className="mt-12 text-center border-b pb-6">
                <h1 className="text-4xl font-medium text-gray-700">
                  {userInfomation.firstName + " " + userInfomation.lastName}
                </h1>
                <p className="font-light text-gray-600 mt-3">
                  <span className="font-medium">Registriert seit:</span>{" "}
                  {formattedDate}
                </p>
                <p className="font-light text-gray-600 mt-3">
                  <span className="font-medium">Status: </span>
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ml-2  
    ${
      userInfomation.status === "aktiv"
        ? "bg-green-100 text-green-800"
        : "bg-red-200 text-red-700"
    }`}
                  >
                    {userInfomation.status}
                  </span>
                </p>

                <p className="mt-8 text-gray-600">
                  <span className="font-medium">Abteilung:</span>{" "}
                  {userInfomation.department} -{" "}
                  <span className="font-medium">Role: </span>
                  {userInfomation.role.charAt(0).toUpperCase() +
                    userInfomation.role.slice(1)}
                </p>
                <p className="mt-2 text-gray-600">
                  <span className="font-medium"> Kürzel:</span>{" "}
                  {userInfomation.logID}
                </p>
              </div>
              <div className="mt-6 flex flex-col min-h-96">
                <div className="mb-4 flex justify-center text-xl font-medium">
                  Schulungsverlauf
                </div>
                <div className="h-[calc(42vh-32px)] overflow-x-scroll">
                  <table className="w-full min-w-[640px] table-auto">
                    <thead>
                      <tr>
                        <th className="w-3/12 border-b border-blue-gray-50 py-3 px-6 text-left">
                          <p className="block antialiased font-sans text-[11px] font-medium uppercase text-blue-gray-400">
                            Thema
                          </p>
                        </th>
                        <th className="border-b border-blue-gray-50 py-3 px-6 text-center">
                          <p className="block antialiased font-sans text-[11px] font-medium uppercase text-blue-gray-400">
                            Zeilgruppe
                          </p>
                        </th>
                        <th className="border-b border-blue-gray-50 py-3 px-6 text-center">
                          <p className="block antialiased font-sans text-[11px] font-medium uppercase text-blue-gray-400">
                            Location
                          </p>
                        </th>
                        <th className="border-b border-blue-gray-50 py-3 px-6 text-center">
                          <p className="block antialiased font-sans text-[11px] font-medium uppercase text-blue-gray-400">
                            Datum
                          </p>
                        </th>
                        <th className="w-2/12 border-b border-blue-gray-50 py-3 px-6 text-center">
                          <p className="block antialiased font-sans text-[11px] font-medium uppercase text-blue-gray-400">
                            Uhrzeit
                          </p>
                        </th>
                        <th className="border-b border-blue-gray-50 py-3 px-6 text-center">
                          <p className="block antialiased font-sans text-[11px] font-medium uppercase text-blue-gray-400">
                            Genehmigung
                          </p>
                        </th>
                        <th className="border-b border-blue-gray-50 py-3 px-6 text-center">
                          <p className="block antialiased font-sans text-[11px] font-medium uppercase text-blue-gray-400">
                            Status
                          </p>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {userInfomation.classesRegistered.map((activity) => {
                        return (
                          <>
                            <tr>
                              <td className="py-3 px-5 border-b border-blue-gray-50">
                                <div className="flex items-center gap-4">
                                  <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-bold">
                                    {activity.registeredClassID.title}
                                  </p>
                                </div>
                              </td>

                              <td className="py-3 px-5 border-b border-blue-gray-50">
                                <div className="flex">
                                  {activity.registeredClassID.department.map(
                                    (image) => {
                                      return (
                                        <img
                                          src={image}
                                          alt="logo"
                                          className="w-12 h-12"
                                        />
                                      );
                                    }
                                  )}
                                </div>
                              </td>

                              <td className="py-3 px-5 border-b border-blue-gray-50">
                                <p className="block antialiased font-sans text-xs font-medium text-blue-gray-600 text-center">
                                  {activity.registeredClassID.location}
                                </p>
                              </td>

                              <td className="py-3 px-5 border-b border-blue-gray-50">
                                <p className="block antialiased font-sans text-xs font-medium text-blue-gray-600 text-center">
                                  {formatDate(activity.registeredClassID.date)}
                                </p>
                              </td>

                              <td className="py-3 px-5 border-b border-blue-gray-50">
                                <p className="block antialiased font-sans text-xs font-medium text-blue-gray-600 text-center">
                                  {activity.registeredClassID.time}
                                </p>
                              </td>

                              <td className="py-3 px-5 border-b border-blue-gray-50 text-center">
                                {activity.status}
                              </td>

                              <td className="py-3 px-5 border-b border-blue-gray-50 text-center">
                                {activity.statusAttended}
                              </td>
                            </tr>
                          </>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
