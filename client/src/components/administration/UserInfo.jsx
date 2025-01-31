import { useEffect, useState } from "react";
import axiosClient from "../../utils/axiosClient";

export default function UserInfo({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axiosClient
      .get(`/user/profileInformation/${userId}`)
      .then((response) => {
        setUser(response.data);
        console.log(response.data);
      })
      .catch((error) => {});
  }, [userId]); // Added userId dependency to re-fetch data when the userId changes.

  return (
    <>
      {!user ? (
        <p>Loading...</p> // Showing loading message while data is being fetched
      ) : (
        <ul>
          {user.classesRegistered.map((element) => {
            // Format the date to a more readable format inside the map function
            const formattedDate = new Date(
              element.registeredClassID.date
            ).toLocaleDateString("de-DE", {
              year: "numeric",
              month: "short",
              day: "numeric",
            });

            return (
              <li className="text-center" key={element.registeredClassID._id}>
                {/* Title of the class */}
                <div className="font-bold text-md mb-3">
                  {element.registeredClassID.title}
                </div>

                {/* Single row table with date, time, and status */}
                <div className="my-2">
                  <table className="text-sm table-auto border-collapse border border-gray-300 w-full">
                    <thead>
                      <tr className="text-center">
                        <th className="px-4 py-1 bg-gray-200">Datum</th>
                        <th className="px-4 py-1 bg-gray-200">Uhrzeit</th>
                        <th className="px-4 py-1 bg-gray-200">Status</th>
                        <th className="px-4 py-1 bg-gray-200">Teilnahme</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="px-4 py-2 border-b">{formattedDate}</td>
                        <td className="px-4 py-2 border-b">
                          {element.registeredClassID.time}
                        </td>
                        {/* Conditional badge for status */}
                        <td className="flex items-center justify-center gap-2 px-4 py-2 border-b">
                          <span
                            className={`inline-block px-3 py-0.5 text-white font-medium rounded-full ${
                              element.status === "genehmigt"
                                ? "bg-green-500"
                                : element.status === "abgelehnt"
                                ? "bg-red-500"
                                : "bg-gray-500"
                            }`}
                          >
                            {element.status}
                          </span>
                          {element?.status === "abgelehnt" && (
                            <span
                              className="tooltip hover:cursor-pointer"
                              style={{ width: "auto", height: "auto" }}
                              data-tip={element.reason}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="#ffb951"
                                className="w-8 h-8"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 0 1 .67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 1 1-.671-1.34l.041-.022ZM12 9a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-2 border-b">
                        <span
                            className={`inline-block px-3 py-0.5 text-white font-medium rounded-full ${
                              element.statusAttended === "teilgenommen"
                                ? "bg-green-500"
                                : element.statusAttended === "nicht teilgenommen"
                                ? "bg-red-500"
                                : "bg-amber-400"
                            }`}
                          >
                            {element.statusAttended}
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}
