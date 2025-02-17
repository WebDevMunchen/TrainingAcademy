import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import UserListCard from "./UserListCard";
import { NavLink } from "react-router-dom";
import SideMenu from "./SideMenu";

export default function UserList() {
  const { allUsers } = useContext(AuthContext);
  const date = new Date();
  const currentYear = date.getFullYear();

  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [yearlyTotalHours, setYearlyTotalHours] = useState(currentYear);

  const handleYearChange = (event) => {
    setSelectedYear(Number(event.target.value));
  };

  const handleTotalHoursYearChange = (event) => {
    setYearlyTotalHours(Number(event.target.value));
  };

  return (
    <>
      {!allUsers ? (
        <div className="flex mt-2 justify-center">
          <div className="relative">
            <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-200"></div>
            <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-blue-500 animate-spin"></div>
          </div>
        </div>
      ) : (
        <>
          <div className="bg-gray-50/50 flex">
            <SideMenu />
            <div className="mt-4 bg-white p-4 shadow rounded-lg h-[calc(93vh-32px)] mr-auto ml-auto">
              <h2 className="text-gray-500 text-lg font-semibold pb-4">
                Benutzerübersicht
              </h2>
              <div className="bg-gradient-to-r from-blue-300 to-blue-500 h-px mb-6"></div>

              <div className="mx-auto px-4 mb-4 grid grid-cols-1 gap-6">
                <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden xl:col-span-2">
                  <div className="p-6 h-[calc(75.5vh-32px)] overflow-x-scroll px-0 pt-0 pb-2">
                    <table className="w-full min-w-[640px] table-auto">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-[13px] font-medium text-gray-500 uppercase tracking-wider">
                            Vorname
                          </th>
                          <th className="px-6 py-3 text-[13px] font-medium text-gray-500 uppercase tracking-wider">
                            Nachname
                          </th>
                          <th className="px-6 py-3 text-[13px] font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-3 text-[13px] font-medium text-gray-500 uppercase tracking-wider">
                            Rolle
                          </th>
                          <th className="px-6 py-3 text-[13px] font-medium text-gray-500 uppercase tracking-wider">
                            Kürzel
                          </th>
                          <th className="px-6 py-3 text-[13px] font-medium text-gray-500 uppercase tracking-wider">
                            Abteilung
                          </th>
                          <th className="w-2/12 px-6 py-3 text-[13px] font-medium text-gray-500 uppercase tracking-wider">
                            <span>Jährliche Sicherheitsunterweisung in</span>
                            <select
                              value={selectedYear}
                              onChange={handleYearChange}
                              className="form-select font-extrabold text-blue-500 hover:cursor-pointer"
                            >
                              {[
                                currentYear,
                                currentYear - 1,
                                currentYear - 2,
                              ].map((year) => (
                                <option key={year} value={year}>
                                  {year}
                                </option>
                              ))}
                            </select>
                          </th>
                          <th className="w-[200px] px-6 py-3 text-[13px] font-medium text-gray-500 uppercase tracking-wider">
                            <span>Anwesende Stunden insgesamt</span>
                            <select
                              value={yearlyTotalHours}
                              onChange={handleTotalHoursYearChange}
                              className="form-select font-extrabold text-blue-500 hover:cursor-pointer"
                            >
                              {[
                                currentYear,
                                currentYear - 1,
                                currentYear - 2,
                              ].map((year) => (
                                <option key={year} value={year}>
                                  {year}
                                </option>
                              ))}
                            </select>
                          </th>
                          <th className="px-6 py-3 text-[13px] font-medium text-gray-500 uppercase tracking-wider">
                            Details
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {allUsers.map((user) => {
                          return (
                            <UserListCard
                              key={user._id}
                              user={user}
                              selectedYear={selectedYear}
                              yearlyTotalHours={yearlyTotalHours}
                            />
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="text-right flex justify-end">
                  <NavLink
                    to={"/admin/dashboard"}
                    className="w-fit flex items-center text-white py-2 px-4 uppercase rounded bg-blue-400 hover:bg-blue-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
                  >
                    Zurück
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
