import { useState } from "react";
import { motion } from "framer-motion";

export default function ApproversUserListCard({ user, selectedYear }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => setIsOpen((prev) => !prev);

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
      {/* Main Table Row */}
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
            }
          `}
          >
            {user.status}
          </span>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {user.role === "teacher"
            ? "Referent*in"
            : user.role === "ASP"
            ? "Genehmiger*in"
            : user.role.charAt(0).toUpperCase() + user.role.slice(1)}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {user.logID}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {user.department}
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

        {/* Toggle Button in New Column */}
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
          <button
            onClick={toggleAccordion}
            className="px-3 py-1 bg-blue-400 text-white rounded-md hover:bg-blue-500 transition"
          >
            {isOpen ? "Weniger anzeigen" : "Anzeigen"}
          </button>
        </td>
      </tr>

      {/* Accordion Row Below */}
      <tr>
        <td colSpan="8">
          {/* Motion Div for Smooth Accordion Effect */}
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: isOpen ? "auto" : 0,
              opacity: isOpen ? 1 : 0,
            }}
            transition={{ duration: 0.4 }}
            className="bg-gray-100 py-2 px-8"
            style={{
              borderRadius: "0px", // No rounded borders
              overflow: "hidden", // Hide content when collapsed
            }}
          >
            <h3 className="text-lg text-center font-semibold mb-2">
              Schulungshistorie von {user.firstName}
            </h3>
            {user.classesRegistered && user.classesRegistered.length > 0 ? (
              <div className="flex flex-col w-full">
                {user.classesRegistered.map((registeredClass, index) => {
                  // Format the date before returning the JSX
                  const formattedDate = new Date(
                    registeredClass.registeredClassID?.date
                  ).toLocaleDateString("de-DE", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  });

                  return (
                    <div
                      key={index}
                      className="flex items-center justify-between w-full py-2"
                    >
                      {/* Title Column: Takes more width */}
                      <div className="flex-1 px-4 font-bold">
                        {registeredClass.registeredClassID?.title}
                      </div>

                      {/* Date Column */}
                      <div className="text-center w-[150px] px-4">
                        {formattedDate}
                      </div>

                      {/* Time Column */}
                      <div className="flex flex-col text-center w-[150px] px-4">
                        {registeredClass.registeredClassID?.time}
                        <span>(Uhrzeit)</span>
                      </div>

                      {/* Status Column */}
                      <div className="px-4 flex items-center w-[150px]">
                        <span
                          className={`inline-block px-3 py-1 font-base text-sm rounded-full ${
                            registeredClass.status === "genehmigt"
                              ? "bg-green-100 text-green-800"
                              : registeredClass.status === "abgelehnt"
                              ? "bg-red-200 text-red-700 tooltip hover:cursor-pointer"
                              : "bg-gray-200 text-gray-800"
                          }`}
                          data-tip={
                            registeredClass?.status === "abgelehnt"
                              ? registeredClass.reason
                              : ""
                          }
                        >
                          {registeredClass.status}
                        </span>
                      </div>

                      {/* Status Attended Column */}
                      <div className="px-4 w-[200px] text-center">
                        <span
                          className={`inline-block px-3 py-1 font-base text-sm rounded-full ${
                            registeredClass.statusAttended === "teilgenommen"
                              ? "bg-green-100 text-green-800"
                              : registeredClass.statusAttended ===
                                "nicht teilgenommen"
                              ? "bg-red-200 text-red-700"
                              : "bg-orange-100 text-orange-800"
                          }`}
                        >
                          {registeredClass.statusAttended}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="my-4 text-sm text-center text-gray-500">Noch keine Schulungshistorie vorhanden</p>
            )}
          </motion.div>
        </td>
      </tr>
    </>
  );
}
