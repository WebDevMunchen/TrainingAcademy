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
        <div className="flex items-center">
          <span
            className={`px-2 py-0.5 mr-1 inline-flex text-sm leading-5 font-semibold rounded-full 
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
            <span
              className="tooltip mr-2 hover:cursor-pointer"
              style={{ width: "auto", height: "auto" }}
              data-tip={
                /^[^a-zA-Z]*$/.test(registration.reason)
                  ? "Kein Grund vorhanden"
                  : registration.reason
              }
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
        </div>
      </td>

      <td className="px-6 py-4 whitespace-nowrap">
        {registration.status === "abgelehnt" ? 
        <span className="bg-slate-200 text-white-800 px-2 inline-flex text-sm leading-5 font-semibold rounded-full">nicht angemeldet</span>
        :
        <span
        className={`px-2 inline-flex text-sm leading-5 font-semibold rounded-full 
        ${
          registration
            ? registration.statusAttended === "teilgenommen"
              ? "bg-green-100 text-green-800"
              : registration.statusAttended === "in Prüfung"
              ? "bg-orange-200 text-orange-800"
              : "bg-red-200 text-red-700"
            : ""
        }`}
      >
        {registration ? registration.statusAttended : "Not Registered"}
      </span>
      }

      </td>
    </tr>
  );
}
