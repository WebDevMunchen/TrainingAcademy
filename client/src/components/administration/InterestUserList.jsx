import { NavLink, useParams } from "react-router-dom";
import SideMenu from "./SideMenu";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import InterestUserListCard from "./InterestUserListCard";
import axiosClient from "../../utils/axiosClient";


export default function InterestUserList() {
  const { allInterest, setAllInterest } = useContext(AuthContext);
  const {id} = useParams()


  const [interest, setInterest] = useState([])

  useEffect(() => {
    axiosClient.get(`activityInterest/getInterest/${id}`).then((response) => {
      setInterest(response.data.interestedUsers)
    }).catch((error) => {
      console.log(error)
    })
  }, [])

  console.log(interest)

  return (
    <div className="bg-gray-50/50 flex">
      <SideMenu />
      <div className="mt-4 bg-white p-4 shadow rounded-lg h-[calc(93vh-32px)] w-10/12 mr-auto ml-auto">
        <h2 className="text-gray-500 text-lg font-semibold pb-4">
          Interessenübersicht
        </h2>
        <div className="bg-gradient-to-r from-blue-300 to-blue-500 h-px mb-6"></div>

        <div className="mx-auto w-11/12 mb-4 grid grid-cols-1 gap-6">
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
                      Status
                    </th>
                    <th className="px-6 py-3 text-sm font-medium text-gray-500 uppercase tracking-wider">
                      Rolle
                    </th>
                    <th className="px-6 py-3 text-sm font-medium text-gray-500 uppercase tracking-wider">
                      Kürzel
                    </th>
                    <th className="px-6 py-3 text-sm font-medium text-gray-500 uppercase tracking-wider">
                      Abteilung
                    </th>
                    <th className="w-2/12 px-6 py-3 text-sm font-medium text-gray-500 uppercase tracking-wider">
                      Zeitstempel
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {interest.map((user) => {
                                  return (
                                    <InterestUserListCard
                                      key={user._id}
                                      user={user}
                                    />
                                  );
                                })}

                </tbody>
              </table>
            </div>
          </div>
          <div className="text-right flex justify-end">
            <NavLink
              to={"/admin/classInterest"}
              className="w-fit flex items-center text-white py-2 px-4 uppercase rounded bg-blue-400 hover:bg-blue-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
            >
              Zurück
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}
