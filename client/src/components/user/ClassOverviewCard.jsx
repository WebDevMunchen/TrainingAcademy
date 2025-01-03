import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import axiosClient from "../../utils/axiosClient";
import attended from "../../assets/attended.png";
import approved from "../../assets/approved.png";
import pending from "../../assets/pending.png";
import declined from "../../assets/declined.png";
import notAttended from "../../assets/notAttended.png";

export default function ClassesOverviewCard({ activity }) {
  const { setUser, setAllActivities, currentMonth, currentYear } =
    useContext(AuthContext);
  const modalRef = useRef(null);
  const [selectedReason, setSelectedReason] = useState("");

  const cancelClass = (stornoReason) => {
    axiosClient
      .put(`/classActivity/cancelClass/${activity.registeredClassID._id}`, {
        stornoReason: [stornoReason],
        withCredentials: true,
      })
      .then(() => {
        return axiosClient.put(
          `/classActivity/updateReason/${activity.registeredClassID._id}`,
          {
            stornoReason: [stornoReason],
            withCredentials: true,
          }
        );
      })
      .then(() => {
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

  const dateString = activity?.registeredClassID?.date;
  const timeString = activity?.registeredClassID?.time;
  const date = new Date(dateString);

  const timeParts = timeString.split(":");
  if (timeParts.length === 2) {
    date.setHours(parseInt(timeParts[0], 10) - 1);
    date.setMinutes(parseInt(timeParts[1], 10));
  }

  const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  const currentDateTime = new Date();
  const adjustedCurrentDateTime = new Date(
    currentDateTime.getTime() + 0 * 60 * 60 * 1000
  );
  const canCancel = localDate >= adjustedCurrentDateTime;

  const showLegend = () => {
    document.getElementById("legend").showModal();
  };

  const closeModal = () => {
    if (modalRef.current) {
      modalRef.current.close();
    }
  };

  const handleCancelation = () => {
    if (selectedReason) {
      cancelClass(selectedReason);
    }
  };

  const reasons = [
    "Ich bin krank",
    "Ich muss kurzfristig auf ein Projekt",
    "Ich mache Home Office",
    "Ich habe kurzfristig Urlaub",
    "Ich habe einen anderen Termin reinbekommen",
    "Ich habe mich fälschlicherweise angemeldet",
    "Meine Arbeitsauslastung ist zu hoch",
    "Ich habe doch keinen Bedarf mehr",
    "Ich habe keine Lust",
    "Sonstiges",
  ];

  const getDate = new Date(activity?.registeredClassID?.date);
  const day = getDate.getDate();
  const month = getDate.getMonth() + 1;
  const year = getDate.getFullYear();
  const displayFormattedDate = `${day}/${month}/${year}`;

  const exportCalendar = () => {
    axiosClient
      .get(`/classActivity/export-calendar/${activity.registeredClassID._id}`, {
        responseType: "blob", // Important for file downloads
      })
      .then((response) => {
        // Create a blob from the response
        const blob = new Blob([response.data], { type: "text/calendar" });

        // Create a download link
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = `${activity.registeredClassID.title}.ics`; // File name
        link.click();

        console.log("Calendar exported successfully.");
      })
      .catch((error) => {
        console.error("Error exporting calendar:", error);
      });
  };

  const sendReminder = () => {
    axiosClient
      .put(`/classActivity/sendReminder/${activity.registeredClassID._id}`)
      .then(() => {
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
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="bg-white border m-2 p-2 relative group shadow-lg">
        <div className="absolute bg-blue-500/50 top-0 left-0 w-24 h-1 transition-all duration-200 group-hover:bg-orange-300 group-hover:w-1/2  "></div>
        <div className="flex justify-between lg:hidden">
          <div className="flex flex-col items-center">
            {activity.statusAttended === "in Prüfung" ? (
              <span className="invisible">Placeholder</span>
            ) : (
              <span className="mr-2 mb-1 text-md font-semibold text-gray-900 hidden lg:inline">
                Tailnahmestatus{" "}
              </span>
            )}
            {activity.statusAttended === "in Prüfung" ? (
              <img
                className="invisible"
                src={attended}
                width={125}
                alt="teilgenommen"
              />
            ) : activity.statusAttended === "teilgenommen" ? (
              <img src={attended} width={125} alt="teilgenommen" />
            ) : (
              <img width={125} src={notAttended} alt="nichtTeilgenommen" />
            )}
          </div>
          <div className="flex ml-2 flex-col items-center">
            <span className="mr-2 mb-1 text-md font-semibold text-gray-900 hidden lg:inline">
              Genehmigungsstatus:{" "}
            </span>
            <div className="flex items-center flex-row lg:flex-row lg:items-center">
              {activity.status === "abgelehnt" && (
                <span
                  className="tooltip mr-0 hover:cursor-pointer lg:mr-2"
                  style={{ width: "auto", height: "auto" }}
                  data-tip={activity.reason}
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
              )}

              {activity.status === "abgelehnt" ? (
                <img src={declined} width={125} alt="abgelehnt" />
              ) : activity.status === "genehmigt" ? (
                <img src={approved} width={125} alt="genehmigt" />
              ) : (
                <img src={pending} width={125} alt="ausstehend" />
              )}
            </div>
          </div>
        </div>
        <div className="flex px-0 justify-center gap-4 lg:justify-between lg:px-2 lg:mt-4 lg:mr-0 lg:items-center">
          <div className="hidden lg:flex flex-col items-center">
            {activity.statusAttended === "in Prüfung" ? (
              <span className="invisible">Placeholder</span>
            ) : (
              <span className="mr-2 mb-1 text-md font-semibold text-gray-900 hidden lg:inline">
                Tailnahmestatus{" "}
              </span>
            )}
            {activity.statusAttended === "in Prüfung" ? (
              <img
                className="invisible"
                src={attended}
                width={150}
                alt="teilgenommen"
              />
            ) : activity.statusAttended === "teilgenommen" ? (
              <img src={attended} width={150} alt="teilgenommen" />
            ) : (
              <img width={150} src={notAttended} alt="nichtTeilgenommen" />
            )}
          </div>
          <div className="flex flex-col lg:ml-6">
            <h3 className="flex justify-center text-lg text-center font-semibold text-black lg:text-lg lg:px-28">
              {activity.registeredClassID?.title}
            </h3>
            <div className="flex justify-center mt-2 mb-1">
              <p>Zielgruppe</p>
            </div>
            <div className="mt-1 flex justify-center lg:mt-4">
              {activity.registeredClassID?.department.map((dept, index) => (
                <img key={index} src={dept} className="w-12 h-12 " />
              ))}
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
                <h2 className="text-center font-poppins font-semibold text-4xl">
                  Legende
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 p-3">
                  <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 flex flex-col items-center">
                    <img
                      className="w-20 mx-auto"
                      src="https://res.cloudinary.com/dtrymbvrp/image/upload/v1715088433/symbols/hczkglpvaybhguywjgku.png"
                      alt="alle"
                    />
                    <p className="font-poppins font-medium text-center text-lg">
                      Alle
                    </p>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 flex flex-col items-center">
                    <img
                      src="https://res.cloudinary.com/dtrymbvrp/image/upload/v1715088434/symbols/ng4emaukxn9adrxpnvlu.png"
                      alt="Vertrieb"
                      className="w-20 mx-auto"
                    />
                    <p className="font-poppins font-medium text-center text-lg">
                      Vertrieb
                    </p>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 flex flex-col items-center">
                    <img
                      src="https://res.cloudinary.com/dtrymbvrp/image/upload/v1715088434/symbols/o4qwfioe3dkqrkhmumd4.png"
                      alt="Logistik"
                      className="w-20 mx-auto"
                    />
                    <p className="font-poppins font-medium text-center text-lg">
                      Logistik
                    </p>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 flex flex-col items-center">
                    <img
                      src="https://res.cloudinary.com/dtrymbvrp/image/upload/v1715088434/symbols/uaozccdgnwtcelxvqjug.png"
                      alt="Fuhrpark"
                      className="w-20 mx-auto"
                    />
                    <p className="font-poppins font-medium text-center text-lg">
                      Fuhrpark
                    </p>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 flex flex-col items-center">
                    <img
                      src="https://res.cloudinary.com/dtrymbvrp/image/upload/v1715088434/symbols/ke8amlflgcdrvdfghzoz.png"
                      alt="IT & Services"
                      className="w-20 mx-auto"
                    />
                    <p className="font-poppins font-medium text-center text-lg">
                      IT & Services
                    </p>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 flex flex-col items-center">
                    <img
                      src="https://res.cloudinary.com/dtrymbvrp/image/upload/v1715088433/symbols/gmnv44k0nydrmfnbr67y.png"
                      alt="HR & Training"
                      className="w-20 mx-auto"
                    />
                    <p className="font-poppins font-medium text-center text-lg">
                      HR & Training
                    </p>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 flex flex-col items-center">
                    <img
                      src="https://res.cloudinary.com/dtrymbvrp/image/upload/v1715088433/symbols/ip7khvjx1dgxosk6lxnb.png"
                      alt="Buchhaltung"
                      className="w-20 mx-auto"
                    />
                    <p className="font-poppins font-medium text-center text-lg">
                      Buchhaltung
                    </p>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 flex flex-col items-center">
                    <img
                      src="https://res.cloudinary.com/dtrymbvrp/image/upload/v1715088434/symbols/ydkcdshvmwdffe4tyf9f.png"
                      alt="item8"
                      className="w-20 mx-auto"
                    />
                    <p className="font-poppins font-medium text-center text-lg">
                      Einkauf & Anmietung
                    </p>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 flex flex-col items-center">
                    <img
                      src="https://res.cloudinary.com/dtrymbvrp/image/upload/v1715088433/symbols/wodezi58z28wwhcvhsev.png"
                      alt="Design & Planung"
                      className="w-20 mx-auto"
                    />
                    <p className="font-poppins font-medium text-center text-lg">
                      Design & Planung
                    </p>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 flex flex-col items-center">
                    <img
                      src="https://res.cloudinary.com/dtrymbvrp/image/upload/v1715088434/symbols/ikluglsekc6msbuvgn0z.png"
                      alt="Projektmanagement"
                      className="w-20 mx-auto"
                    />
                    <p className="font-poppins font-medium text-center text-lg">
                      Projektmanagement
                    </p>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 flex flex-col items-center">
                    <img
                      src="https://res.cloudinary.com/dtrymbvrp/image/upload/v1715088434/symbols/p0m4tdmsd5qdmysdzolk.png"
                      alt="Officemanagement"
                      className="w-20 mx-auto"
                    />
                    <p className="font-poppins font-medium text-center text-lg">
                      Officemanagement
                    </p>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 flex flex-col items-center">
                    <img
                      src="https://res.cloudinary.com/dtrymbvrp/image/upload/v1715088433/symbols/l85s2hjejj6kzkzung8o.png"
                      alt="Gesundheitsmanagement"
                      className="w-20 mx-auto"
                    />
                    <p className="font-poppins font-medium text-center text-lg">
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
          </div>
          <div className="hidden lg:flex ml-2 flex-col items-center">
            <span className="mr-2 mb-1 text-md font-semibold text-gray-900 hidden lg:inline">
              Genehmigungsstatus:{" "}
            </span>
            <div className="flex items-center flex-row lg:flex-row lg:items-center">
              {activity.status === "abgelehnt" && (
                <span
                  className="tooltip mr-0 hover:cursor-pointer lg:mr-2"
                  style={{ width: "auto", height: "auto" }}
                  data-tip={activity.reason}
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
              )}

              {activity.status === "abgelehnt" ? (
                <img src={declined} width={150} alt="abgelehnt" />
              ) : activity.status === "genehmigt" ? (
                <img src={approved} width={150} alt="genehmigt" />
              ) : (
                <img src={pending} width={150} alt="ausstehend" />
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <p className="w-full text-center lg:flex justify-center lg:w-7/12 mx-auto mt-2 text-base text-gray-600">
            {activity.registeredClassID?.description}
          </p>
        </div>
        {/* Mobile */}
        <div className="py-2 relative">
          <div className="grid grid-cols-3 grid-rows-1 text-center lg:hidden text-left justify-items-center">
            <div className="flex flex-col px-2 mr-2">
              <p className="mt-4 text-base text-gray-600 ">
                <span className="font-bold">Datum:</span> {displayFormattedDate}
              </p>
              <p className="mt-4 text-base text-gray-600 ">
                <span className="font-bold">Uhrzeit:</span>
                <br />
                {activity.registeredClassID?.time}
              </p>
            </div>
            <div className="flex flex-col mr-2">
              <p className="mt-4 text-base text-gray-600 lg:hidden">
                <span className="font-bold">Dauer:</span> <br />
                {activity.registeredClassID?.duration + " Min."}
              </p>
              <p className="hidden lg:inline mt-4 text-base text-gray-600">
                <span className="font-bold">Dauer:</span>
                <br />
                {activity.registeredClassID?.duration + " Min."}
              </p>

              <p className="mt-4 text-base text-gray-600 ">
                <span className="font-bold">Referent*in:</span>
                <br />
                {activity.registeredClassID?.teacher}
              </p>
            </div>
            <div className="flex flex-col">
              <p className="mt-4 text-base text-gray-600 ">
                <span className="font-bold">Location:</span>
                <br />
                {activity.registeredClassID?.location}
              </p>
              <p className="mt-4 text-base text-gray-600 lg:hidden">
                <span className="font-bold">Kapazität:</span>
                <br />
                {activity.registeredClassID?.capacity + " Teilneh."}
              </p>
              <p className="hidden lg:inline mt-4 text-base text-gray-600">
                <span className="font-bold">Kapazität:</span>
                <br />
                {activity.registeredClassID?.capacity + " Teilnehmer"}
              </p>
            </div>
          </div>
          {/* Desktop */}
          <div className="hidden lg:grid grid-cols-3 grid-rows-1 text-center lg:text-left justify-items-center">
            <div className="flex flex-col px-2 mr-2">
              <p className="mt-4 text-base text-gray-600 ">
                <span className="font-bold">Datum:</span> {displayFormattedDate}
              </p>
              <p className="mt-4 text-base text-gray-600 ">
                <span className="font-bold">Uhrzeit:</span>{" "}
                {activity.registeredClassID?.time}
              </p>
            </div>
            <div className="flex flex-col mr-2">
              <p className="mt-4 text-base text-gray-600 lg:hidden">
                <span className="font-bold">Dauer:</span> <br />
                {activity.registeredClassID?.duration + " Min."}
              </p>
              <p className="hidden lg:inline mt-4 text-base text-gray-600">
                <span className="font-bold">Dauer:</span>{" "}
                {activity.registeredClassID?.duration + " Min."}
              </p>

              <p className="mt-4 text-base text-gray-600 ">
                <span className="font-bold">Referent*in:</span>{" "}
                {activity.registeredClassID?.teacher}
              </p>
            </div>
            <div className="flex flex-col px-2 mr-2">
              <p className="mt-4 text-base text-gray-600 ">
                <span className="font-bold">Location:</span>{" "}
                {activity.registeredClassID?.location}
              </p>
              <p className="mt-4 px-2 text-base text-gray-600 lg:hidden">
                <span className="font-bold">Kapazität:</span>{" "}
                {activity.registeredClassID?.capacity + " Teilneh."}
              </p>
              <p className="hidden lg:inline mt-4 text-base text-gray-600">
                <span className="font-bold">Kapazität:</span>{" "}
                {activity.registeredClassID?.capacity + " Teilnehmer"}
              </p>
            </div>
          </div>

          {activity.status !== "abgelehnt" && canCancel && (
            <>
              <div className="flex justify-center my-1">
                <button
                  className="w-44 bg-gradient-to-b from-blue-500 to-blue-700 font-medium p-2 mt-2 mr-2.5 md:p-2 text-white uppercase rounded cursor-pointer hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
                  onClick={exportCalendar}
                >
                  Kalender Export
                </button>
                <button
                  className="w-44 bg-gradient-to-b from-yellow-500 to-yellow-700 font-medium p-2 mt-2 mr-2.5 md:p-2 text-white uppercase rounded cursor-pointer hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
                  onClick={() => modalRef.current.showModal()}
                >
                  <p>Stornieren</p>
                </button>

                <button
                  className={`w-44 ${
                    activity.reminded
                      ? "bg-gray-500 cursor-not-allowed"
                      : "bg-gradient-to-b from-lime-500 to-lime-700"
                  } 
              font-medium p-2 mt-2 mr-2.5 md:p-2 text-white uppercase rounded transition transform hover:-translate-y-0.5`}
                  onClick={sendReminder}
                  disabled={activity.reminded} // Disable the button if reminded is true
                >
                  <p>Nachfragen</p>
                </button>
              </div>

              <dialog ref={modalRef} id="my_modal_1" className="modal">
                <div className="modal-box max-w-xl">
                  <div
                    className="flex items-center p-3 mb-4 text-sm text-yellow-800 border border-yellow-300 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300 dark:border-yellow-800"
                    role="alert"
                  >
                    <svg
                      className="flex-shrink-0 inline w-4 h-4 me-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                    </svg>
                    <span className="sr-only">Info</span>
                    <div>
                      <span className="font-medium">Achtung!</span> Du möchtest
                      deine Anmeldung für den Kurs stornieren?
                    </div>
                  </div>
                  <div
                    className="flex p-3 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-blue-400"
                    role="alert"
                  >
                    <span className="sr-only">Info</span>
                    <div>
                      <span className="font-medium">
                        Bitte Folgendes beachten bei der Stornierung der
                        Schulung:
                      </span>
                      <ul className="mt-1.5 list-disc list-inside">
                        <li className="mb-1">
                          Du musst einen Grund für die Stornierung angeben
                        </li>
                        <li className="mb-1">
                          Bei abgelehntem Genehmigungsstatus,{" "}
                          <span className="font-medium">
                            keine Stornierung möglich
                          </span>
                        </li>
                        <li className="mb-1">
                          Bei Ablauf des Registrierungzeitraums,{" "}
                          <span className="font-medium">
                            keine Anmeldung mehr möglich
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="modal-action flex justify-center">
                    <form method="dialog" className="flex gap-2">
                      <div>
                        <div className="w-72 mr-0 lg:w-full lg:mr-12">
                          <label
                            htmlFor="reason"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Begründung:
                          </label>
                          <select
                            id="reason"
                            className="mb-4 mr-12 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value={selectedReason}
                            onChange={(e) => setSelectedReason(e.target.value)}
                          >
                            <option value="" disabled>
                              Wähle eine Begründung
                            </option>
                            {reasons.map((reason, index) => (
                              <option key={index} value={reason}>
                                {reason}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            className="btn w-fit bg-yellow-600 text-white hover:bg-yellow-700"
                            onClick={handleCancelation}
                          >
                            Stornieren
                          </button>
                          <button className="btn w-28" onClick={closeModal}>
                            Abbrechen
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </dialog>
            </>
          )}
        </div>
      </div>
    </>
  );
}
