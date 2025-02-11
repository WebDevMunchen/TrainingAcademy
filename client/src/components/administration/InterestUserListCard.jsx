import { NavLink } from "react-router-dom";

export default function UserListCardCard({ user }) {
  const formattedDate = new Date(user.interestedAt).toLocaleDateString(
    "de-DE",
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    }
  );

  return (
    <>
      <tr className="text-center">
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm font-medium text-gray-900">
            {user.user.firstName}
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm font-medium text-gray-900">
            {user.user.lastName}
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <span
            className={`px-2.5 py-0.5 inline-flex text-sm leading-5 font-semibold rounded-full 
    ${
      user.user.status === "aktiv"
        ? "bg-green-100 text-green-800"
        : "bg-red-200 text-red-700"
    }`}
          >
            {user.user.status}
          </span>
        </td>
        {user.user.role === "teacher" ? (
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            Referent*in
          </td>
        ) : user.user.role === "ASP" ? (
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            Genehmiger*in
          </td>
        ) : (
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {/* {user.user.role.charAt(0).toUpperCase() + user.user.role.slice(1)} */}
          </td>
        )}
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {user.user.logID}
        </td>

        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {user.user.department}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex justify-center items-center">
          {formattedDate}
        </td>
      </tr>
    </>
  );
}
