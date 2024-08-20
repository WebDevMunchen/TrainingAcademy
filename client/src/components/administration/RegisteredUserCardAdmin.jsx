import React, { useContext, useEffect, useState } from "react";
import axiosClient from "../../utils/axiosClient";
import { useParams } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../context/AuthProvider";
import attended from "../../assets/attended.png";
import approved from "../../assets/approved.png";
import pending from "../../assets/pending.png";
import declined from "../../assets/declined.png";
import notAttended from "../../assets/notAttended.png";

export default function RegisteredUserCardAdmin({
  registeredUser,
  activityId,
  setActivity,
}) {
  const { setAllActivities, setUser, currentMonth, currentYear, setAllUsers } =
    useContext(AuthContext);
  const { id } = useParams();

  const [hideAttendedBtn, setHideAttendedBtn] = useState(false);
  const [submitedAttended, setSubmitedAttended] = useState(true);

  const [activitySingleInformation, setActivitySingleInformation] =
    useState(null);

  useEffect(() => {
    axiosClient
      .get(`/classActivity/${id}`)
      .then((response) => {
        setActivitySingleInformation(response.data);
      })
      .catch((error) => {});
  }, []);

  const participated = (status) => {
    axiosClient
      .put(`/user/updateAttended/${registeredUser._id}`, {
        classId: id,
        newStatusAttended: status,
      })
      .then((response) => {
        return axiosClient.get("/user/profile");
      })
      .then((responseProfile) => {
        setUser(responseProfile.data);
      })
      .then((response) => {
        return axiosClient.get(`/classActivity/${id}`);
      })
      .then((responseSingleActivity) => {
        setActivity(responseSingleActivity.data);

        return axiosClient.get(
          `/classActivity/allActivities?month=${currentMonth}&year=${currentYear}`
        );
      })
      .then((responseAllActivities) => {
        setAllActivities(responseAllActivities.data);

        return axiosClient.get("/user/getAllUsers");
      })
      .then((responseUsers) => {
        setAllUsers(responseUsers.data);
        notifySuccess();
      })
      .catch((error) => {});
  };

  const notParticipated = (status) => {
    axiosClient
      .put(`/user/updateAttended/${registeredUser._id}`, {
        classId: id,
        newStatusAttended: status,
      })
      .then((response) => {
        return axiosClient.get("/user/profile");
      })
      .then((responseProfile) => {
        setUser(responseProfile.data);
      })
      .then((response) => {
        return axiosClient.get(`/classActivity/${id}`);
      })
      .then((responseSingleActivity) => {
        setActivity(responseSingleActivity.data);

        return axiosClient.get(
          `/classActivity/allActivities?month=${currentMonth}&year=${currentYear}`
        );
      })
      .then((responseAllActivities) => {
        setAllActivities(responseAllActivities.data);

        return axiosClient.get("/user/getAllUsers");
      })
      .then((responseUsers) => {
        setAllUsers(responseUsers.data);
        notifySuccess();
      })
      .catch((error) => {});
  };

  const handleParticipated = (e) => {
    if (e.target.checked) {
      const status = e.target.value;
      participated(status);
      setHideAttendedBtn(true);
      setSubmitedAttended(false);
      notifySuccessAttended();
    }
  };

  const handleNotParticipated = (e) => {
    if (e.target.checked) {
      const status = e.target.value;
      notParticipated(status);
      setHideAttendedBtn(true);
      setSubmitedAttended(false);
      notifySuccessAttended();
    }
  };

  const notifySuccessAttended = () =>
    toast.success("Teilnahmestatus geändert!", {
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

  const currentDate = new Date();
  const isoDateString =
    currentDate.getFullYear() +
    "-" +
    ("0" + (currentDate.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + currentDate.getDate()).slice(-2) +
    "T" +
    ("0" + currentDate.getHours()).slice(-2) +
    ":" +
    ("0" + currentDate.getMinutes()).slice(-2) +
    ":" +
    ("0" + currentDate.getSeconds()).slice(-2);

  let formattedDate = null;

  const timeFromJson = activitySingleInformation?.time;
  const dateString = activitySingleInformation?.date;

  if (timeFromJson && dateString) {
    const [hoursStr, minutesStr] = timeFromJson.split(":");
    const hoursToAdd = parseInt(hoursStr, 10);
    const minutesToAdd = parseInt(minutesStr, 10);

    const dateFromJson = new Date(dateString);
    dateFromJson.setHours(dateFromJson.getHours() + hoursToAdd);
    dateFromJson.setMinutes(dateFromJson.getMinutes() + minutesToAdd);

    formattedDate = dateFromJson.toISOString();
  }

  const date1 = new Date(isoDateString);
  const date2 = new Date(formattedDate);

  const differenceMs = date1.getTime() - date2.getTime();

  const differenceHours = differenceMs / (1000 * 60 * 60) + 2;

  return (
    <>
      <div className="px-4 py-4">
        <div className="flex items-center justify-between mx-2">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            {registeredUser.firstName + " " + registeredUser.lastName}
          </h3>

          <p className="font-medium text-gray-500">
            <span className="text-lg font-semibold text-gray-900">
              Abteilung:
            </span>{" "}
            {registeredUser.department.charAt(0).toUpperCase() +
              registeredUser.department.slice(1)}
          </p>
        </div>
        <div className="mt-2 flex items-center justify-between mx-2">
          <div className="flex flex-col items-start text-sm font-medium text-gray-500">
            {registeredUser.classesRegistered.map((element, index) => {
              if (element.registeredClassID === activityId)
                return (
                  <React.Fragment key={element.registeredClassID}>
                    {element.statusAttended === "teilgenommen" ? (
                      <>
                        <span
                          className={`${registeredUser} mx-auto mb-1 text-md font-semibold text-gray-900 hidden lg:inline`}
                        >
                          Teilnahmestatus:{" "}
                        </span>
                        <img src={attended} width={150} alt="teilgenommen" />
                      </>
                    ) : element.statusAttended === "nicht teilgenommen" ? (
                      <>
                        <span
                          className={`${registeredUser} mx-auto mb-1 text-md font-semibold text-gray-900 hidden lg:inline`}
                        >
                          Teilnahmestatus:{" "}
                        </span>
                        <img
                          src={notAttended}
                          width={150}
                          alt="nichtTeilgenommen"
                        />
                      </>
                    ) : (
                      <span className="hidden">Placeholder</span>
                    )}
                  </React.Fragment>
                );
            })}
          </div>

          <div className="flex flex-col items-end text-sm font-medium text-gray-500">
            <span className="mr-2 mb-1 text-md font-semibold text-gray-900 hidden lg:inline">
              Genehmigungsstatus:{" "}
            </span>
            {registeredUser.classesRegistered.map((element, index) => {
              if (element.registeredClassID === activityId)
                return (
                  <React.Fragment key={element.registeredClassID}>
                    {element.status === "genehmigt" ? (
                      <img src={approved} width={150} alt="genehmigt" />
                    ) : element.status === "abgelehnt" ? (
                      <div className="flex items-center">
                        <span
                          className="tooltip mr-1 hover:cursor-pointer"
                          style={{ width: "auto", height: "auto" }}
                          data-tip={element.reason}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="#ffb951"
                            className="w-8 h-8"
                          >
                            <path
                              fillRule="evenodd"
                              d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 0 1 .67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 1 1-.671-1.34l.041-.022ZM12 9a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                        <img src={declined} width={150} alt="abgelehnt" />
                      </div>
                    ) : (
                      <img src={pending} width={150} alt="ausstehend" />
                    )}
                  </React.Fragment>
                );
            })}
          </div>
        </div>
      </div>
      {differenceHours < 24 && differenceHours > 0 ? (
        registeredUser.classesRegistered.some(
          (element) =>
            element.registeredClassID === activityId &&
            element.status === "genehmigt" &&
            element.statusAttended === "in Prüfung"
        ) ? (
          <div className="flex justify-center gap-2 px-4 py-6 lg:gap-4">
            <label hidden={hideAttendedBtn} className="cursor-pointer">
              <input
                onChange={handleParticipated}
                type="radio"
                className="peer sr-only"
                value="teilgenommen"
              />
              <div className="shadow-md border w-40 max-w-xl rounded-md bg-white p-3 text-gray-600 ring-2 ring-transparent transition-all hover:bg-slate-200 peer-checked:text-sky-600 hover:ring-red-400 peer-checked:ring-offset-2 lg:w-60 lg:p-4">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold uppercase text-gray-500 mr-1">
                      Teilgenommen
                    </p>
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </label>

            <label hidden={hideAttendedBtn} className="cursor-pointer">
              <input
                onChange={handleNotParticipated}
                type="radio"
                className="peer sr-only"
                value="nicht teilgenommen"
              />
              <div className="shadow-md border w-40 max-w-xl rounded-md bg-white p-3 text-gray-600 ring-2 ring-transparent transition-all hover:bg-slate-200 peer-checked:text-sky-600 hover:ring-red-400 peer-checked:ring-offset-2 lg:w-60 lg:p-4">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold uppercase text-gray-500 lg:hidden">
                      Nicht Teilgen.
                    </p>
                    <p className="hidden lg:inline text-sm font-semibold uppercase text-gray-500">
                      Nicht Teilgenommen
                    </p>
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </label>

            <div
              hidden={submitedAttended}
              className="shadow-md border w-40 max-w-xl rounded-md bg-white p-3 text-gray-600 ring-2 ring-transparent transition-all hover:bg-slate-200 peer-checked:text-sky-600 hover:ring-red-400 peer-checked:ring-offset-2 lg:p-4"
            >
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold uppercase text-gray-500 mx-auto">
                    Übermittelt
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center gap-4 px-4 pt-2 pb-6">
            <div className="shadow-md border w-fit max-w-xl rounded-md bg-white p-3 text-gray-600 ring-2 ring-transparent transition-all hover:bg-slate-200 peer-checked:text-sky-600 hover:ring-red-400 peer-checked:ring-offset-2 lg:p-4">
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold uppercase text-gray-500">
                    Keine Antwort Erforderlich
                  </p>
                </div>
              </div>
            </div>
          </div>
        )
      ) : (
        <div className="flex justify-center gap-4 px-4 pt-2 pb-6">
          <div className="shadow-md border w-fit max-w-xl rounded-md bg-white p-3 text-gray-600 ring-2 ring-transparent transition-all hover:bg-slate-200 peer-checked:text-sky-600 hover:ring-red-400 peer-checked:ring-offset-2 lg:p-4">
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold uppercase text-gray-500">
                  {differenceHours > 24
                    ? "Änderungen nicht mehr möglich"
                    : "Noch nicht begonnen"}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
