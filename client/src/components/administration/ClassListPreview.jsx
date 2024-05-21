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
          <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-bold">
            {activity.title}
          </p>
        </div>
      </td>

      <td className="py-3 px-5 border-b border-blue-gray-50">
        <div className="flex">
          {activity.department.map((image, index) => {
            return <img key={index} src={image} alt="logo" className="w-12 h-12" />;
          })}
        </div>
      </td>

      <td className="py-3 px-5 border-b border-blue-gray-50">
        <p className="block antialiased font-sans text-xs font-medium text-blue-gray-600 text-center">
          {activity.location}
        </p>
      </td>

      <td className="py-3 px-5 border-b border-blue-gray-50">
        <p className="block antialiased font-sans text-xs font-medium text-blue-gray-600 text-center">
          {formattedDate}
        </p>
      </td>

      <td className="py-3 px-5 border-b border-blue-gray-50">
        <p className="block antialiased font-sans text-xs font-medium text-blue-gray-600 text-center">
          {activity.time}
        </p>
        <p className="block antialiased font-sans text-xs font-medium text-blue-gray-600 text-center">
          {`(${activity.duration} min)`}
        </p>
      </td>

      <td className="py-3 px-5 border-b border-blue-gray-50">
        <p className="block antialiased font-sans text-xs font-medium text-blue-gray-600 text-center">
          {ausstehendCount}
        </p>
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
          className="mb-2 block antialiased font-sans text-xs font-medium text-blue-600 text-center transition-transform duration-300 transform hover:scale-150"
        >
          Details
        </NavLink>
        <NavLink
          to={`/admin/editClass/${activity._id}`}
          className="mb-2 block antialiased font-sans text-xs font-medium text-blue-600 text-center transition-transform duration-300 transform hover:scale-150"
        >
          Bearbeiten
        </NavLink>
        <NavLink
          to={`/admin/report/${activity._id}`}
          className="block antialiased font-sans text-xs font-medium text-blue-600 text-center transition-transform duration-300 transform hover:scale-150"
        >
          Bericht
        </NavLink>
      </td>
    </tr>
  );
}
