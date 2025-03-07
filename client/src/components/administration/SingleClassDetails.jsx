import { useContext, useEffect, useRef, useState } from "react";
import axiosClient from "../../utils/axiosClient";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import RegisterdUserCard from "./RegisteredUserCard";
import { AuthContext } from "../../context/AuthProvider";
import { motion, AnimatePresence } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";
import { Bounce, toast } from "react-toastify";
import UserInfo from "./UserInfo";

export default function SingleClassDetails() {
  const {
    user,
    allUsers,
    setAllUsers,
    setAllActivities,
    currentYear,
    currentMonth,
  } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const modalRef = useRef(null);

  const [activity, setActivity] = useState(null);
  const [isWithin48Hours, setIsWithin48Hours] = useState(false);
  const [formattedDate, setFormattedDate] = useState("");
  const [formattedDatePrior, setFormattedDatePrior] = useState("");
  const [formattedDatePriorGenehmigung, setFormattedDatePriorGenehmigung] =
    useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    axiosClient
      .get(`/classActivity/${id}`)
      .then((response) => {
        setActivity(response.data);
      })
      .catch((error) => {});
  }, [id]);

  useEffect(() => {
    if (activity?.date && activity?.time) {
      const datePart = activity.date.split("T")[0];
      const [hours, minutes] = activity.time.split(":").map(Number);

      const [year, month, day] = datePart.split("-").map(Number);
      const date = new Date(year, month - 1, day, hours, minutes);

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

      const datePrior = adjustDate(date, -2);
      const datePriorGenehmigung = adjustDate(date, -1);

      setFormattedDate(formatDateString(date));
      setFormattedDatePrior(formatDateString(datePrior));
      setFormattedDatePriorGenehmigung(formatDateString(datePriorGenehmigung));

      const now = new Date();
      const hoursDifference = (date.getTime() - now.getTime()) / 3600000;
      setIsWithin48Hours(hoursDifference <= 48);
    }
  }, [activity]);

  const showLegend = () => {
    document.getElementById("legend").showModal();
  };

  const filteredRegisteredUsers =
    user.role === "admin" || user.role === "teacher"
      ? activity?.registeredUsers
      : activity?.registeredUsers?.filter((registeredUser) =>
          user.additionalDepartments.includes(registeredUser.department)
        );

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

  const enlistMobile = () => {
    const selectedUserId = document.getElementById("mobileEnlist").value;

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

  let formattedDateEnroll = null;

  const timeFromJson = activity?.time;
  const dateString = activity?.date;

  if (timeFromJson && dateString) {
    const [hoursStr, minutesStr] = timeFromJson.split(":");
    const hoursToAdd = parseInt(hoursStr, 10);
    const minutesToAdd = parseInt(minutesStr, 10);

    const dateFromJson = new Date(dateString);
    dateFromJson.setHours(dateFromJson.getHours() + hoursToAdd);
    dateFromJson.setMinutes(dateFromJson.getMinutes() + minutesToAdd);

    formattedDateEnroll = dateFromJson.toISOString();
  }

  const date1 = new Date(isoDateString);
  const date2 = new Date(formattedDateEnroll);

  const differenceMs = date1.getTime() - date2.getTime();

  const differenceHours = differenceMs / (1000 * 60 * 60 + 2);

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
                  className="h-48"
                  alt="logo"
                />
              </div>
              <div className="mx-auto mt-6 w-11/12 m-2 bg-white border p-2 relative group shadow-lg lg:w-7/12 lg:p-4">
                <div className=" absolute bg-blue-500/50 top-0 left-0 w-24 h-1 transition-all duration-200 group-hover:bg-orange-300 group-hover:w-1/2  "></div>
                <div className="py-2 relative  ">
                  <div className="hidden lg:flex justify-between">
                    {user.role === "admin" ? (
                      <div className="flex gap-2 text-right mt-1">
                        <button
                          onClick={() => navigate("/classes")}
                          className="ml-2 flex items-center text-white  h-[40px] px-4 uppercase rounded bg-blue-400 hover:bg-blue-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
                        >
                          Übersicht
                        </button>
                        <NavLink
                          to={`/admin/editClass/${activity._id}`}
                          className={`${
                            isWithin48Hours ? "invisible" : "visible"
                          } flex items-center text-white h-[40px] px-4 uppercase rounded bg-green-500 hover:bg-green-700 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5`}
                        >
                          Bearbeiten
                        </NavLink>
                      </div>
                    ) : (
                      <div className="flex gap-2 text-right mt-1">
                        <button
                          onClick={() => navigate("/classes")}
                          className="ml-2 flex items-center text-white h-[40px] px-4 uppercase rounded bg-blue-400 hover:bg-blue-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
                        >
                          Übersicht
                        </button>
                        {user.role === "teacher" && (
                          <>
                            <button
                              onClick={() => modalRef.current.showModal()}
                              className={
                                differenceHours < 23 && differenceHours > -1
                                  ? "flex items-center text-white h-[40px] px-4 uppercase rounded bg-violet-400 hover:bg-violet-400 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
                                  : "invisible"
                              }
                            >
                              Nachtragen
                            </button>

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
                                            <option
                                              key={user._id}
                                              value={user._id}
                                            >
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
                          </>
                        )}
                      </div>
                    )}

                    <div className="flex flex-col">
                      <div>
                        <p className="font-semibold">
                          Registrierungsende:{" "}
                          <span className="font-normal">
                            {formattedDatePrior} um {activity.time}
                          </span>
                        </p>
                      </div>
                      <div className="flex flex-col">
                        <p className="font-semibold mt-1">
                          Genehmigungsende:{" "}
                          <span className="font-normal">
                            {formattedDatePriorGenehmigung} um {activity.time}
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
                              <span
                                className={`shrink-0 rounded-full ${
                                  activity.capacity - activity.usedCapacity > 5
                                    ? "bg-green-500"
                                    : "bg-red-500"
                                } px-3 font-mono text-md font-medium tracking-tight text-white`}
                              >
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
                  <h3 className="flex justify-center mt-3 text-lg font-semibold text-black lg:hidden">
                    {activity.title}
                  </h3>
                  <h3 className="hidden lg:flex mt-6 mb-4 justify-center text-lg font-semibold text-black">
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
                  <div className="flex justify-center gap-1 py-1">
                    <button
                      onClick={showLegend}
                      className="font-medium text-blue-600 text-center transition-transform duration-300 transform hover:scale-125 mx-auto mt-1"
                    >
                      Legende
                    </button>
                  </div>
                  <dialog id="legend" className="modal">
                    <div className="modal-box w-full max-w-6xl">
                      <h2 className="text-center font-poppins font-semibold text-3xl">
                        Legende
                      </h2>
                      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 p-3">
                        <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 flex flex-col items-center">
                          <img
                            className="w-20 mx-auto"
                            src="https://res.cloudinary.com/dtrymbvrp/image/upload/v1738958806/alle_wyewox_c_pad_w_80_h_75_n0nktg.png"
                            alt="alle"
                          />
                          <p className="font-poppins font-medium text-center text-md">
                            Alle
                          </p>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 flex flex-col items-center">
                          <img
                            src="https://res.cloudinary.com/dtrymbvrp/image/upload/v1737040592/vertrieb_mhopgl.png"
                            alt="Vertrieb"
                            className="w-20 mx-auto"
                          />
                          <p className="font-poppins font-medium text-center text-md">
                            Vertrieb
                          </p>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 flex flex-col items-center">
                          <img
                            src="https://res.cloudinary.com/dtrymbvrp/image/upload/v1737040592/logistik_blm8tf.png"
                            alt="Logistik"
                            className="w-20 mx-auto"
                          />
                          <p className="font-poppins font-medium text-center text-md">
                            Logistik
                          </p>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 flex flex-col items-center">
                          <img
                            src="https://res.cloudinary.com/dtrymbvrp/image/upload/v1738958594/fuhrpark_bhkb9q_c_pad_w_80_h_74_unpasw.png"
                            alt="Fuhrpark"
                            className="w-20 mx-auto"
                          />
                          <p className="font-poppins font-medium text-center text-md">
                            Fuhrpark
                          </p>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 flex flex-col items-center">
                          <img
                            src="https://res.cloudinary.com/dtrymbvrp/image/upload/v1737040592/IT_cyoqz8.png"
                            alt="IT & Services"
                            className="w-20 mx-auto"
                          />
                          <p className="font-poppins font-medium text-center text-md">
                            IT & Services
                          </p>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 flex flex-col items-center">
                          <img
                            src="https://res.cloudinary.com/dtrymbvrp/image/upload/v1737040593/HR_bhni2i.png"
                            alt="HR & Training"
                            className="w-20 mx-auto"
                          />
                          <p className="font-poppins font-medium text-center text-md">
                            HR & Training
                          </p>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 flex flex-col items-center">
                          <img
                            src="https://res.cloudinary.com/dtrymbvrp/image/upload/v1737040593/buha_xuo2tb.png"
                            alt="Buchhaltung"
                            className="w-20 mx-auto"
                          />
                          <p className="font-poppins font-medium text-center text-md">
                            Buchhaltung
                          </p>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 flex flex-col items-center">
                          <img
                            src="https://res.cloudinary.com/dtrymbvrp/image/upload/v1737040594/showroom_nsrmiw.png"
                            alt="showroom"
                            className="w-20 mx-auto"
                          />
                          <p className="font-poppins font-medium text-center text-md">
                            Showroom
                          </p>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 flex flex-col items-center">
                          <img
                            src="https://res.cloudinary.com/dtrymbvrp/image/upload/v1737040596/design_x4hg1y.png"
                            alt="Design & Marketing"
                            className="w-20 mx-auto"
                          />
                          <p className="font-poppins font-medium text-center text-md">
                            Design & Marketing
                          </p>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 flex flex-col items-center">
                          <img
                            src="https://res.cloudinary.com/dtrymbvrp/image/upload/v1737040595/bestandsmanagement_dacigz.png"
                            alt="Bestandsmanagement"
                            className="w-20 mx-auto"
                          />
                          <p className="font-poppins font-medium text-center text-md">
                            Bestandsmanagement
                          </p>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 flex flex-col items-center">
                          <img
                            src="https://res.cloudinary.com/dtrymbvrp/image/upload/v1737040595/haustechnik_uj6pa6.png"
                            alt="Haustechnik"
                            className="w-20 mx-auto"
                          />
                          <p className="font-poppins font-medium text-center text-md">
                            Haustechnik
                          </p>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 flex flex-col items-center">
                          <img
                            src="https://res.cloudinary.com/dtrymbvrp/image/upload/v1737040595/unternehmensentwicklung_qiggf8.png"
                            alt="Unternehmensentwicklung"
                            className="w-20 mx-auto"
                          />
                          <p className="font-poppins font-medium text-center text-md">
                            Unternehmensentwicklung
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
                  <p className="w-full text-center lg:flex justify-center lg:w-7/12 mx-auto mt-2 text-base text-gray-600">
                    {activity.description}
                  </p>
                  {/* Desktop */}
                  <div className="hidden lg:grid grid-cols-3 grid-rows-1 gap-4 text-center lg:gap-0 lg:text-left justify-items-center">
                    <div className="flex flex-col">
                      <p className="mt-4 text-base text-gray-600">
                        <span className="font-bold">Datum:</span>{" "}
                        {formattedDate}
                      </p>
                      <p className="mt-4 text-base text-gray-600 ">
                        <span className="font-bold">Uhrzeit:</span>{" "}
                        {activity.time}
                      </p>
                    </div>
                    <div className="flex flex-col">
                      <p className="mt-4 text-base text-gray-600 lg:hidden">
                        <span className="font-bold">Dauer:</span> <br />
                        {activity.duration + " Min."}
                      </p>
                      <p className="hidden lg:inline mt-4 text-base text-gray-600">
                        <span className="font-bold">Dauer:</span>{" "}
                        {activity.duration + " Min."}
                      </p>
                      <p className="mt-4 text-base text-gray-600 ">
                        <span className="font-bold">Referent*in:</span>{" "}
                        {activity.teacher}
                      </p>
                    </div>
                    <div className="flex flex-col">
                      <p className="mt-4 text-base text-gray-600 ">
                        <span className="font-bold">Location:</span>{" "}
                        {activity.location}
                      </p>
                      <p className="mt-4 text-base text-gray-600 lg:hidden">
                        <span className="font-bold">Kapazität:</span>{" "}
                        {activity.capacity + " Teilneh."}
                      </p>
                      <p className="hidden lg:inline mt-4 text-base text-gray-600">
                        <span className="font-bold">Kapazität:</span>{" "}
                        {activity.capacity + " Teilnehmer"}
                      </p>
                    </div>
                  </div>
                  {/* Mobile */}
                  <div className="grid grid-cols-3 grid-rows-1- text-center lg:gap-0 lg:hidden text-left justify-items-center">
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
          <div>
            {filteredRegisteredUsers.map((registeredUser) => (
              <div
                key={registeredUser._id}
                className="relative flex items-center w-full lg:w-4/12 mx-auto mt-4 mb-6"
              >
                <motion.div
                  whileHover={{ x: [-10, 10, -10] }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute right-[-40px] flex items-center cursor-pointer"
                  onClick={() => setSelectedUser(registeredUser._id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={40}
                    height={40}
                    viewBox="0 0 24 24"
                    className="text-blue-500"
                  >
                    <path
                      fill="currentColor"
                      d="m15.632 12l-4.748-8.968l-1.768.936L13.368 12l-4.252 8.032l1.768.936z"
                    />
                  </svg>
                </motion.div>

                <div className="relative flex w-full">
                  <motion.div
                    initial={{ x: 0 }}
                    animate={{
                      x: selectedUser === registeredUser._id ? "-50%" : 0,
                    }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="bg-white shadow overflow-hidden sm:rounded-md w-full lg:w-full"
                  >
                    <ul>
                      <li>
                        <RegisterdUserCard
                          registeredUser={registeredUser}
                          activityId={id}
                          setActivity={setActivity}
                        />
                      </li>
                    </ul>
                  </motion.div>

                  <AnimatePresence>
                    {selectedUser === registeredUser._id && (
                      <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 350 }}
                        exit={{ x: "100%" }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="overflow-x-scroll absolute top-0 left-8/12 w-full lg:w-full h-full bg-gray-50 shadow-lg p-6"
                      >
                        <button
                          className="absolute top-4 right-4 text-lg"
                          onClick={() => setSelectedUser(null)}
                        >
                          ✖
                        </button>

                        <UserInfo userId={registeredUser._id} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}
