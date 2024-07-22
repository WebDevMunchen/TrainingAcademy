import { NavLink } from "react-router-dom";

export default function UserListCard({ user }) {
  const currentYear = new Date().getFullYear();

  const hasAttendedSafetyBriefingThisYear = user?.classesRegistered?.some(
    (registeredClass) => {
      const attendedYear = new Date(
        registeredClass.registeredClassID.date
      ).getFullYear();
      return (
        registeredClass.registeredClassID.safetyBriefing &&
        registeredClass.statusAttended === "teilgenommen" &&
        attendedYear === currentYear
      );
    }
  );

  return (
    <>
      <tr className="text-center">
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
            className="block  text-sm font-medium text-blue-600 text-center transition-transform duration-300 transform hover:scale-125"
          >
            Mehr
          </NavLink>
        </td>
      </tr>
    </>
  );
}
