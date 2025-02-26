import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import SideMenu from "./SideMenu";
import { NavLink } from "react-router-dom";
import ClassInterestCard from "./ClassInterestCard";

export default function ClassInterest() {
  const { allInterest } = useContext(AuthContext);

  return (
    <div className="bg-gray-50/50 flex">
      <SideMenu />

      <div className="flex-1 py-4 px-2 flex flex-col ">
        <div className="flex items-center gap-4 mb-6">
          <NavLink
            to="/admin/classInterest/create"
            className="ml-2 mt-1 flex items-center gap-2 bg-green-600 text-white font-medium px-4 py-2 rounded-lg shadow-md transition-all duration-300 hover:bg-green-700 hover:shadow-lg"
          >
            <span>Neue Erstellen</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 transition-transform duration-300 transform hover:scale-110"
            >
              <path
                fillRule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z"
                clipRule="evenodd"
              />
            </svg>
          </NavLink>
        </div>

        <div className="h-[calc(81vh)] overflow-y-scroll">
          <div className="flex flex-wrap justify-center gap-4">
            {allInterest.length === 0 ? (
              <p className="flex items-center text-md h-[calc(51vh-32px)] text-3xl font-medium text-gray-600">
                Noch keine Schulungen erstellt
              </p>
            ) : (
              allInterest.map((interest, index) => (
                <div className="w-full sm:w-1/2 lg:w-[32%] flex justify-center">
                  <ClassInterestCard
                    key={interest._id}
                    id={interest._id}
                    interest={interest}
                  />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
