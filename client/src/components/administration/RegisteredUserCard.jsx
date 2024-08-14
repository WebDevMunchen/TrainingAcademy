import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import axiosClient from "../../utils/axiosClient";
import { useParams } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import attended from "../../assets/attended.png";
import approved from "../../assets/approved.png";
import pending from "../../assets/pending.png";
import declined from "../../assets/declined.png";
import notAttended from "../../assets/notAttended.png";
import "react-toastify/dist/ReactToastify.css";

export default function RegisteredUserCard({
  registeredUser,
  activityId,
  setActivity,
}) {
  const { user, setAllActivities, setUser, currentMonth, currentYear } =
    useContext(AuthContext);
  const { id } = useParams();
  const modalRef = useRef(null);

  const [hideChangedBtn, setHideChangedBtn] = useState(false);
  const [submitedChangedStatus, setSubmitedChangedStatus] = useState(true);

  const [hideAttendedBtn, setHideAttendedBtn] = useState(false);
  const [submitedAttended, setSubmitedAttended] = useState(true);

  const [declineReason, setDeclineReason] = useState("");

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

  const approve = (status) => {
    axiosClient
      .put(`/user/updateClassStatus/${registeredUser._id}`, {
        classId: id,
        newStatus: status,
      })
      .then((response) => {
        return axiosClient.put(`/classActivity/increaseClassCapacity/${id}`);
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
        notifySuccess();
      })
      .catch((error) => {
        notifyError();
        setHideChangedBtn(false);
        setSubmitedChangedStatus(true);
      });
  };

  const decline = (status, reason) => {
    axiosClient
      .put(`/user/updateClassStatus/${registeredUser._id}`, {
        classId: id,
        newStatus: status,
        reason: reason,
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
        notifySuccess();
      })
      .catch((error) => {
        if (error.name === "AxiosError") {
          notifyError();
          setHideChangedBtn(false);
          setSubmitedChangedStatus(true);
        }
      });
  };

  const declineWithCapacityIncrease = (status, reason) => {
    axiosClient
      .put(`/user/updateClassStatus/${registeredUser._id}`, {
        classId: id,
        newStatus: status,
        reason: reason,
      })
      .then((response) => {
        return axiosClient.put(`/classActivity/decreaseClassCapacity/${id}`);
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
        notifySuccess();
      })
      .catch((error) => {
        if (error.name === "AxiosError") {
          notifyError();
          setHideChangedBtn(false);
          setSubmitedChangedStatus(true);
        }
      });
  };

  const handleApproved = (e) => {
    if (e.target.checked) {
      const status = e.target.value;
      approve(status);
      setHideChangedBtn(true);
      setSubmitedChangedStatus(false);
    }
  };

  const handleDeclined = (e) => {
    if (e.target.checked) {
      const status = e.target.value;
      decline(status, declineReason);
      setHideChangedBtn(true);
      setSubmitedChangedStatus(false);
    }
  };

  const handleDeclinedWithCapcityIncrease = (e) => {
    if (e.target.checked) {
      const status = e.target.value;
      declineWithCapacityIncrease(status, declineReason);
      setHideChangedBtn(true);
      setSubmitedChangedStatus(false);
    }
  };

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
        notifySuccessAttended();
      })
      .catch((error) => {});
  };

  const handleParticipated = (e) => {
    if (e.target.checked) {
      const status = e.target.value;
      participated(status);
      setHideAttendedBtn(true);
      setSubmitedAttended(false);
    }
  };

  const handleNotParticipated = (e) => {
    if (e.target.checked) {
      const status = e.target.value;
      notParticipated(status);
      setHideAttendedBtn(true);
      setSubmitedAttended(false);
    }
  };

  const closeModal = () => {
    if (modalRef.current) {
      modalRef.current.close();
    }
  };

  const notifySuccess = () =>
    toast.success("Genehmigung geändert", {
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

  const notifyError = () =>
    toast.error(`Die Genehmigung könnte nicht geändert werden`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
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
        <div className="flex items-center justify-between">
          <h3 className="leading-6 font-medium text-gray-900 lg:text-lg">
            {registeredUser.firstName + " " + registeredUser.lastName}
          </h3>

          <p className="font-medium text-gray-500">
            <span className="font-semibold text-gray-900 lg:text-lg">
              Abteilung:
            </span>{" "}
            {registeredUser.department.charAt(0).toUpperCase() +
              registeredUser.department.slice(1)}
          </p>
        </div>
        <div className="mt-2 flex items-center justify-between">
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
                        <img
                          className={`w-[130px] lg:w-[150px]`}
                          src={attended}
                          alt="teilgenommen"
                        />
                      </>
                    ) : element.statusAttended === "nicht teilgenommen" ? (
                      <>
                        <span
                          className={`${registeredUser} mx-auto mb-1 text-md font-semibold text-gray-900 hidden lg:inline`}
                        >
                          Teilnahmestatus:{" "}
                        </span>
                        <img
                          className={`w-[130px] lg:w-[150px]`}
                          src={notAttended}
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
                      <img
                        className={`w-[130px] lg:w-[150px]`}
                        src={approved}
                        alt="genehmigt"
                      />
                    ) : element.status === "abgelehnt" ? (
                      <div className="flex items-center">
                        <span
                          className="tooltip mr-1 hover:cursor-pointer"
                          style={{ width: "auto", height: "auto" }}
                          data-tip={
                            /^[^a-zA-Z]*$/.test(element.reason)
                              ? "Kein Grund vorhanden"
                              : element.reason
                          }
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
                        <img
                          className={`w-[130px] lg:w-[150px]`}
                          src={declined}
                          alt="abgelehnt"
                        />
                      </div>
                    ) : (
                      <img
                        className={`w-[130px] lg:w-[150px]`}
                        src={pending}
                        alt="ausstehend"
                      />
                    )}
                  </React.Fragment>
                );
            })}
          </div>
        </div>
      </div>
      {user.role === "ASP" || user.role === "admin" ? (
        <>
          <div
            className={`flex justify-center gap-4 px-4 pt-2 pb-6 ${
              differenceHours > -24 ? "flex" : "hidden"
            }`}
          >
            <label className="cursor-pointer">
              <input type="radio" className="peer sr-only" />
              <div className="shadow-md border w-40 max-w-xl rounded-md bg-white p-4 text-gray-600 ring-2 ring-transparent transition-all hover:bg-slate-200 peer-checked:text-sky-600 hover:ring-blue-400 peer-checked:ring-offset-2 lg:w-72">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-center">
                    <p className="text-sm font-semibold uppercase text-gray-500">
                      Änderungen nicht mehr möglich
                    </p>
                  </div>
                </div>
              </div>
            </label>
          </div>
          <div
            className={`flex justify-center gap-4 px-4 pt-2 pb-6 ${
              differenceHours < -24 ? "flex" : "hidden"
            }`}
          >
            {registeredUser.classesRegistered.some(
              (element) =>
                element.registeredClassID === activityId &&
                element.status === "ausstehend"
            ) ? (
              <>
                <label className="cursor-pointer">
                  <input
                    onChange={handleApproved}
                    type="radio"
                    className="peer sr-only"
                    value="genehmigt"
                  />
                  <div className="shadow-md border w-40 max-w-xl rounded-md bg-white p-4 text-gray-600 ring-2 ring-transparent transition-all hover:bg-slate-200 peer-checked:text-sky-600 hover:ring-blue-400 peer-checked:ring-offset-2 lg:w-52">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold uppercase text-gray-500">
                          Genehmigen
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
                <button
                  className="shadow-md border w-36 max-w-xl rounded-md bg-white p-4 text-gray-600 ring-2 ring-transparent transition-all hover:bg-slate-200 peer-checked:text-sky-600 hover:ring-red-400 peer-checked:ring-offset-2 lg:w-52"
                  onClick={() => modalRef.current.showModal()}
                >
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold uppercase text-gray-500">
                        Ablehnen
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
                </button>
                <dialog ref={modalRef} id="my_modal_1" className="modal">
                  <div className="modal-box">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-lg">
                        Genehmigung ablehnen
                      </h3>
                      <span>
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
                            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                          />
                        </svg>
                      </span>
                    </div>

                    <p className="py-2">
                      Möchtest du für{" "}
                      {registeredUser.firstName + " " + registeredUser.lastName}{" "}
                      die Anfrage zur Teilnahme an dieser Schulung wirklich
                      ablehnen?
                    </p>
                    <div className="modal-action mr-2.5">
                      <form method="dialog" className="flex gap-2">
                        <div>
                          <div className="w-72 mx-auto lg:w-96 mr-8">
                            <label
                              htmlFor="description"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                              Begründung:
                            </label>
                            <textarea
                              className="mb-4 w-full resize-none bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 lg:w-full"
                              placeholder="Gib eine Begründung ein..."
                              value={declineReason}
                              onChange={(e) => setDeclineReason(e.target.value)}
                            />
                          </div>
                          <div className="flex justify-end gap-2">
                            <label className="btn w-fit bg-red-500 text-white hover:bg-red-700">
                              <input
                                onChange={handleDeclined}
                                onClick={closeModal}
                                type="radio"
                                className="peer sr-only"
                                value="abgelehnt"
                              />
                              Bestätigen
                            </label>
                            <button className="btn w-28">Abbrechen</button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </dialog>
              </>
            ) : (
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <button
                    hidden={submitedChangedStatus}
                    className="shadow-md border w-44 max-w-xl rounded-md bg-white p-4 text-gray-600 ring-2 ring-transparent transition-all hover:bg-slate-200 peer-checked:text-sky-600 hover:ring-red-400 peer-checked:ring-offset-2"
                  >
                    <span className="flex justify-center items-center gap-2 text-sm font-semibold uppercase text-gray-500">
                      Übermittelt
                    </span>
                  </button>
                  <button
                    hidden={hideChangedBtn}
                    className="shadow-md border w-44 max-w-xl rounded-md bg-white p-4 text-gray-600 ring-2 ring-transparent transition-all hover:bg-slate-200 peer-checked:text-sky-600 hover:ring-red-400 peer-checked:ring-offset-2"
                    onClick={() => modalRef.current.showModal()}
                  >
                    <span className="flex justify-center items-center gap-2 text-sm font-semibold uppercase text-gray-500">
                      Ändern
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          fillRule="evenodd"
                          d="M15.97 2.47a.75.75 0 0 1 1.06 0l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 1 1-1.06-1.06l3.22-3.22H7.5a.75.75 0 0 1 0-1.5h11.69l-3.22-3.22a.75.75 0 0 1 0-1.06Zm-7.94 9a.75.75 0 0 1 0 1.06l-3.22 3.22H16.5a.75.75 0 0 1 0 1.5H4.81l3.22 3.22a.75.75 0 1 1-1.06 1.06l-4.5-4.5a.75.75 0 0 1 0-1.06l4.5-4.5a.75.75 0 0 1 1.06 0Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  </button>
                  <dialog ref={modalRef} id="my_modal_1" className="modal">
                    <div className="modal-box">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-lg">
                          Genehmigung ändern
                        </h3>
                        <span>
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
                              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                            />
                          </svg>
                        </span>
                      </div>

                      <p className="py-2">
                        Möchtest du für{" "}
                        {registeredUser.firstName +
                          " " +
                          registeredUser.lastName}{" "}
                        die Anfrage zur Teilnahme an dieser Schulung wirklich
                        ändern?
                      </p>
                      <div className="modal-action">
                        <form method="dialog" className="flex gap-2">
                          {registeredUser.classesRegistered.some(
                            (element) =>
                              element.registeredClassID === activityId &&
                              element.status === "genehmigt"
                          ) ? (
                            <div>
                              <div className="w-72 mr-0 lg:w-96 lg:mr-12">
                                <label
                                  htmlFor="description"
                                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                  Begründung:
                                </label>
                                <textarea
                                  className="mb-4 mr-12 resize-none bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                  placeholder="Gib eine Begründung ein..."
                                  value={declineReason}
                                  onChange={(e) =>
                                    setDeclineReason(e.target.value)
                                  }
                                />
                              </div>
                              <div className="flex justify-end gap-2">
                                <label className="btn w-fit bg-red-500 text-white hover:bg-red-700">
                                  <input
                                    onChange={handleDeclinedWithCapcityIncrease}
                                    onClick={closeModal}
                                    type="radio"
                                    className="peer sr-only"
                                    value="abgelehnt"
                                  />
                                  In "abgelehnt" ändern
                                </label>

                                <button className="btn w-28">Abbrechen</button>
                              </div>
                            </div>
                          ) : (
                            <>
                              <label className="btn w-fit bg-green-600 text-white hover:bg-green-700">
                                <input
                                  onChange={handleApproved}
                                  onClick={closeModal}
                                  type="radio"
                                  className="peer sr-only"
                                  value="genehmigt"
                                />
                                In "Genehmigt" ändern
                              </label>
                              <button className="btn w-28">Abbrechen</button>
                            </>
                          )}
                        </form>
                      </div>
                    </div>
                  </dialog>
                </div>
              </div>
            )}
          </div>
        </>
      ) : (
        <>
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
      )}
    </>
  );
}
