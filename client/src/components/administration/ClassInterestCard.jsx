import { useContext, useRef } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { Bounce, toast } from "react-toastify";
import axiosClient from "../../utils/axiosClient";
import { NavLink } from "react-router-dom";

export default function ClassInterestCard({ id, interest }) {
  const { allInterest, setAllInterest } = useContext(AuthContext);
  const modalRef = useRef(null);
  const modalRef2 = useRef(null);

  const deleteInterest = () => {
    axiosClient
      .delete(`/activityInterest/deleteInterest/${id}`)
      .then((response) => {
        return axiosClient.get(`/activityInterest/getEveryInterest/`);
      })
      .then((response) => {
        setAllInterest(response.data);
        notifySuccess();
      })
      .catch((error) => {
      });
  };

  const markTookPlace = () => {
    axiosClient
      .put(`/activityInterest/markTookPlace/${id}`)
      .then((response) => {
        return axiosClient.get(`/activityInterest/getEveryInterest/`);
      })
      .then((response) => {
        setAllInterest(response.data);
        notifySuccessMarkTookPlace();
      })
      .catch((error) => {
      });
  };

  const allTargetGroups = {
    "https://res.cloudinary.com/dtrymbvrp/image/upload/v1738958806/alle_wyewox_c_pad_w_80_h_75_n0nktg.png":
      "Alle",
    "https://res.cloudinary.com/dtrymbvrp/image/upload/v1737040592/vertrieb_mhopgl.png":
      "Vertrieb",
    "https://res.cloudinary.com/dtrymbvrp/image/upload/v1737040592/logistik_blm8tf.png":
      "Logistik",
    "https://res.cloudinary.com/dtrymbvrp/image/upload/v1738958594/fuhrpark_bhkb9q_c_pad_w_80_h_74_unpasw.png":
      "Fuhrpark",
    "https://res.cloudinary.com/dtrymbvrp/image/upload/v1737040592/IT_cyoqz8.png":
      "IT & Services",
    "https://res.cloudinary.com/dtrymbvrp/image/upload/v1737040593/HR_bhni2i.png":
      "HR & Training",
    "https://res.cloudinary.com/dtrymbvrp/image/upload/v1737040593/buha_xuo2tb.png":
      "Buchhaltung",
    "https://res.cloudinary.com/dtrymbvrp/image/upload/v1737040594/showroom_nsrmiw.png":
      "Showroom",
    "https://res.cloudinary.com/dtrymbvrp/image/upload/v1737040596/design_x4hg1y.png":
      "Design & Marketing",
    "https://res.cloudinary.com/dtrymbvrp/image/upload/v1737040595/bestandsmanagement_dacigz.png":
      "Bestandsmanagement",
    "https://res.cloudinary.com/dtrymbvrp/image/upload/v1737040595/haustechnik_uj6pa6.png":
      "Haustechnik",
    "https://res.cloudinary.com/dtrymbvrp/image/upload/v1737040595/unternehmensentwicklung_qiggf8.png":
      "Unternehmensentwicklung",
  };

  const getTooltipText = (url) => {
    return allTargetGroups[url] || "Unknown Group"; // Default message if no match
  };

  const notifySuccess = () =>
    toast.success("Schulung gelöscht!", {
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

  const notifySuccessMarkTookPlace = () =>
    toast.success("Schulung als stattgefunden markiert!", {
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

  return (
    <div className="bg-gray-50/50 flex">
      <div className="flex justify-center">
        <div className="mx-auto ">
          <div className="relative flex flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg h-[800px]">
            <div className="relative mx-4 mt-4 overflow-hidden text-white shadow-lg rounded-xl bg-blue-gray-500 bg-clip-border shadow-blue-gray-500/40">
              <img src={interest.previewPicture} alt="ui/ux review check" className="w-full min-h-[350px] object-cover" />
              <div className="absolute inset-0 w-full h-full to-bg-black-10 bg-gradient-to-tr from-transparent via-transparent to-black/60"></div>
              <button
                className="!absolute top-4 right-4 h-8 max-h-[32px] w-8 max-w-[32px] bg-stone-200 select-none rounded-full text-center align-middle font-sans text-xs font-medium uppercase text-blue-500 transition-all active:bg-red-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none transition-transform duration-300 transform hover:scale-125"
                type="button"
              >
                <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                  <NavLink to={`/admin/classInterest/editClassInterest/${id}`}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        fillRule="evenodd"
                        d="M17.204 10.796L19 9c.545-.545.818-.818.964-1.112a2 2 0 0 0 0-1.776C19.818 5.818 19.545 5.545 19 5s-.818-.818-1.112-.964a2 2 0 0 0-1.776 0c-.294.146-.567.419-1.112.964l-1.819 1.819a10.9 10.9 0 0 0 4.023 3.977m-5.477-2.523l-6.87 6.87c-.426.426-.638.638-.778.9c-.14.26-.199.555-.316 1.145l-.616 3.077c-.066.332-.1.498-.005.593s.26.061.593-.005l3.077-.616c.59-.117.885-.176 1.146-.316s.473-.352.898-.777l6.89-6.89a12.9 12.9 0 0 1-4.02-3.98"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </NavLink>
                </span>
              </button>
              <button
                className="!absolute top-14 right-4 h-8 max-h-[32px] w-8 max-w-[32px] bg-stone-200 select-none rounded-full text-center align-middle font-sans text-xs font-medium uppercase text-red-600 transition-all active:bg-red-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none transition-transform duration-300 transform hover:scale-125"
                type="button"
              >
                <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    onClick={() => modalRef.current.showModal()}
                  >
                    <path
                      fill="currentColor"
                      fillRule="evenodd"
                      d="M9.774 5L3.758 3.94l.174-.986a.5.5 0 0 1 .58-.405L18.411 5h.088h-.087l1.855.327a.5.5 0 0 1 .406.58l-.174.984l-2.09-.368l-.8 13.594A2 2 0 0 1 15.615 22H8.386a2 2 0 0 1-1.997-1.883L5.59 6.5h12.69zH5.5zM9 9l.5 9H11l-.4-9zm4.5 0l-.5 9h1.5l.5-9zm-2.646-7.871l3.94.694a.5.5 0 0 1 .405.58l-.174.984l-4.924-.868l.174-.985a.5.5 0 0 1 .58-.405z"
                    ></path>
                  </svg>
                </span>
              </button>
            </div>
            <div className="p-6 flex-grow overflow-auto">
              <div className="flex items-center justify-center mb-3">
                <h5 className="block font-sans text-xl antialiased font-medium leading-snug tracking-normal text-blue-gray-900">
                  {interest.title}
                </h5>
              </div>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="flex items-center justify-end gap-0 font-sans text-base font-normal leading-relaxed text-blue-gray-900 antialiased">
                    Interesse:
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      className="text-red-500 ml-1"
                    >
                      <path
                        fill="currentColor"
                        fillOpacity={100}
                        d="M12 8c0 0 0 0 0.76 -1c0.88 -1.16 2.18 -2 3.74 -2c2.49 0 4.5 2.01 4.5 4.5c0 0.93 -0.28 1.79 -0.76 2.5c-0.81 1.21 -8.24 9 -8.24 9c0 0 -7.43 -7.79 -8.24 -9c-0.48 -0.71 -0.76 -1.57 -0.76 -2.5c0 -2.49 2.01 -4.5 4.5 -4.5c1.56 0 2.87 0.84 3.74 2c0.76 1 0.76 1 0.76 1Z"
                      ></path>
                      <path
                        fill="none"
                        stroke="currentColor"
                        strokeDasharray={32}
                        strokeDashoffset={32}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8c0 0 0 0 -0.76 -1c-0.88 -1.16 -2.18 -2 -3.74 -2c-2.49 0 -4.5 2.01 -4.5 4.5c0 0.93 0.28 1.79 0.76 2.5c0.81 1.21 8.24 9 8.24 9M12 8c0 0 0 0 0.76 -1c0.88 -1.16 2.18 -2 3.74 -2c2.49 0 4.5 2.01 4.5 4.5c0 0.93 -0.28 1.79 -0.76 2.5c-0.81 1.21 -8.24 9 -8.24 9"
                      ></path>
                    </svg>
                    <NavLink
                      className="text-blue-500 font-semibold text-lg hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 rounded-md transition-all duration-300 ease-in-out"
                      to={`/admin/classInterest/userOverview/${interest._id}`}
                    >
                      ( {interest.interestedUsers.length} )
                    </NavLink>
                  </p>

                </div>
                <div>
                <p className="flex items-center justify-end gap-0 font-sans text-base font-normal leading-relaxed text-blue-gray-900 antialiased">
                  Historie:


                    <NavLink
                      className="ml-2 text-blue-500 font-semibold text-lg hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 rounded-md transition-all duration-300 ease-in-out"
                      to={`/admin/classInterest/history/${interest._id}`}
                    >
                                          <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={32}
                      height={32}
                      viewBox="0 0 24 24"
                      className="transition-transform duration-300 transform hover:scale-125"
                    >
                      <path
                        fill="currentColor"
                        d="M8.23 18.77q-.412 0-.705-.295t-.294-.706v-1.192q0-.343.232-.576t.576-.232H10v-3.25q-.827.162-1.737-.005q-.911-.166-1.577-.73q-.132-.122-.209-.275t-.077-.334v-1.04H5.31q-.153 0-.297-.056t-.273-.184l-1.929-1.93q-.257-.257-.228-.6t.31-.565q.724-.513 1.66-.764q.938-.251 1.847-.251q.961 0 1.869.273T10 6.914v-.366q0-.615.428-1.043t1.043-.428h6.923q.662 0 1.134.475q.472.474.472 1.14V16.77q0 .847-.577 1.423T18 18.77zm2.77-3h5.23q.31 0 .54.229t.23.54v.23q0 .425.288.713t.712.287t.713-.287t.287-.713V6.692q0-.269-.173-.442t-.442-.173h-6.77q-.269 0-.442.173T11 6.692v.985l5.36 5.36q.118.111.145.253t-.038.285t-.177.226t-.292.084q-.102 0-.195-.043t-.157-.103l-2.896-2.897l-.565.566q-.293.292-.575.49t-.61.348zM5.408 9.134h1.184q.344 0 .576.232t.232.575v1.15q.511.316.952.43t.856.113q.683 0 1.241-.233q.559-.233 1.047-.721l.546-.546l-1.746-1.746q-.802-.802-1.798-1.203t-2.098-.4q-.73 0-1.421.19q-.69.19-1.237.494zM16 16.769H8.23v1h8.074q-.171-.205-.238-.462Q16 17.051 16 16.77m-7.77 1v-1z"
                      ></path>
                    </svg>
                    </NavLink>
                  </p>
                </div>
              </div>
              <p className="block font-sans text-base antialiased font-light leading-relaxed text-gray-700">
                {interest.description}
              </p>
              <label className="block my-3 text-sm font-medium text-gray-900 dark:text-white">
                Lernziele:
              </label>
              <div className="flex flex-wrap gap-1">
                {interest.tag.map((singleTag) => {
                  return (
                    <span className="w-fit bg-gray-200 text-gray-800 px-2 py-1 rounded-md flex items-center border border-gray-400">
                      {singleTag}
                    </span>
                  );
                })}
              </div>
              <label className="text-center block my-4 text-sm font-medium text-gray-900 dark:text-white">
                Zielgruppe:
              </label>

              <div className="flex justify-center mx-auto items-center gap-3 group">
                {interest.targetGroup.map((group) => {
                  return (
                    <span
                      className="tooltip cursor-pointer rounded-full border border-gray-900/5 bg-gray-900/5 p-1.5 text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-gray-900/10 hover:!opacity-100 group-hover:opacity-70"
                      data-tip={getTooltipText(group)} // Use 'group' here^^
                    >
                      <img src={group} width={35} height={35} alt={group} />
                    </span>
                  );
                })}
              </div>
            </div>
            <div className="p-6 pt-3">
              <button
                className="block w-full select-none rounded-lg bg-gray-900 py-3.5 px-7 text-center align-middle font-sans text-sm font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                onClick={() => modalRef2.current.showModal()}

                type="button"
              >
                Als stattgefunden markieren
              </button>
            </div>
            <dialog
              ref={modalRef}
              id="my_modal_1"
              className="modal text-center"
            >
              <div className="modal-box ">
                <div
                  className="flex justify-center items-center p-3 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-300 dark:border-red-800"
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
                    <span className="font-medium">Achtung!</span> Du bist dabei,
                    die Schulung zu löschen!
                  </div>
                </div>
                <div
                  className="flex p-3 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-blue-400"
                  role="alert"
                >
                  <span className="sr-only">Info</span>
                  <div>
                    <span className="font-medium">
                      Nach dem Löschen kann diese Schulung nicht mehr
                      wiederhergestellt werden!
                    </span>
                  </div>
                </div>
                <div className="modal-action flex justify-center">
                  <form method="dialog" className="flex gap-2">
                    <button
                      onClick={deleteInterest}
                      className="btn w-28 bg-red-500 text-white hover:bg-red-700"
                    >
                      Löschen
                    </button>
                    <button className="btn w-28">Schließen</button>
                  </form>
                </div>
              </div>
            </dialog>

            <dialog id="tookPlace" className="modal" ref={modalRef2}>
              <div className="modal-box max-w-3xl">
                <div
                  className="flex items-center p-3 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-300 dark:border-red-800"
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
                    <span className="font-medium">Warnung!</span> Du bist dabei,
                    diese Schulung als stattgefunden zu markieren!
                  </div>
                </div>
                <div
                  className="flex p-3 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-blue-400"
                  role="alert"
                >
                  <span className="sr-only">Info</span>
                  <div>
                    <span className="font-medium">
                      Bitte Folgendes beachten:
                    </span>
                    <ul className="mt-1.5 list-disc list-inside">
                    <li>
                        Die Liste der Interessenten wird zurückgesetzt
                      </li>
                      <li>
                        Alle Interessenten, die sich für diese Schulung eingetragen haben, werden in Historie verschoben
                      </li>

                    </ul>
                  </div>
                </div>
                <div className="modal-action flex justify-center">
                  <form method="dialog" className="flex gap-2">
                    <button
                      onClick={markTookPlace}
                      className="btn w-28 bg-red-500 text-white hover:bg-red-700"
                    >
                      Bestätigen
                    </button>
                    <button className="btn w-28">Abbrechen</button>
                  </form>
                </div>
              </div>
            </dialog>
          </div>
        </div>
      </div>
    </div>
  );
}
