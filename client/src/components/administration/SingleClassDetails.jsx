import { useContext, useEffect, useState } from "react";
import axiosClient from "../../utils/axiosClient";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import RegisterdUserCard from "./RegisteredUserCard";
import { AuthContext } from "../../context/AuthProvider";

export default function SingleClassDetails() {
  const { user } = useContext(AuthContext);

  const { id } = useParams();
  const navigate = useNavigate();

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

  const filteredRegisteredUsers =
    user.role === "admin"
      ? activity?.registeredUsers
      : activity?.registeredUsers?.filter(
          (registeredUser) => registeredUser.department === user.department
        );

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
        const date = new Date(dateString);
        const datePrior = adjustDate(date, -2);
        const datePriorGenehmigung = adjustDate(date, -1);
        
        const formattedDate = formatDateString(date);
        const formattedDatePrior = formatDateString(datePrior);
        const formattedDatePriorGenehmigung = formatDateString(datePriorGenehmigung);
        
        const now = new Date();
        const hoursDifference = (date.getTime() - now.getTime()) / 3600000;
        
        console.log(date, now);
        console.log(hoursDifference);
        
        // Hide the 'Bearbeiten' button if the activity date is within 48 hours
        const isWithin48Hours = hoursDifference <= 48;
        
        // Use the isWithin48Hours variable to conditionally render the 'Bearbeiten' button in your component
        

  console.log(isWithin48Hours)
  return (
    <>
      {!activity ? (
        <p>Loading</p>
      ) : (
        <>
          {!activity ? (
            <p>Loading</p>
          ) : (
            <>
              <div className="flex justify-center">
                <img
                  src="https://d2nk66epwbpimf.cloudfront.net/images/345249fd-0959-4762-bfbc-80ca4247abbb/54ad38e7-f4b4-4dc6-9e80-21e06958a192.png"
                  className="h-32"
                  alt="logo"
                />
              </div>
              <div className="mx-auto mt-6 w-10/12 m-2 bg-white border p-4 relative group shadow-lg lg:w-7/12">
                <div className=" absolute bg-blue-500/50 top-0 left-0 w-24 h-1 transition-all duration-200 group-hover:bg-orange-300 group-hover:w-1/2  "></div>
                <div className="py-2 relative  ">
                  <div className="hidden lg:flex justify-between">
                    {user.role === "admin" && isWithin48Hours ? (
                      <div className="flex text-right mt-1 mr-12">
                        <NavLink
                          to={`/admin/editClass/${activity._id}`}
                          className="flex items-center text-white h-[40px] px-4 uppercase rounded bg-green-500 hover:bg-green-700 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
                        >
                          Bearbeiten
                        </NavLink>
                        <button
                          onClick={() => navigate("/classes")}
                          className="ml-2 flex items-center text-white  h-[40px] px-4 uppercase rounded bg-blue-400 hover:bg-blue-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
                        >
                          Übersicht
                        </button>
                      </div>
                    ) : (
                      <div className="flex text-right mt-1 mr-40">
                        <button
                          onClick={() => navigate("/classes")}
                          className="ml-2 flex items-center text-white  h-[40px]  px-4 uppercase rounded bg-blue-400 hover:bg-blue-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
                        >
                          Überischt
                        </button>
                      </div>
                    )}
                    <h3 className="flex justify-center text-lg font-semibold text-black">
                      {activity.title}
                    </h3>
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
                  <h3 className="flex justify-center mt-2 text-lg font-semibold text-black lg:hidden">
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
                      <h2 className="text-center font-anek font-semibold text-4xl">
                        Legende
                      </h2>
                      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 p-3">
                        <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 flex flex-col items-center">
                          <img
                            className="w-20 mx-auto"
                            src="https://res.cloudinary.com/dtrymbvrp/image/upload/v1715088433/symbols/hczkglpvaybhguywjgku.png"
                            alt="alle"
                          />
                          <p className="font-anek font-medium text-center text-lg">
                            Alle
                          </p>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 flex flex-col items-center">
                          <img
                            src="https://res.cloudinary.com/dtrymbvrp/image/upload/v1715088434/symbols/ng4emaukxn9adrxpnvlu.png"
                            alt="Vertrieb"
                            className="w-20 mx-auto"
                          />
                          <p className="font-anek font-medium text-center text-lg">
                            Vertrieb
                          </p>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 flex flex-col items-center">
                          <img
                            src="https://res.cloudinary.com/dtrymbvrp/image/upload/v1715088434/symbols/o4qwfioe3dkqrkhmumd4.png"
                            alt="Logistik"
                            className="w-20 mx-auto"
                          />
                          <p className="font-anek font-medium text-center text-lg">
                            Logistik
                          </p>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 flex flex-col items-center">
                          <img
                            src="https://res.cloudinary.com/dtrymbvrp/image/upload/v1715088434/symbols/uaozccdgnwtcelxvqjug.png"
                            alt="Fuhrpark"
                            className="w-20 mx-auto"
                          />
                          <p className="font-anek font-medium text-center text-lg">
                            Fuhrpark
                          </p>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 flex flex-col items-center">
                          <img
                            src="https://res.cloudinary.com/dtrymbvrp/image/upload/v1715088434/symbols/ke8amlflgcdrvdfghzoz.png"
                            alt="IT & Services"
                            className="w-20 mx-auto"
                          />
                          <p className="font-anek font-medium text-center text-lg">
                            IT & Services
                          </p>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 flex flex-col items-center">
                          <img
                            src="https://res.cloudinary.com/dtrymbvrp/image/upload/v1715088433/symbols/gmnv44k0nydrmfnbr67y.png"
                            alt="HR & Training"
                            className="w-20 mx-auto"
                          />
                          <p className="font-anek font-medium text-center text-lg">
                            HR & Training
                          </p>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 flex flex-col items-center">
                          <img
                            src="https://res.cloudinary.com/dtrymbvrp/image/upload/v1715088433/symbols/ip7khvjx1dgxosk6lxnb.png"
                            alt="Buchhaltung"
                            className="w-20 mx-auto"
                          />
                          <p className="font-anek font-medium text-center text-lg">
                            Buchhaltung
                          </p>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 flex flex-col items-center">
                          <img
                            src="https://res.cloudinary.com/dtrymbvrp/image/upload/v1715088434/symbols/ydkcdshvmwdffe4tyf9f.png"
                            alt="item8"
                            className="w-20 mx-auto"
                          />
                          <p className="font-anek font-medium text-center text-lg">
                            Einkauf & Anmietung
                          </p>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 flex flex-col items-center">
                          <img
                            src="https://res.cloudinary.com/dtrymbvrp/image/upload/v1715088433/symbols/wodezi58z28wwhcvhsev.png"
                            alt="Design & Planung"
                            className="w-20 mx-auto"
                          />
                          <p className="font-anek font-medium text-center text-lg">
                            Design & Planung
                          </p>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 flex flex-col items-center">
                          <img
                            src="https://res.cloudinary.com/dtrymbvrp/image/upload/v1715088434/symbols/ikluglsekc6msbuvgn0z.png"
                            alt="Projektmanagement"
                            className="w-20 mx-auto"
                          />
                          <p className="font-anek font-medium text-center text-lg">
                            Projektmanagement
                          </p>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 flex flex-col items-center">
                          <img
                            src="https://res.cloudinary.com/dtrymbvrp/image/upload/v1715088434/symbols/p0m4tdmsd5qdmysdzolk.png"
                            alt="Officemanagement"
                            className="w-20 mx-auto"
                          />
                          <p className="font-anek font-medium text-center text-lg">
                            Officemanagement
                          </p>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 flex flex-col items-center">
                          <img
                            src="https://res.cloudinary.com/dtrymbvrp/image/upload/v1715088433/symbols/l85s2hjejj6kzkzung8o.png"
                            alt="Gesundheitsmanagement"
                            className="w-20 mx-auto"
                          />
                          <p className="font-anek font-medium text-center text-lg">
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
                  <div className="grid grid-cols-3 grid-rows-1 gap-4 text-center lg:gap-0 lg:text-left justify-items-center">
                    <div className="flex flex-col">
                      <p className="mt-4 text-base text-gray-600 lg:hidden">
                        <span className="font-bold">Kapazität:</span>{" "}
                        {activity.capacity + " Teilneh."}
                      </p>
                      <p className="hidden lg:inline mt-4 text-base text-gray-600">
                        <span className="font-bold">Kapazität:</span>{" "}
                        {activity.capacity + " Teilnehmer"}
                      </p>
                      <p className="mt-4 text-base text-gray-600">
                        <span className="font-bold">Datum:</span>{" "}
                        {formattedDate}
                      </p>
                    </div>
                    <div className="flex flex-col">
                      <p className="mt-4 text-base text-gray-600 ">
                        <span className="font-bold">Uhrzeit:</span>{" "}
                        {activity.time}
                      </p>
                      <p className="mt-4 text-base text-gray-600 lg:hidden">
                        <span className="font-bold">Dauer:</span> <br />
                        {activity.duration + " Min."}
                      </p>
                      <p className="hidden lg:inline mt-4 text-base text-gray-600">
                        <span className="font-bold">Dauer:</span>{" "}
                        {activity.duration + " Min."}
                      </p>
                    </div>
                    <div className="flex flex-col">
                      <p className="mt-4 text-base text-gray-600 ">
                        <span className="font-bold">Location:</span>{" "}
                        {activity.location}
                      </p>
                      <p className="mt-4 text-base text-gray-600 ">
                        <span className="font-bold">Referent*in:</span>{" "}
                        {activity.teacher}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
          {filteredRegisteredUsers.map((registeredUser) => {
            return (
              <ul
                key={registeredUser._id}
                className="w-11/12 bg-white shadow overflow-hidden sm:rounded-md mx-auto mt-4 mb-6 lg:w-4/12"
              >
                <li>
                  <RegisterdUserCard
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
