import { NavLink, useNavigate, useParams } from "react-router-dom";
import SideMenu from "./SideMenu";
import { useEffect, useState } from "react";
import axiosClient from "../../utils/axiosClient";
import { updatePBC } from "../../utils/updatePBC";
import { useForm } from "react-hook-form";
import { Bounce, toast } from "react-toastify";
import profilePic from "../../../src/assets/profile.jpeg";
import "react-toastify/dist/ReactToastify.css";

export default function UserInfoCard() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [userInfomation, setUserInformation] = useState(null);
  const [generatedPassword, setGeneratedPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  useEffect(() => {
    axiosClient
      .get(`/user/profileInformation/${id}`)
      .then((response) => {
        setUserInformation(response.data);
      })
      .catch((error) => {});
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm();

  const onSubmit = (data) => {
    axiosClient
      .put(`/user/updatePassword/${id}`, data, {
        withCredentials: true,
      })
      .then((response) => {
        document.getElementById("updatePBC").close();
        notifySuccess();
      })
      .catch((error) => {});
  };

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
  const sortedClasses = userInfomation?.classesRegistered.sort((a, b) => {
    const dateA = new Date(a.registeredClassID?.date);
    const dateB = new Date(b.registeredClassID?.date);
    return dateB - dateA;
  });

  const notifySuccess = () =>
    toast.success("Kennwort geändert", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      className: "mr-6",
    });

  const generateRandomString = (length) => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charactersLength);
      result += characters[randomIndex];
    }
    return result;
  };

  const generatePassword = () => {
    const randomString = generateRandomString(8);
    setGeneratedPassword(randomString);
    setValue("password", randomString);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(generatedPassword)
      .then(() => {
        notifyCopied();
      })
      .catch((err) => {});
  };

  const notifyCopied = () =>
    toast.success("Kennwort in die Zwischenablage kopiert!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      className: "mt-14 mr-6",
    });

  const password = watch("password", "");

  return (
    <>
      {!userInfomation ? (
        <div className="flex mt-8 justify-center">
          <div className="relative">
            <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-200"></div>
            <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-blue-500 animate-spin"></div>
          </div>
        </div>
      ) : (
        <div className="bg-gray-50/50 flex">
          <SideMenu />
          <div className="mx-auto w-9/12">
            <div className="p-4 bg-white shadow mt-2 lg:mt-6">
              <div className="hidden lg:grid grid-cols-3 md:grid-cols-3">
                <div className="grid grid-cols-3 grid-rows-1 lg:grid-cols-3 lg:grid-rows-2 text-center order-last md:order-first mt-20 md:mt-0">
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

                <div className="hidden lg:inline relative">
                  <div className="w-36 h-36 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-0 flex items-center justify-center text-indigo-500">
                    <img className="w-28 mt-2" src={profilePic} alt="profile" />
                  </div>
                </div>
                <div className="h-[50px] ml-36 space-x-8 flex justify-between mt-0 md:mt-0 md:justify-center lg:mt32">
                  <NavLink
                    to={`/admin/userProfile/update/${userInfomation._id}`}
                    className="flex items-center text-white py-2 px-4 uppercase rounded bg-blue-400 hover:bg-blue-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
                  >
                    Bearbeiten
                  </NavLink>
                  <button
                    onClick={() => navigate(`/admin/users`)}
                    className="text-white py-2 px-4 uppercase rounded bg-gray-700 hover:bg-gray-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
                  >
                    Zurück
                  </button>
                </div>
              </div>
              <div className="mt-12 text-center border-b pb-6">
                <h1 className="text-4xl font-medium text-gray-700">
                  {userInfomation?.firstName + " " + userInfomation?.lastName}
                </h1>
                <p className="font-light text-gray-600 mt-3">
                  <span className="font-medium">Registriert seit:</span>{" "}
                  {formattedDate}
                </p>
                <p className="font-light text-gray-600 mt-2">
                  <span className="font-medium">Status: </span>
                  <span
                    className={`px-2 inline-flex text-sm leading-5 font-semibold rounded-full ml-2  
    ${
      userInfomation?.status === "aktiv"
        ? "bg-green-100 text-green-800"
        : "bg-red-200 text-red-700"
    }`}
                  >
                    {userInfomation.status}
                  </span>
                </p>

                <p className="mt-2 text-gray-600">
                  <span className="font-medium">
                    {userInfomation.department.length === 1
                      ? "Abteilung: "
                      : "Abteilungen: "}
                  </span>{" "}
                  {userInfomation.department.length === 1 ? (
                    <>
                      {userInfomation?.department[0].charAt(0).toUpperCase() +
                        userInfomation?.department[0].slice(1)}
                    </>
                  ) : (
                    <>
                      {userInfomation.department
                        .map((dep) => {
                          return dep.charAt(0).toUpperCase() + dep.slice(1);
                        })
                        .join(", ")}
                    </>
                  )}

     
                </p>
                <p className="mt-2 text-gray-600">
                  
                  <span className="font-medium">Rolle: </span>
                  {userInfomation.role === "ASP" ? (
                    <span>Genehmiger*in</span>
                  ) : userInfomation.role === "teacher" ? (
                    <span>Referent*in</span>
                  ) : (
                    <span>
                      {userInfomation?.role.charAt(0).toUpperCase() +
                        userInfomation?.role.slice(1)}
                    </span>
                  )}
                  </p>
                <p className="mt-2 mb-2 text-gray-600">
                  <span className="font-medium"> Kürzel:</span>{" "}
                  {userInfomation?.logID}
                </p>
                <div className="flex items-center justify-center">
                    <button
                      onClick={updatePBC}
                      className="mt-1 font-medium text-blue-600 text-center transition-transform duration-300 transform hover:scale-125 lg:mt-0"
                    >
                      Kennwort zurücksetzen
                    </button>
                </div>
                  <div className="mt-1 flex items-center justify-center lg:hidden">
                    <NavLink
                      to={`/admin/userProfile/update/${userInfomation?._id}`}
                      className="font-medium text-blue-600 text-center transition-transform duration-300 transform hover:scale-125"
                    >
                      Benutzerinformationen bearbeiten
                    </NavLink>
                  </div>
                <dialog id="updatePBC" className="modal">
                  <div className="modal-box">
                    <form
                      className="space-y-4 md:space-y-6"
                      onSubmit={handleSubmit(onSubmit)}
                    >
                      <div>
                        <label
                          htmlFor="password"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Neues Kennwort:
                        </label>
                        <div className="flex items-center gap-1 justify-center">
                          <input
                            {...register("password", { required: true })}
                            type={passwordVisible ? "text" : "password"}
                            placeholder="••••••••"
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-5/12 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value={password}
                            onChange={(e) => {
                              setGeneratedPassword(e.target.value);
                              setValue("password", e.target.value);
                            }}
                          />
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6 cursor-pointer transition-transform duration-300 transform hover:scale-125 hover:text-blue-600"
                            onClick={togglePasswordVisibility}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                            />
                          </svg>

                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6 cursor-pointer transition-transform duration-300 transform hover:scale-125 hover:text-blue-600"
                            onClick={copyToClipboard}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"
                            />
                          </svg>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6 cursor-pointer transition-transform duration-300 transform hover:scale-125 hover:text-blue-600"
                            onClick={generatePassword}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z"
                            />
                          </svg>
                        </div>
                      </div>
                      <div className="flex justify-center items-center space-x-4">
                        <input
                          type="submit"
                          className="btn w-fit bg-blue-500 text-white hover:bg-blue-700"
                          value={"Bestätigen"}
                        />
                        <button
                          type="button"
                          className="btn w-28"
                          onClick={() =>
                            document.getElementById("updatePBC").close()
                          }
                        >
                          Abbrechen
                        </button>
                      </div>
                    </form>
                  </div>
                </dialog>
              </div>
              <div className="mt-2 flex flex-col min-h-96">
                <div className="mb-2 flex justify-center text-xl font-medium">
                  Schulungshistorie
                </div>
                <div className="h-[calc(38vh-32px)] overflow-x-scroll">
                  <table className="w-full min-w-[640px] table-auto">
                    <thead>
                      <tr>
                        <th className="w-3/12 border-b border-blue-gray-50 py-3 px-6 text-left">
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
                        <th className="w-2/12 border-b border-blue-gray-50 py-3 px-6 text-center">
                          <p className="block antialiased  text-[11px] font-medium uppercase text-blue-gray-400">
                            Uhrzeit
                          </p>
                        </th>
                        <th className="border-b border-blue-gray-50 py-3 px-6 text-center">
                          <p className="block antialiased  text-[11px] font-medium uppercase text-blue-gray-400">
                            Genehmigung
                          </p>
                        </th>
                        <th className="border-b border-blue-gray-50 py-3 px-6 text-center">
                          <p className="block antialiased  text-[11px] font-medium uppercase text-blue-gray-400">
                            Teilnahme
                          </p>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {sortedClasses.map((activity) => {
                        return (
                          <tr key={activity._id}>
                            <td className="py-3 px-5 border-b border-blue-gray-50">
                              <div className="flex items-center gap-4">
                                <p className="block antialiased  text-sm leading-normal text-blue-gray-900 font-bold">
                                  {activity.registeredClassID?.title}
                                </p>
                              </div>
                            </td>

                            <td className="py-3 px-5 border-b border-blue-gray-50">
                              <div className="flex justify-center">
                                {activity.registeredClassID?.department.map(
                                  (image, index) => {
                                    return (
                                      <img
                                        key={index}
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
                              <p className="block antialiased  text-sm font-medium text-blue-gray-600 text-center">
                                {activity.registeredClassID?.location}
                              </p>
                            </td>

                            <td className="py-3 px-5 border-b border-blue-gray-50">
                              <p className="block antialiased  text-sm font-medium text-blue-gray-600 text-center">
                                {formatDate(activity.registeredClassID?.date)}
                              </p>
                            </td>

                            <td className="py-3 px-5 border-b border-blue-gray-50">
                              <p className="block antialiased  text-sm font-medium text-blue-gray-600 text-center">
                                {activity.registeredClassID?.time}
                              </p>
                            </td>

                            <td className="py-3 px-5 border-b border-blue-gray-50 text-center">
                              <div className="flex items-center justify-center">
                                <span
                                  className={`px-2.5 py-1 inline-flex text-sm leading-5 font-semibold rounded-full 
      ${
        activity
          ? activity?.status === "genehmigt"
            ? "bg-green-100 text-green-800"
            : activity?.status === "ausstehend"
            ? "bg-orange-100 text-orange-800"
            : "bg-red-200 text-red-700"
          : ""
      }`}
                                >
                                  {activity
                                    ? activity?.status
                                    : "nicht registriert"}
                                </span>
                                {activity &&
                                activity?.status === "abgelehnt" ? (
                                  <span
                                    className="tooltip ml-2 hover:cursor-pointer"
                                    style={{ width: "auto", height: "auto" }}
                                    data-tip={activity?.reason}
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 24 24"
                                      fill="#ffb951"
                                      className="w-7 h-7"
                                    >
                                      <path
                                        fillRule="evenodd"
                                        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 0 1 .67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 1 1-.671-1.34l.041-.022ZM12 9a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                                        clipRule="evenodd"
                                      />
                                    </svg>
                                  </span>
                                ) : (
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="#ffffff"
                                    className="w-8 h-8"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 0 1 .67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 1 1-.671-1.34l.041-.022ZM12 9a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                )}
                              </div>
                            </td>

                            <td className="py-3 px-5 border-b border-blue-gray-50 text-center">
                              {activity &&
                              (activity?.status === "abgelehnt" ||
                                activity?.status === "ausstehend") ? (
                                <span className="px-2.5 py-1 inline-flex text-sm leading-5 font-semibold rounded-full text-gray-500 bg-gray-200 text-gray-800">
                                  nicht angemeldet
                                </span>
                              ) : (
                                <span
                                  className={`px-2.5 py-1 inline-flex text-sm leading-5 font-semibold rounded-full 
        ${
          activity
            ? activity?.statusAttended === "teilgenommen"
              ? "bg-green-100 text-green-800"
              : activity?.statusAttended === "in Prüfung"
              ? "bg-orange-100 text-orange-800"
              : "bg-red-200 text-red-700"
            : ""
        }`}
                                >
                                  {activity
                                    ? activity?.statusAttended
                                    : "nicht registriert"}
                                </span>
                              )}
                            </td>
                          </tr>
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
