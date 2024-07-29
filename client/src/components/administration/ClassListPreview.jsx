import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

export default function ClassListPreview({ activity }) {
  const [ausstehendCount, setAusstehendCount] = useState(0);

  useEffect(() => {
    const ausstehendUsers = activity.registeredUsers.filter((user) => {
      return user.classesRegistered.some((classInfo) => {
        return (
          classInfo.registeredClassID === activity._id &&
          classInfo.status === "ausstehend"
        );
      });
    });
    setAusstehendCount(ausstehendUsers.length);
  }, [activity]);

  const dateString = activity?.date;
  const date = new Date(dateString);

  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const formattedDate = `${day}/${month}/${year}`;

  return (
    <tr>
      <td className="py-3 px-5 border-b border-blue-gray-50">
        <div className="flex items-center gap-4">
          <p className="block antialiased text-sm leading-normal text-blue-gray-900 font-bold">
            {activity.title}
          </p>
        </div>
      </td>

      <td className="py-3 px-5 border-b border-blue-gray-50">
        <div className="flex justify-center">
          {activity.department.map((image, index) => {
            return (
              <img key={index} src={image} alt="logo" className="w-12 h-12" />
            );
          })}
        </div>
      </td>

      <td className="py-3 px-5 border-b border-blue-gray-50">
        <p className="block antialiased text-sm font-medium text-blue-gray-600 text-center">
          {activity.location}
        </p>
      </td>

      <td className="py-3 px-5 border-b border-blue-gray-50">
        <p className="block antialiased  text-sm font-medium text-blue-gray-600 text-center">
          {formattedDate}
        </p>
      </td>

      <td className="py-3 px-5 border-b border-blue-gray-50">
        <p className="block antialiased  text-sm font-medium text-blue-gray-600 text-center">
          {activity.time}
        </p>
        <p className="block antialiased  text-sm font-medium text-blue-gray-600 text-center">
          {`(Dauer: ${activity.duration} min)`}
        </p>
      </td>

      <td className="py-3 px-5 border-b border-blue-gray-50">
        <p className="block antialiased  text-sm font-medium text-blue-gray-600 text-center">
          {ausstehendCount}
        </p>
      </td>

      <td className="py-3 px-5 border-b border-blue-gray-50">
        <div className="flex gap-2 justify-center items-center">
          <p className="block antialiased text-sm font-medium text-blue-gray-600 text-center">
            {activity.stornoReason.length}
          </p>
          <NavLink
            to={`/admin/cancelationStatistic/${activity._id}`}
            className="block antialiased  text-sm font-medium text-blue-600 text-center transition-transform duration-300 transform hover:scale-150"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z"
              />
            </svg>
          </NavLink>
        </div>
      </td>

      <td className="py-3 px-5 border-b border-blue-gray-50 flex justify-center">
        <div
          className="radial-progress bg-gray-200 text-cyan-600 mx-8"
          style={{
            "--value": (activity.usedCapacity / activity.capacity) * 100,
          }}
          role="progressbar"
        >
          <span className="text-neutral-800 font-bold">
            {activity.usedCapacity + "/" + activity.capacity}
          </span>
        </div>
      </td>

      <td className="py-3 px-5 border-b border-blue-gray-50">
        <NavLink
          to={`/classInformation/${activity._id}`}
          className="mb-2 block antialiased  text-sm font-medium text-blue-600 text-center transition-transform duration-300 transform hover:scale-150"
        >
          Details
        </NavLink>
        <NavLink
          to={`/admin/editClass/${activity._id}`}
          className="mb-2 block antialiased  text-sm font-medium text-blue-600 text-center transition-transform duration-300 transform hover:scale-150"
        >
          Bearbeiten
        </NavLink>
        <NavLink
          to={`/admin/report/${activity._id}`}
          className="block antialiased  text-sm font-medium text-blue-600 text-center transition-transform duration-300 transform hover:scale-150"
        >
          Bericht
        </NavLink>
      </td>
    </tr>
  );
}
