import { useContext, useEffect, useRef, useState } from "react";
import axiosClient from "../../utils/axiosClient";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import RegisteredUserCardAdmin from "./RegisteredUserCardAdmin";
import "react-toastify/dist/ReactToastify.css";
import { Bounce, toast } from "react-toastify";

export default function SingleClassDetailsAdmin() {
  const {
    user,
    allUsers,
    setAllUsers,
    allActivities,
    setAllActivities,
    currentMonth,
    currentYear,
  } = useContext(AuthContext);

  const { id } = useParams();
  const navigate = useNavigate();

  const modalRef = useRef(null);

  const [activity, setActivity] = useState(null);

  useEffect(() => {
    axiosClient
      .get(`/classActivity/${id}`)
      .then((response) => {
        setActivity(response.data);
      })
      .catch((error) => {});
  }, []);

  const showLegend = () => {
    document.getElementById("legend").showModal();
  };

  const adjustDate = (date, days) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days);
    return newDate;
  };

  const formatDateString = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const dateString = activity?.date;
  const timeString = activity?.time;

  const date = new Date(dateString);

  if (timeString) {
    const [hours, minutes] = timeString.split(":").map(Number);
    date.setHours(hours, minutes, 0, 0);
  }

  const datePrior = adjustDate(date, -2);
  const datePriorGenehmigung = adjustDate(date, -1);

  const formattedDate = formatDateString(date);
  const formatedDatePrior = formatDateString(datePrior);
  const formatedDatePriorGenehmigung = formatDateString(datePriorGenehmigung);

  const now = new Date();
  const hoursDifference = (date - now) / 3600000;

  const enlist = () => {
    const selectedUserId = document.querySelector("select").value;

    axiosClient
      .put(`/classActivity/enlist/${id}`, { userId: selectedUserId })
      .then((response) => {
        return axiosClient.get("/user/getAllUsers");
      })
      .then((response) => {
        setAllUsers(response.data);
        return axiosClient.get(`/classActivity/${id}`);
      })
      .then((response) => {
        setActivity(response.data);
        return axiosClient
          .get(
            `/classActivity/allActivities?month=${currentMonth}&year=${currentYear}`
          )
          .then((response) => {
            setAllActivities(response.data);
            notifySuccess();
          });
      })
      .catch((error) => {
        notifyError();
      });
  };

  const notifySuccess = () =>
    toast.success(`Mitarbeiter hinzugefügt!`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      className: "mr-0 mt-0 lg:mt-14 lg:mr-6",
    });

  const notifyError = () =>
    toast.error(`Der Mitarbeiter wurde schon registriert!`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      className: "mr-0 mt-0 lg:mt-14 lg:mr-6",
    });

  return (
    <>
      {!activity ? (
        <div className="flex mt-8 justify-center">
          <div className="relative">
            <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-200"></div>
            <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-blue-500 animate-spin"></div>
          </div>
        </div>
      ) : (
        <>
          {!activity ? (
            <div className="flex mt-8 justify-center">
              <div className="relative">
                <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-200"></div>
                <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-blue-500 animate-spin"></div>
              </div>
            </div>
          ) : (
            <>
              <div className="flex justify-center">
                <img
                  src="https://d2nk66epwbpimf.cloudfront.net/images/345249fd-0959-4762-bfbc-80ca4247abbb/54ad38e7-f4b4-4dc6-9e80-21e06958a192.png"
                  className="h-32"
                  alt="logo"
                />
              </div>
              <div className="mx-auto mt-6 w-11/12 m-2 bg-white border p-4 relative group shadow-lg lg:w-7/12">
                <div className=" absolute bg-blue-500/50 top-0 left-0 w-24 h-1 transition-all duration-200 group-hover:bg-orange-300 group-hover:w-1/2  "></div>
                <div className="py-2 relative  ">
                  <div className="hidden lg:flex justify-between">
                    {user.role === "admin" && hoursDifference > 48 ? (
                      <div className="flex gap-2 text-right mt-1">
                        <button
                          onClick={() => navigate("/classes")}
                          className="ml-2 flex items-center text-white  h-[40px] px-4 uppercase rounded bg-blue-400 hover:bg-blue-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
                        >
                          Übersicht
                        </button>
                        <NavLink
                          to={`/admin/editClass/${activity._id}`}
                          className="flex items-center text-white h-[40px] px-4 uppercase rounded bg-green-500 hover:bg-green-700 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
                        >
                          Bearbeiten
                        </NavLink>
                      </div>
                    ) : (
                      <div className="flex gap-1 text-right mt-1">
                        <button
                          onClick={() => navigate("/classes")}
                          className="ml-2 flex items-center text-white h-[40px]  px-4 uppercase rounded bg-blue-400 hover:bg-blue-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
                        >
                          Übersicht
                        </button>
                        <button
                          onClick={() => modalRef.current.showModal()}
                          className={
                            hoursDifference < 0 && hoursDifference > -24
                              ? "flex items-center text-white h-[40px] px-4 uppercase rounded bg-violet-400 hover:bg-violet-400 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
                              : "hidden"
                          }
                        >
                          Nachtragen
                        </button>
                        <NavLink
                          to={`/admin/editClass/${activity._id}`}
                          className="invisible flex items-center text-white h-[40px] px-4 uppercase rounded bg-green-500 hover:bg-green-700 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
                        >
                          Bearbeiten
                        </NavLink>

                        <dialog
                          ref={modalRef}
                          id="my_modal_1"
                          className="modal"
                        >
                          <div className="modal-box">
                            <div className="modal-action">
                              <form method="dialog" className="w-full">
                                <div className="flex flex-col gap-2">
                                  <select className="select select-bordered w-full">
                                    <option disabled selected>
                                      Wähle den Namen aus:
                                    </option>
                                    {allUsers
                                      ?.filter(
                                        (user) =>
                                          user.role !== "teacher" &&
                                          user.status !== "inaktiv"
                                      )
                                      .map((user) => (
                                        <option key={user._id} value={user._id}>
                                          {user.firstName} {user.lastName}
                                        </option>
                                      ))}
                                  </select>
                                  <div className="flex gap-2 mt-2 justify-end">
                                    <button
                                      className="btn w-fit bg-green-600 text-white hover:bg-green-700"
                                      onClick={enlist}
                                    >
                                      Bestätigen
                                    </button>

                                    <button className="btn w-fit bg-red-500 text-white hover:bg-red-600">
                                      Abbrechen
                                    </button>
                                  </div>
                                </div>
                              </form>
                            </div>
                          </div>
                        </dialog>
                      </div>
                    )}

                    <div className="flex flex-col">
                      <div>
                        <p className="font-semibold">
                          Registrierungsende:{" "}
                          <span className="font-normal">
                            {formatedDatePrior} um {activity.time}
                          </span>
                        </p>
                      </div>
                      <div className="flex flex-col">
                        <p className="font-semibold mt-1">
                          Genehmigungsende:{" "}
                          <span className="font-normal">
                            {formatedDatePriorGenehmigung} um {activity.time}
                          </span>
                        </p>
                      </div>
                      <div>
                        <p className="font-semibold flex items-center ml-[61px] mt-2">
                          {activity.capacity - activity.usedCapacity === 0 ? (
                            <span className="shrink-0 rounded-full bg-red-500 px-3 font-mono text-md font-medium tracking-tight text-white">
                              Ausgebucht
                            </span>
                          ) : (
                            <>
                              <span className="mr-2">Freie Plätze:</span>
                              <span className="shrink-0 rounded-full bg-green-500 px-3 font-mono text-md font-medium tracking-tight text-white">
                                {activity.capacity - activity.usedCapacity}
                              </span>
                            </>
                          )}
                          <button
                            className="ml-3 transition-transform duration-300 transform hover:scale-150"
                            onClick={() => window.location.reload()}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="w-6 h-6"
                            >
                              <path
                                fill="#3d94ff"
                                fillRule="evenodd"
                                d="M4.755 10.059a7.5 7.5 0 0 1 12.548-3.364l1.903 1.903h-3.183a.75.75 0 1 0 0 1.5h4.992a.75.75 0 0 0 .75-.75V4.356a.75.75 0 0 0-1.5 0v3.18l-1.9-1.9A9 9 0 0 0 3.306 9.67a.75.75 0 1 0 1.45.388Zm15.408 3.352a.75.75 0 0 0-.919.53 7.5 7.5 0 0 1-12.548 3.364l-1.902-1.903h3.183a.75.75 0 0 0 0-1.5H2.984a.75.75 0 0 0-.75.75v4.992a.75.75 0 0 0 1.5 0v-3.18l1.9 1.9a9 9 0 0 0 15.059-4.035.75.75 0 0 0-.53-.918Z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between lg:hidden">
                    <div className="flex">
                      <button
                        onClick={() => modalRef.current.showModal()}
                        className={
                          hoursDifference < 0 && hoursDifference > -24
                            ? "flex"
                            : "hidden"
                        }
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.8}
                          stroke="#15803d"
                          className="w-7 h-7"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
                          />
                        </svg>
                      </button>
                      <button
                        className="ml-3 transition-transform duration-300 transform hover:scale-150"
                        onClick={() => window.location.reload()}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-7 h-7"
                        >
                          <path
                            fill="#3d94ff"
                            fillRule="evenodd"
                            d="M4.755 10.059a7.5 7.5 0 0 1 12.548-3.364l1.903 1.903h-3.183a.75.75 0 1 0 0 1.5h4.992a.75.75 0 0 0 .75-.75V4.356a.75.75 0 0 0-1.5 0v3.18l-1.9-1.9A9 9 0 0 0 3.306 9.67a.75.75 0 1 0 1.45.388Zm15.408 3.352a.75.75 0 0 0-.919.53 7.5 7.5 0 0 1-12.548 3.364l-1.902-1.903h3.183a.75.75 0 0 0 0-1.5H2.984a.75.75 0 0 0-.75.75v4.992a.75.75 0 0 0 1.5 0v-3.18l1.9 1.9a9 9 0 0 0 15.059-4.035.75.75 0 0 0-.53-.918Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>

                    <p className="font-semibold flex items-center">
                      {activity.capacity - activity.usedCapacity === 0 ? (
                        <span className="shrink-0 rounded-full bg-red-500 px-3 font-mono text-md font-medium tracking-tight text-white">
                          Ausgebucht
                        </span>
                      ) : (
                        <>
                          <span className="mr-2">Freie Plätze:</span>
                          <span className="shrink-0 rounded-full bg-green-500 px-3 font-mono text-md font-medium tracking-tight text-white">
                            {activity.capacity - activity.usedCapacity}
                          </span>
                        </>
                      )}
                    </p>
                  </div>
                  <h3 className="hidden lg:flex mt-6 mb-4 justify-center text-lg font-semibold text-black">
                    {activity.title}
                  </h3>
                  <h3 className="flex justify-center mt-3 text-lg font-semibold text-black lg:hidden">
                    {activity.title}
                  </h3>
                  <div className="flex justify-center mt-2 mb-1">
                    <p>Zielgruppe</p>
                  </div>
                  <div className="flex justify-center gap-2">
                    {activity.department.map((image, index) => {
                      return (
                        <img
                          key={index}
                          src={image}
                          alt="logo"
                          className="w-12 h-12"
                        />
                      );
                    })}
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
                  <p className="flex justify-center text-center mt-2 text-base text-gray-600">
                    {activity.description}
                  </p>
                  {/* Desktop */}
                  <div className="hidden lg:grid grid-cols-3 grid-rows-1 lg:gap-0 text-left justify-items-center">
                    <div className="flex flex-col">
                      <p className="mt-4 text-base text-gray-600">
                        <span className="font-bold mr-1">Datum:</span>
                        {formattedDate}
                      </p>
                      <p className="mt-4 text-base text-gray-600 ">
                        <span className="font-bold mr-1">Uhrzeit:</span>
                        {activity.time}
                      </p>
                    </div>
                    <div className="flex flex-col">
                      <p className="mt-4 text-base text-gray-600 lg:hidden">
                        <span className="font-bold mr-1">Dauer:</span>
                        {activity.duration + " Min."}
                      </p>
                      <p className="hidden lg:inline mt-4 text-base text-gray-600">
                        <span className="font-bold mr-1">Dauer:</span>
                        {activity.duration + " Min."}
                      </p>
                      <p className="mt-4 text-base text-gray-600 ">
                        <span className="font-bold mr-1">Referent*in:</span>
                        {activity.teacher}
                      </p>
                    </div>
                    <div className="flex flex-col">
                      <p className="mt-4 text-base text-gray-600 ">
                        <span className="font-bold mr-1">Location:</span>
                        {activity.location}
                      </p>
                      <p className="mt-4 text-base text-gray-600 lg:hidden">
                        <span className="font-bold mr-1">Kapazität:</span>
                        {activity.capacity + " Teilneh."}
                      </p>
                      <p className="hidden lg:inline mt-4 text-base text-gray-600">
                        <span className="font-bold mr-1">Kapazität:</span>
                        {activity.capacity + " Teilnehmer"}
                      </p>
                    </div>
                  </div>
                  {/* Mobile */}
                  <div className="grid grid-cols-3 grid-rows-1 text-center lg:gap-0 lg:hidden text-left justify-items-center">
                    <div className="flex flex-col">
                      <p className="mt-4 text-base text-gray-600">
                        <span className="font-bold">Datum:</span>
                        <br />
                        {formattedDate}
                      </p>
                      <p className="mt-4 text-base text-gray-600 ">
                        <span className="font-bold">Uhrzeit:</span>
                        <br />
                        {activity.time}
                      </p>
                    </div>
                    <div className="flex flex-col">
                      <p className="mt-4 text-base text-gray-600 lg:hidden">
                        <span className="font-bold">Dauer:</span> <br />
                        {activity.duration + " Min."}
                      </p>
                      <p className="hidden lg:inline mt-4 text-base text-gray-600">
                        <span className="font-bold">Dauer:</span>
                        <br />
                        {activity.duration + " Min."}
                      </p>
                      <p className="mt-4 text-base text-gray-600 ">
                        <span className="font-bold">Referent*in:</span>
                        <br />
                        {activity.teacher}
                      </p>
                    </div>
                    <div className="flex flex-col">
                      <p className="mt-4 text-base text-gray-600 ">
                        <span className="font-bold">Location:</span>
                        <br />
                        {activity.location}
                      </p>
                      <p className="mt-4 text-base text-gray-600 lg:hidden">
                        <span className="font-bold">Kapazität:</span>
                        <br />
                        {activity.capacity + " Teilneh."}
                      </p>
                      <p className="hidden lg:inline mt-4 text-base text-gray-600">
                        <span className="font-bold">Kapazität:</span>
                        <br />
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
          {activity.registeredUsers.map((registeredUser) => {
            return (
              <ul
                key={registeredUser._id}
                className="w-11/12 bg-white shadow overflow-hidden sm:rounded-md mx-auto mt-4 mb-6 lg:w-4/12"
              >
                <li>
                  <RegisteredUserCardAdmin
                    registeredUser={registeredUser}
                    activityId={id}
                    setActivity={setActivity}
                  />
                </li>
              </ul>
            );
          })}
        </>
      )}
    </>
  );
}
