import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import axiosClient from "../../utils/axiosClient";
import { useParams } from "react-router-dom";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RegisteredUserCard({
  registeredUser,
  activityId,
  setActivity,
}) {
  const { user, setAllActivities } = useContext(AuthContext);
  const { id } = useParams();
  const modalRef = useRef(null);

  const [hideAttendedBtn, setHideAttendedBtn] = useState(false);
  const [submitedAttended, setSubmitedAttended] = useState(true);

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
        return axiosClient.get(`/classActivity/${id}`);
      })
      .then((responseSingleActivity) => {
        setActivity(responseSingleActivity.data);

        return axiosClient.get(`/classActivity/allActivities`);
      })
      .then((responseAllActivities) => {
        setAllActivities(responseAllActivities.data);
        console.log("Success")

      })
      .catch((error) => {
        console.log(error);
      });
  };

  const decline = (status) => {
    axiosClient
      .put(`/user/updateClassStatus/${registeredUser._id}`, {
        classId: id,
        newStatus: status,
      })
      .then((response) => {
        return axiosClient.get(`/classActivity/${id}`);
      })
      .then((responseSingleActivity) => {
        setActivity(responseSingleActivity.data);

        return axiosClient.get(`/classActivity/allActivities`);
      })
      .then((responseAllActivities) => {
        setAllActivities(responseAllActivities.data);
        console.log("Success")
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const declineWithCapacityIncrease = (status) => {
    axiosClient
      .put(`/user/updateClassStatus/${registeredUser._id}`, {
        classId: id,
        newStatus: status,
      })
      .then((response) => {
        return axiosClient.put(`/classActivity/decreaseClassCapacity/${id}`);
      })
      .then((response) => {
        return axiosClient.get(`/classActivity/${id}`);
      })
      .then((responseSingleActivity) => {
        setActivity(responseSingleActivity.data);

        return axiosClient.get(`/classActivity/allActivities`);
      })
      .then((responseAllActivities) => {
        setAllActivities(responseAllActivities.data);
        console.log("Success")

      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleApproved = (e) => {
    if (e.target.checked) {
      const status = e.target.value;
      approve(status);
      notifySuccess()
    }
  };

  const handleDeclined = (e) => {
    if (e.target.checked) {
      const status = e.target.value;
      decline(status);
      notifySuccess()
    }
  };

  const handleDeclinedWithCapcityIncrease = (e) => {
    if (e.target.checked) {
      const status = e.target.value;
      declineWithCapacityIncrease(status);
      notifySuccess()
    }
  };

  const participated = (status) => {
    axiosClient
      .put(`/user/updateAttended/${registeredUser._id}`, {
        classId: id,
        newStatusAttended: status,
      })
      .then((response) => {
        console.log("Success");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const notParticipated = (status) => {
    axiosClient
      .put(`/user/updateAttended/${registeredUser._id}`, {
        classId: id,
        newStatusAttended: status,
      })
      .then((response) => {
        console.log("Success");
      })
      .catch((error) => {
        console.log(error);
      });
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
      modalRef.current.close(); // Close the modal
    }
  };

  const notifySuccess = () =>
    toast.success("Genehmigung geändert", {
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

  let dPath = "";
  let spanStyle = "";

  if (registeredUser.status === "abgelehnt") {
    spanStyle =
      "inline-flex items-center bg-red-600 rounded-full px-3 text-sm text-white py-1 font-medium";
    dPath =
      "m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z";
  } else if (registeredUser.status === "genehmigt") {
    spanStyle =
      "inline-flex items-center bg-green-600 rounded-full px-3 text-sm text-white py-1 font-medium";
    dPath = "M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z";
  } else {
    spanStyle =
      "inline-flex items-center bg-orange-500 rounded-full px-3 text-sm text-white py-1 font-medium";
    dPath =
      "M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z";
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        theme="light"
        transition={Bounce}
      />
      
      <div className="px-4 py-4 sm:px-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            {registeredUser.firstName + " " + registeredUser.lastName}
          </h3>
          <p className="flex items-center text-sm font-medium text-gray-500">
            <span className="mr-2 text-md font-semibold text-gray-900">
              Status:{" "}
            </span>
            {registeredUser.classesRegistered.map((element) => {
              if (element.registeredClassID === activityId)
                return (
                  <>
                    {element.status === "genehmigt" ? (
                      <span className="inline-flex items-center bg-green-600 rounded-full px-3 text-sm text-white py-1 font-medium">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6 mr-2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                          />
                        </svg>
                        {element.status}
                      </span>
                    ) : element.status === "abgelehnt" ? (
                      <span className="inline-flex items-center bg-red-600 rounded-full px-3 text-sm text-white py-1 font-medium">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6 mr-2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                          />
                        </svg>
                        {element.status}
                      </span>
                    ) : (
                      <span className="inline-flex items-center bg-orange-500 rounded-full px-3 text-sm text-white py-1 font-medium">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6 mr-2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
                          />
                        </svg>
                        {element.status}
                      </span>
                    )}
                  </>
                );
            })}
          </p>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm font-medium text-gray-500">
            <span className="text-md font-semibold text-gray-900">
              Abteilung:
            </span>{" "}
            {registeredUser.department}
          </p>
        </div>
      </div>
      {user.role === "ASP" || user.role === "admin" ? (
        <div className="flex justify-center gap-4 px-4 py-6">
          {registeredUser.classesRegistered.some(
            (element) =>
              element.registeredClassID === activityId &&
              element.status === "ausstehend"
          ) ? (
            <>
              <label class="cursor-pointer">
                <input
                  onChange={handleApproved}
                  type="radio"
                  class="peer sr-only"
                  value="genehmigt"
                />
                <div class="shadow-md border w-60 max-w-xl rounded-md bg-white p-4 text-gray-600 ring-2 ring-transparent transition-all hover:bg-slate-200 peer-checked:text-sky-600 hover:ring-blue-400 peer-checked:ring-offset-2">
                  <div class="flex flex-col gap-1">
                    <div class="flex items-center justify-between">
                      <p class="text-sm font-semibold uppercase text-gray-500">
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

              <label class="cursor-pointer">
                <input
                  onChange={handleDeclined}
                  type="radio"
                  class="peer sr-only"
                  value="abgelehnt"
                />
                <div class="shadow-md border w-60 max-w-xl rounded-md bg-white p-4 text-gray-600 ring-2 ring-transparent transition-all hover:bg-slate-200 peer-checked:text-sky-600 hover:ring-red-400 peer-checked:ring-offset-2">
                  <div class="flex flex-col gap-1">
                    <div class="flex items-center justify-between">
                      <p class="text-sm font-semibold uppercase text-gray-500">
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
                </div>
              </label>
            </>
          ) : (
            <div class="flex flex-col gap-1">
              <div class="flex items-center justify-between">
                <button
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
                        d="M4.755 10.059a7.5 7.5 0 0 1 12.548-3.364l1.903 1.903h-3.183a.75.75 0 1 0 0 1.5h4.992a.75.75 0 0 0 .75-.75V4.356a.75.75 0 0 0-1.5 0v3.18l-1.9-1.9A9 9 0 0 0 3.306 9.67a.75.75 0 1 0 1.45.388Zm15.408 3.352a.75.75 0 0 0-.919.53 7.5 7.5 0 0 1-12.548 3.364l-1.902-1.903h3.183a.75.75 0 0 0 0-1.5H2.984a.75.75 0 0 0-.75.75v4.992a.75.75 0 0 0 1.5 0v-3.18l1.9 1.9a9 9 0 0 0 15.059-4.035.75.75 0 0 0-.53-.918Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </button>
                <dialog ref={modalRef} id="my_modal_1" className="modal">
                  <div className="modal-box">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-lg">Genehmigung Ändern</h3>
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

                    <p className="py-4">
                      Möchtest du den Genehmigungsstatus für{" "}
                      {registeredUser.firstName + " " + registeredUser.lastName}{" "}
                      bei dieser Schulung ändern?
                    </p>
                    <div className="modal-action">
                      <form method="dialog" className="flex gap-2">
                        {registeredUser.classesRegistered.some(
                          (element) =>
                            element.registeredClassID === activityId &&
                            element.status === "genehmigt"
                        ) ? (
                          <label className="btn w-fit bg-red-500 text-white hover:bg-red-700">
                            <input
                              onChange={handleDeclinedWithCapcityIncrease}
                              onClick={closeModal}
                              type="radio"
                              class="peer sr-only"
                              value="abgelehnt"
                            />
                            In "Abgelehnt" ändern
                          </label>
                        ) : (
                          <label className="btn w-fit bg-green-600 text-white hover:bg-green-700">
                            <input
                              onChange={handleApproved}
                              onClick={closeModal}
                              type="radio"
                              class="peer sr-only"
                              value="genehmigt"
                            />
                            In "Genehmigt" ändern
                          </label>
                        )}
                        <button className="btn w-28">Abbrechen</button>
                      </form>
                    </div>
                  </div>
                </dialog>
              </div>
            </div>
          )}
        </div>
      ) : (
        <>
          {registeredUser.classesRegistered.some(
            (element) =>
              element.registeredClassID === activityId &&
              element.status === "genehmigt" &&
              element.statusAttended === "in Prüfung"
          ) ? (
            <div className="flex justify-center gap-4 px-4 py-6">
              <label hidden={hideAttendedBtn} className="cursor-pointer">
                <input
                  onChange={handleParticipated}
                  type="radio"
                  className="peer sr-only"
                  value="teilgenommen"
                />
                <div class="shadow-md border w-60 max-w-xl rounded-md bg-white p-4 text-gray-600 ring-2 ring-transparent transition-all hover:bg-slate-200 peer-checked:text-sky-600 hover:ring-red-400 peer-checked:ring-offset-2">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold uppercase text-gray-500">
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
                <div class="shadow-md border w-60 max-w-xl rounded-md bg-white p-4 text-gray-600 ring-2 ring-transparent transition-all hover:bg-slate-200 peer-checked:text-sky-600 hover:ring-red-400 peer-checked:ring-offset-2">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold uppercase text-gray-500">
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
                class="shadow-md border w-60 max-w-xl rounded-md bg-white p-4 text-gray-600 ring-2 ring-transparent transition-all hover:bg-slate-200 peer-checked:text-sky-600 hover:ring-red-400 peer-checked:ring-offset-2"
              >
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold uppercase text-gray-500">
                      Übermittelt
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex justify-center gap-4 px-4 py-6">
              <div class="shadow-md border w-fit max-w-xl rounded-md bg-white p-4 text-gray-600 ring-2 ring-transparent transition-all hover:bg-slate-200 peer-checked:text-sky-600 hover:ring-red-400 peer-checked:ring-offset-2">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold uppercase text-gray-500">
                      Keine Antwort Erforderlich
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
