import { NavLink, useNavigate, useParams } from "react-router-dom";
import axiosClient from "../../utils/axiosClient";
import { useEffect, useState } from "react";
import SideMenu from "./SideMenu";
import InterestHistoryCard from "./InterestHistoryCard";

export default function InterestHistory() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [interest, setInterest] = useState([]);

  useEffect(() => {
    axiosClient
      .get(`activityInterest/getInterest/${id}`)
      .then((response) => {
        setInterest(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="bg-gray-50/50 flex">
      <SideMenu />
      <div className="mt-4 bg-white p-4 shadow rounded-lg h-[calc(93vh-32px)] w-10/12 mx-auto">
        <h2 className="text-gray-500 text-lg font-semibold pb-4">Historie:</h2>
        <div className="bg-gradient-to-r from-blue-300 to-blue-500 h-px mb-6"></div>
        <div className="mx-auto w-11/12 mb-4 grid grid-cols-1 gap-6">
          <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden xl:col-span-2">
            <div className="p-6 h-[calc(75.5vh-32px)] overflow-x-scroll px-0 pt-0 pb-2">
              <table className="w-full min-w-[640px] table-auto">
              {/* <thead className="bg-gray-50">
                      <tr >
                        <th className="px-6 py-3 text-sm font-medium text-gray-500 uppercase tracking-wider">
                          Mitarbeiter
                        </th>
                        <th className="px-6 py-3 text-sm font-medium text-gray-500 uppercase tracking-wider">
                        Zeitstempel
                        </th>
                        <th className="px-6 py-3 text-sm font-medium text-gray-500 uppercase tracking-wider">
                        Abteilung
                        </th>
                        <th className="px-6 py-3 text-sm font-medium text-gray-500 uppercase tracking-wider">
                          Rolle
                        </th>
                        <th className="w-2/12 px-6 py-3 text-sm font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead> */}
              <div className="flex flex-col w-full">
              <div
                      className="flex items-center justify-between w-full py-2"
                    >
                                            <div className="flex-1 ml-8 px-4">
                        Mitarbeiter
                      </div>

                      {/* Date Column */}
                      <div className="text-left w-[150px] ">
                      Zeitstempel
                      </div>

                      {/* Time Column */}
                      <div className="flex flex-col text-left w-[150px] ">
                      Abteilung
                      </div>
                      <div className="flex flex-col text-left w-[150px] pl-4">
                      Rolle
                      </div>
                      {/* Status Column */}
                      <div className="flex flex-col text-left w-[150px]">
                      Status
                      </div>
                      </div>
</div>
                <tbody className="bg-white divide-y divide-gray-200">
                {interest?.pastInterests?.slice().reverse().map((user, index) => {
  return <InterestHistoryCard key={user._id} user={user} />;
})}
                </tbody>
              </table>
            </div>
          </div>
          <div className="text-right flex justify-end">
            <NavLink
              onClick={() => navigate(-1)}
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
