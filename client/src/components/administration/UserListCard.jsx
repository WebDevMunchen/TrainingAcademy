import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

export default function UserListCard({ user, selectedYear }) {
  const [fileUrl, setFileUrl] = useState(null);

  useEffect(() => {
    const findURL = user?.classesRegistered?.find((registeredClass) => {
      const attendedYear = new Date(
        registeredClass?.registeredClassID?.date
      ).getFullYear();
      return (
        registeredClass?.registeredClassID?.safetyBriefing &&
        registeredClass.statusAttended === "teilgenommen" &&
        attendedYear === selectedYear
      );
    });

    if (findURL && findURL.registeredClassID) {
      setFileUrl(findURL.registeredClassID.fileUrl);
    }
  }, [user, selectedYear]);

  const handleDownload = async () => {
    if (!fileUrl) {
      console.error("File URL is not defined.");
      return;
    }

    try {
      const response = await fetch(fileUrl);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;

      const filename = fileUrl.split("/").pop();
      link.download = filename;

      document.body.appendChild(link);
      link.click();

      URL.revokeObjectURL(url);
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading the file:", error);
    }
  };

  const hasAttendedSafetyBriefingThisYear = user?.classesRegistered?.some(
    (registeredClass) => {
      const attendedYear = new Date(
        registeredClass?.registeredClassID?.date
      ).getFullYear();
      return (
        registeredClass?.registeredClassID?.safetyBriefing &&
        registeredClass?.statusAttended === "teilgenommen" &&
        attendedYear === selectedYear
      );
    }
  );

  return (
    <>
      <tr className="text-center">
        {/* User information */}
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm font-medium text-gray-900">
            {user.firstName}
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm font-medium text-gray-900">
            {user.lastName}
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <span
            className={`px-2.5 py-0.5 inline-flex text-sm leading-5 font-semibold rounded-full 
    ${
      user.status === "aktiv"
        ? "bg-green-100 text-green-800"
        : "bg-red-200 text-red-700"
    }`}
          >
            {user.status}
          </span>
        </td>
        {user.role === "teacher" ? (
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            Referent*in
          </td>
        ) : (
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
          </td>
        )}
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {user.logID}
        </td>

        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {user.department.charAt(0).toUpperCase() + user.department.slice(1)}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex justify-center items-center">
          {hasAttendedSafetyBriefingThisYear ? (
            <div className="flex gap-3">
              <svg
                className="h-6 w-6 text-green-600"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              <button onClick={handleDownload}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6 text-blue-500 transform transition-transform duration-300 hover:scale-150"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m9 13.5 3 3m0 0 3-3m-3 3v-6m1.06-4.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z"
                  />
                </svg>
              </button>
            </div>
          ) : (
            <svg
              className="h-6 w-6 text-red-600"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="15" y1="9" x2="9" y2="15" />
              <line x1="9" y1="9" x2="15" y2="15" />
            </svg>
          )}
        </td>

        <td className="px-6 py-4 text-sm font-medium">
          <NavLink
            to={`/admin/userProfile/${user._id}`}
            className="block text-sm font-medium text-blue-600 text-center transition-transform duration-300 transform hover:scale-125"
          >
            Mehr
          </NavLink>
        </td>
      </tr>
    </>
  );
}
