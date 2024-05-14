import { useEffect, useState } from "react";
import axiosClient from "../../utils/axiosClient";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import RegisterdUserCard from "./RegisteredUserCard";

export default function SingleClassDetails() {
  const { id } = useParams();
  const navigate = useNavigate()

  const [activity, setActivity] = useState(null);

  useEffect(() => {
    axiosClient
      .get(`/classActivity/${id}`)
      .then((response) => {
        setActivity(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const dateString = activity?.date;
  const date = new Date(dateString);

  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const formattedDate = `${day}/${month}/${year}`;
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
              <div className="mx-auto mt-6 w-8/12 m-2 bg-white border p-4 relative z-40 group shadow-lg">
                <div className=" absolute bg-blue-500/50 top-0 left-0 w-24 h-1 z-30  transition-all duration-200 group-hover:bg-orange-300 group-hover:w-1/2  "></div>
                <div className="py-2 px-9 relative  ">
                  <div className="flex justify-between">
                  <div className="text-right mt-1 mr-16">
                  <button 
                    onClick={() => navigate(-1)}
                    className="flex items-center text-white py-2 px-4 uppercase rounded bg-blue-400 hover:bg-blue-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
                  >
                    Zurück
                  </button>
              </div>
                    <h3 className="flex justify-center text-lg font-semibold text-black">
                      {activity.title}
                    </h3>
                    <p className="font-semibold">
                      {activity.capacity - activity.usedCapacity === 0 ? (
                        <span class="shrink-0 rounded-full bg-red-500 px-3 font-mono text-md font-medium tracking-tight text-white">
                          Class Voll
                        </span>
                      ) : (
                        <>
                        <span className="mr-2">Freie Plätze:</span>
                        <span class="shrink-0 rounded-full bg-green-500 px-3 font-mono text-md font-medium tracking-tight text-white">
                          {activity.capacity - activity.usedCapacity}
                        </span>
                        </>
                      )}
                    </p>
                  </div>
                  <div className="flex justify-center mt-2 mb-1">
                    <p>Ziel Gruppe</p>
                  </div>
                  <div className="flex justify-center gap-2">
                    {activity.department.map((image) => {
                      return (
                        <img src={image} alt="logo" className="w-12 h-12" />
                      );
                    })}
                  </div>
                  <p className="flex justify-center mt-4 text-base text-gray-600">
                    {activity.description}
                  </p>
                  <div className="flex justify-around gap-16">
                    <div className="flex flex-col">
                      <p className="mt-4 text-base text-gray-600">
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
                      <p className="mt-4 text-base text-gray-600 ">
                        <span className="font-bold">Dauer:</span>{" "}
                        {activity.duration + " min"}
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
                className="w-6/12 bg-white shadow overflow-hidden sm:rounded-md mx-auto mt-4"
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
