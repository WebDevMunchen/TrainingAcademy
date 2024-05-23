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

  const dateString = activity?.date;
  const date = new Date(dateString);

  const day = date.getDate();
  const dayPrior = date.getDate() - 1;
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const formattedDate = `${day}/${month}/${year}`;
  const formatedDateprior = `${dayPrior}/${month}/${year}`;
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
                    {user.role === "admin" ? (
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
                          Überischt
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
                            {formatedDateprior} um {activity.time}
                          </span>
                        </p>
                      </div>
                      <div>
                        <p className="font-semibold flex items-center ml-[61px] mt-2">
                          {activity.capacity - activity.usedCapacity === 0 ? (
                            <span className="shrink-0 rounded-full bg-red-500 px-3 font-mono text-md font-medium tracking-tight text-white">
                              Class Voll
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
                          Class Voll
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
                    <p>Ziel Gruppe</p>
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
                  <p className="flex justify-center text-center mt-4 text-base text-gray-600">
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
                        <span className="font-bold">Lehrer:</span>{" "}
                        {activity.teacher}
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
                className="w-11/12 bg-white shadow overflow-hidden sm:rounded-md mx-auto mt-4 lg:w-4/12"
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
