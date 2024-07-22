import { useEffect, useState } from "react";
import axiosClient from "../../utils/axiosClient";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import SideMenu from "./SideMenu";
import ReportCard from "./ReportCard";

export default function Report() {
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

  return (
    <>
      {!activity ? (
        <p>Loading</p>
      ) : (
        <>
          <div className="bg-gray-50/50 flex">
            <SideMenu />
            <div className="mt-4 bg-white p-4 shadow rounded-lg h-[calc(93vh-32px)] w-10/12 mr-auto ml-auto">
              <h2 className="text-gray-500 text-lg font-semibold pb-4">
                Schulungsbericht: {activity.title}
              </h2>
              <div className="bg-gradient-to-r from-blue-300 to-blue-500 h-px mb-6"></div>
              <div className="mx-auto w-10/12 mb-4 grid grid-cols-1 gap-6">
                <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden xl:col-span-2">
                  <div className="p-6 h-[calc(75.5vh-32px)] overflow-x-scroll px-0 pt-0 pb-2">
                    <table className="w-full min-w-[640px] table-auto">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-sm font-medium text-gray-500 uppercase tracking-wider">
                            Vorname
                          </th>
                          <th className="px-6 py-3 text-sm font-medium text-gray-500 uppercase tracking-wider">
                            Nachname
                          </th>
                          <th className="px-6 py-3 text-sm font-medium text-gray-500 uppercase tracking-wider">
                            Abteilung
                          </th>
                          <th className="px-6 py-3 text-sm font-medium text-gray-500 uppercase tracking-wider">
                            Genehmigung
                          </th>
                          <th className="px-6 py-3 text-sm font-medium text-gray-500 uppercase tracking-wider">
                            Teilnahme
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {activity.registeredUsers.map((registeredUser) => {
                          return (
                            <ReportCard
                              key={registeredUser._id}
                              registeredUser={registeredUser}
                              activity={activity}
                            />
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="text-right mr-6 flex justify-end lg:mr-40">
                <NavLink
                  to={"/admin/dashboard"}
                  className="w-fit flex items-center text-white py-2 px-4 uppercase rounded bg-blue-400 hover:bg-blue-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
                >
                  Zurück
                </NavLink>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
