export default function ReportCard({ registeredUser, activity }) {
  const registration = registeredUser.classesRegistered.find(
    (registration) => registration.registeredClassID === activity._id
  );

  return (
    <tr className="text-center">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">
          {registeredUser.firstName}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">
          {registeredUser.lastName}
        </div>
      </td>

      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">
          {registeredUser.department}
        </div>
      </td>

      <td className="px-6 py-4 flex justify-center ">
        <span
          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
          ${
            registration
              ? registration.status === "genehmigt"
                ? "bg-green-100 text-green-800"
                : registration.status === "ausstehend"
                ? "bg-orange-100 text-orange-800"
                : "bg-red-200 text-red-700"
              : ""
          }`}
        >
          {registration ? registration.status : "Not Registered"}
        </span>
        {registration.status === "abgelehnt" && (
          <div
            className="tooltip ml-2 hover:cursor-pointer"
            style={{ width: "auto", height: "auto" }}
            data-tip={registration.reason}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 hover:text-blue-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
              />
            </svg>
          </div>
        )}
      </td>

      <td className="px-6 py-4 whitespace-nowrap">
        <span
          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
          ${
            registration
              ? registration.statusAttended === "teilgenommen"
                ? "bg-green-100 text-green-800"
                : registration.statusAttended === "in Prüfung"
                ? "bg-orange-100 text-orange-800"
                : "bg-red-200 text-red-700"
              : ""
          }`}
        >
          {registration ? registration.statusAttended : "Not Registered"}
        </span>
      </td>
    </tr>
  );
}
