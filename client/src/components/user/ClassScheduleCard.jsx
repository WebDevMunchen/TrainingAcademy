import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { useForm } from "react-hook-form";
import axiosClient from "../../utils/axiosClient";
import { NavLink } from "react-router-dom";

export default function ClassScheduleCard({ activity }) {

  const { setUser, user } = useContext(AuthContext);

  const [statusBtn, setStatusBtn] = useState("Anmelden")

  const { handleSubmit } = useForm();

  const onSubmit = () => {
    axiosClient
      .put(`/classActivity/registerClass/${activity._id}`, {
        withCredentials: true,
      })
      .then((response) => {
        setUser((prev) => ({ ...prev, ...response.data }));
        setStatusBtn("Angemeldet")
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const dateString = activity.date;
  const date = new Date(dateString);

  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const formattedDate = `${day}/${month}/${year}`;

  return (
    <>
      <div className="transition-all  duration-1000 bg-white hover:bg-blue-500  hover:shadow-xl m-2 p-4 relative z-40 group  ">
        <div className=" absolute  bg-blue-500/50 top-0 left-0 w-24 h-1 z-30  transition-all duration-200   group-hover:bg-white group-hover:w-1/2  "></div>
        <div className="py-2 px-9 relative  ">
          <h3 className="flex justify-center text-lg font-semibold text-black group-hover:text-white ">
            {activity.title}
          </h3>
          <div className="mt-4 flex justify-center">
            {activity.department.map((dept, index) => (
              <p
                key={index}
                className="text-base text-gray-600 group-hover:text-white"
              >
                {dept}
              </p>
            ))}
          </div>
          <p className="flex justify-center mt-4 text-base text-gray-600 group-hover:text-white  ">
            {activity.description}
          </p>
          <div className="flex justify-around gap-16">
            <div className="flex flex-col">
              <p className="mt-4 text-base text-gray-600 group-hover:text-white">
                <span className="font-bold">Kapazität:</span>{" "}
                {activity.capacity + " Teilnehmer"}
              </p>
              <p className="mt-4 text-base text-gray-600 group-hover:text-white">
                <span className="font-bold">Datum:</span> {formattedDate}
              </p>
            </div>
            <div className="flex flex-col">
              <p className="mt-4 text-base text-gray-600 group-hover:text-white">
                <span className="font-bold">Uhrzeit:</span> {activity.time}
              </p>
              <p className="mt-4 text-base text-gray-600 group-hover:text-white">
                <span className="font-bold">Dauer:</span>{" "}
                {activity.duration + " min"}
              </p>
            </div>
            <div className="flex flex-col">
              <p className="mt-4 text-base text-gray-600 group-hover:text-white">
                <span className="font-bold">Location:</span> {activity.location}
              </p>
              <p className="mt-4 text-base text-gray-600 group-hover:text-white">
                <span className="font-bold">Lehrer:</span> {activity.teacher}
              </p>
            </div>
          </div>
          
          <div className="flex justify-center">
            {user.role === "user" && (
              <form onSubmit={handleSubmit(onSubmit)}>
                <input
                  type="submit"
                  className="mt-8 bg-gradient-to-b from-gray-700 to-gray-900 font-medium p-2 mt-2 md:p-2 text-white uppercase rounded cursor-pointer"
                  value={activity.registeredUsers.some(userObj => userObj._id === user._id) ? "Bereits Angemeldet" : statusBtn}
                />
              </form>
            )}
          </div>

          <div className="flex justify-center">
            {user.role !== "user" && (
              <NavLink
                to={`/${activity._id}`}
                className="mt-8 bg-gradient-to-b from-gray-700 to-gray-900 font-medium p-2 mt-2 md:p-2 text-white uppercase rounded cursor-pointer"
              >
                Details Anzeigen
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
