import { NavLink } from "react-router-dom";

export default function ClassListPreview({ activity }) {
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
        <p className="block antialiased font-sans text-xs font-medium text-blue-gray-600 text-center">
          {activity.department}
        </p>
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

      <td className="py-3 px-5 border-b border-blue-gray-50 flex justify-center">
        <div className="w-10/12">
          <p className="antialiased font-sans mb-1 block text-xs font-medium text-blue-gray-600">
            {activity.registeredUsers.length + "/" + activity.capacity}
          </p>
          <div className="flex flex-start bg-blue-gray-50 overflow-hidden w-full rounded-sm font-sans text-xs font-medium h-1">
            <div
              className="flex justify-center items-center h-full bg-gradient-to-tr from-blue-600 to-blue-400 text-white"
              style={{
                width: `${
                  (activity.registeredUsers.length / activity.capacity) * 100
                }%`,
              }}
            ></div>
          </div>
        </div>
      </td>

      <td className="py-3 px-5 border-b border-blue-gray-50">
        <NavLink
          to={`/${activity._id}`}
          className="block antialiased font-sans text-xs font-medium text-blue-600 text-center"
        >
          Details
        </NavLink>
      </td>
    </tr>
  );
}
