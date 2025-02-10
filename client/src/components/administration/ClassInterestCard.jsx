import { useContext, useRef } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { Bounce, toast } from "react-toastify";
import axiosClient from "../../utils/axiosClient";
import { NavLink } from "react-router-dom";

export default function ClassInterestCard({ id, interest }) {
  const { allInterest, setAllInterest } = useContext(AuthContext);
  const modalRef = useRef(null);

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
        console.log(error);
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

  return (
    <div className="bg-gray-50/50 flex">
      <div className="flex justify-center items-center">
        <div className="mx-auto">
          <div className="relative flex flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg">
            <div className="relative mx-4 mt-4 overflow-hidden text-white shadow-lg rounded-xl bg-blue-gray-500 bg-clip-border shadow-blue-gray-500/40">
              <img src={interest.previewPicture} alt="ui/ux review check" />
              <div className="absolute inset-0 w-full h-full to-bg-black-10 bg-gradient-to-tr from-transparent via-transparent to-black/60"></div>
              {!interest.tookPlace ? 
                            <button
                            className="!absolute top-4 left-4 h-8 max-h-[32px] w-8 max-w-[32px] select-none rounded-full text-center align-middle font-sans text-xs font-medium uppercase text-blue-500 transition-all active:bg-red-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none transition-transform duration-300"
                          >
                          <svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} viewBox="0 0 32 32"><g fill="none"><path fill="url(#f624id0)" d="M29.757 15.75c0 7.732-6.268 14-14 14s-14-6.268-14-14s6.268-14 14-14s14 6.268 14 14"></path><path fill="url(#f624id4)" d="M29.757 15.75c0 7.732-6.268 14-14 14s-14-6.268-14-14s6.268-14 14-14s14 6.268 14 14"></path><path fill="url(#f624id1)" d="M29.757 15.75c0 7.732-6.268 14-14 14s-14-6.268-14-14s6.268-14 14-14s14 6.268 14 14"></path><path fill="url(#f624id2)" d="M29.757 15.75c0 7.732-6.268 14-14 14s-14-6.268-14-14s6.268-14 14-14s14 6.268 14 14"></path><path fill="url(#f624id3)" d="M29.757 15.75c0 7.732-6.268 14-14 14s-14-6.268-14-14s6.268-14 14-14s14 6.268 14 14"></path><defs><radialGradient id="f624id0" cx={0} cy={0} r={1} gradientTransform="rotate(130.168 9.994 9.81)scale(27.8086)" gradientUnits="userSpaceOnUse"><stop offset={0.19} stopColor="#5ae68d"></stop><stop offset={0.835} stopColor="#43a684"></stop></radialGradient><radialGradient id="f624id1" cx={0} cy={0} r={1} gradientTransform="rotate(136.38 10.117 10.14)scale(14.6767 15.816)" gradientUnits="userSpaceOnUse"><stop offset={0.179} stopColor="#36b366"></stop><stop offset={1} stopColor="#256847" stopOpacity={0}></stop></radialGradient><radialGradient id="f624id2" cx={0} cy={0} r={1} gradientTransform="matrix(-19.25 0 0 -20 20.249 15.75)" gradientUnits="userSpaceOnUse"><stop offset={0.62} stopColor="#10dd51" stopOpacity={0}></stop><stop offset={0.951} stopColor="#a4e4b7"></stop></radialGradient><radialGradient id="f624id3" cx={0} cy={0} r={1} gradientTransform="matrix(0 22.1875 -22.9876 0 15.757 8.75)" gradientUnits="userSpaceOnUse"><stop offset={0.732} stopColor="#4a9795" stopOpacity={0}></stop><stop offset={1} stopColor="#718cad"></stop></radialGradient><linearGradient id="f624id4" x1={15.757} x2={15.757} y1={1.75} y2={8.25} gradientUnits="userSpaceOnUse"><stop stopColor="#278646"></stop><stop offset={1} stopColor="#278646" stopOpacity={0}></stop></linearGradient></defs></g></svg>
                          </button>

                          :
                          <button
                          className="!absolute top-4 left-4 h-8 max-h-[32px] w-8 max-w-[32px] select-none rounded-full text-center align-middle font-sans text-xs font-medium uppercase text-blue-500 transition-all active:bg-red-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none transition-transform duration-300"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} viewBox="0 0 32 32"><g fill="none"><path fill="url(#f2179id0)" d="M29.757 16c0 7.732-6.268 14-14 14s-14-6.268-14-14s6.268-14 14-14s14 6.268 14 14"></path><path fill="url(#f2179id4)" d="M29.757 16c0 7.732-6.268 14-14 14s-14-6.268-14-14s6.268-14 14-14s14 6.268 14 14"></path><path fill="url(#f2179id1)" d="M29.757 16c0 7.732-6.268 14-14 14s-14-6.268-14-14s6.268-14 14-14s14 6.268 14 14"></path><path fill="url(#f2179id2)" d="M29.757 16c0 7.732-6.268 14-14 14s-14-6.268-14-14s6.268-14 14-14s14 6.268 14 14"></path><path fill="url(#f2179id3)" d="M29.757 16c0 7.732-6.268 14-14 14s-14-6.268-14-14s6.268-14 14-14s14 6.268 14 14"></path><defs><radialGradient id="f2179id0" cx={0} cy={0} r={1} gradientTransform="rotate(130.168 9.936 9.935)scale(27.8086)" gradientUnits="userSpaceOnUse"><stop offset={0.232} stopColor="#f24756"></stop><stop offset={1} stopColor="#b22945"></stop></radialGradient><radialGradient id="f2179id1" cx={0} cy={0} r={1} gradientTransform="rotate(136.38 10.067 10.264)scale(14.6767 15.816)" gradientUnits="userSpaceOnUse"><stop offset={0.179} stopColor="#ff6180"></stop><stop offset={1} stopColor="#e5364a" stopOpacity={0}></stop></radialGradient><radialGradient id="f2179id2" cx={0} cy={0} r={1} gradientTransform="matrix(-19.25 0 0 -20 20.249 16)" gradientUnits="userSpaceOnUse"><stop offset={0.62} stopColor="#b73e4b" stopOpacity={0}></stop><stop offset={0.951} stopColor="#d48387"></stop></radialGradient><radialGradient id="f2179id3" cx={0} cy={0} r={1} gradientTransform="matrix(0 21 -23.3208 0 15.757 9)" gradientUnits="userSpaceOnUse"><stop offset={0.863} stopColor="#b83c5a" stopOpacity={0}></stop><stop offset={1} stopColor="#b83c5a"></stop><stop offset={1} stopColor="#ac4064"></stop></radialGradient><linearGradient id="f2179id4" x1={15.757} x2={15.757} y1={2} y2={8.5} gradientUnits="userSpaceOnUse"><stop stopColor="#dd4577"></stop><stop offset={1} stopColor="#ef4b5e" stopOpacity={0}></stop></linearGradient></defs></g></svg>
                        </button>

            }

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
            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <h5 className="block font-sans text-xl antialiased font-medium leading-snug tracking-normal text-blue-gray-900">
                  {interest.title}
                </h5>
                <p className="flex items-center gap-0 font-sans text-base font-normal leading-relaxed text-blue-gray-900 antialiased">
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
                    to="/admin/classInterest/userOverview"
                  >
                    ( {interest.interestedUsers.length} )
                  </NavLink>
                </p>
              </div>
              <p className="block font-sans text-base antialiased font-light leading-relaxed text-gray-700">
                {interest.description}
              </p>
              <label className="block my-3 text-sm font-medium text-gray-900 dark:text-white">
                Lernziele:
              </label>
              <div className="flex gap-1">
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
            {/* <div className="p-6 pt-3">
                <button
                    className="block w-full select-none rounded-lg bg-gray-900 py-3.5 px-7 text-center align-middle font-sans text-sm font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    type="button">
                    Reserve
                </button>
            </div> */}
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
          </div>
        </div>
      </div>
    </div>
  );
}
