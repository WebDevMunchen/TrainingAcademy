import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import axiosClient from "../../utils/axiosClient";
import { useParams } from "react-router-dom";

export default function RegisteredUserCard({ registeredUser, activityId }) {
  const { user } = useContext(AuthContext);
  const { id } = useParams();

  const [hideApprovalButtons, setHideApprovalButtons] = useState(false)
  const [submited, setSubmited] = useState(true)

  const [hideAttendedBtn, setHideAttendedBtn] = useState(false)
  const [submitedAttended, setSubmitedAttended] = useState(true)

  const approve = (status) => {
    axiosClient
      .put(`/user/updateClassStatus/${registeredUser._id}`, {
        classId: id,
        newStatus: status,
      })
      .then((response) => {
        return (
          axiosClient.put(`/classActivity/increaseClassCapacity/${id}`),
          console.log("Slot increased")
        );
      })
      .then((response) => {
        setHideApprovalButtons(true)
        setSubmited(false)
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
        return (
          axiosClient.put(`/classActivity/decreaseClassCapacity/${id}`),
          console.log("Slot decreased")
        );
      })
      .then((response) => {
        setHideApprovalButtons(true)
        setSubmited(false)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleApproved = (e) => {
    if (e.target.checked) {
      const status = e.target.value;
      approve(status);
    }
  };

  const handleDeclined = (e) => {
    if (e.target.checked) {
      const status = e.target.value;
      decline(status);
    }
  };

  const participated = (status) => {
    axiosClient
      .put(`/user/updateAttended/${registeredUser._id}`, {
        classId: id,
        newStatusAttended: status,
      })
      .then((response) => {
        setHideAttendedBtn(true)
        setSubmitedAttended(false)
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
        setHideAttendedBtn(true)
        setSubmitedAttended(false)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleParticipated = (e) => {
    if (e.target.checked) {
      const status = e.target.value;
      participated(status);
    }
  };

  const handleNotParticipated = (e) => {
    if (e.target.checked) {
      const status = e.target.value;
      notParticipated(status);
    }
  };

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
              <label hidden={hideApprovalButtons} class="cursor-pointer">
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

              <label hidden={hideApprovalButtons} class="cursor-pointer">
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

              <div hidden={submited} class="shadow-md border w-60 max-w-xl rounded-md bg-white p-4 text-gray-600 ring-2 ring-transparent transition-all hover:bg-slate-200 peer-checked:text-sky-600 hover:ring-red-400 peer-checked:ring-offset-2">
                  <div class="flex flex-col gap-1">
                    <div class="flex items-center justify-between">
                      <p class="text-sm text-center font-semibold uppercase text-gray-500">
                        Übermittelt
                      </p>
                      {/* <div>
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
                      </div> */}
                    </div>
                  </div>
                </div>
            </>
          ) : (
            <div class="shadow-md border w-60 max-w-xl rounded-md bg-white p-4 text-gray-600 ring-2 ring-transparent transition-all hover:bg-slate-200 peer-checked:text-sky-600 hover:ring-red-400 peer-checked:ring-offset-2">
              <div class="flex flex-col gap-1">
                <div class="flex items-center justify-between">
                  <p class="text-sm font-semibold uppercase text-gray-500">
                    Ändern
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

              <div hidden={submitedAttended} class="shadow-md border w-60 max-w-xl rounded-md bg-white p-4 text-gray-600 ring-2 ring-transparent transition-all hover:bg-slate-200 peer-checked:text-sky-600 hover:ring-red-400 peer-checked:ring-offset-2">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold uppercase text-gray-500">
                        Übermittelt
                      </p>
                      {/* <div>
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
                      </div> */}
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
                      keine Handlung nötig
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
