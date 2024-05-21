import { NavLink } from "react-router-dom";

export default function UserListCard({ user }) {
  return (
    <>
      <tr className="text-center">
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm font-medium text-gray-900">{user.firstName}</div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm font-medium text-gray-900">{user.lastName}</div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <span
            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
    ${
      user.status === "aktiv"
        ? "bg-green-100 text-green-800"
        : "bg-red-200 text-red-700"
    }`}
          >
            {user.status}
          </span>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {user.role}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {user.logID}
        </td>

        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {user.department}
        </td>

        <td className="px-6 py-4 text-sm font-medium">
          <NavLink
            to={`/admin/userProfile/${user._id}`}
            className="block font-sans text-xs font-medium text-blue-600 text-center transition-transform duration-300 transform hover:scale-125"
          >
            Mehr
          </NavLink>
        </td>
      </tr>
    </>
  );
}
