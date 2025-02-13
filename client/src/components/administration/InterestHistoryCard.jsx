import { motion } from "framer-motion";
import { useState } from "react";

export default function InterestHistoryCard({ user }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => setIsOpen((prev) => !prev);

  const formattedDate = new Date(user.date).toLocaleDateString("de-DE", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <>
      <tr>
        <td colSpan={7} className="px-0 py-0 text-center">
          <button
            onClick={toggleAccordion}
            className="w-full mx-auto flex justify-center items-center gap-2 px-3 py-1 bg-gray-300 text-black hover:bg-gray-400 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M16.95 7.45L12 2.5L7.051 7.447H11v9.103H7.05L12 21.5l4.95-4.95H13V7.448z"
              ></path>
            </svg>
            {formattedDate}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M16.95 7.45L12 2.5L7.051 7.447H11v9.103H7.05L12 21.5l4.95-4.95H13V7.448z"
              ></path>
            </svg>
          </button>
        </td>
      </tr>

      <tr>
        <td colSpan={5}>
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: isOpen ? "auto" : 0,
              opacity: isOpen ? 1 : 0,
            }}
            transition={{ duration: 0.4 }}
            className="bg-gray-100 py-2 px-8"
            style={{
              borderRadius: "0px",
              overflow: "hidden",
            }}
          >
            {user.users && user.users.length > 0 ? (
              <div className="flex flex-col w-full">
                {user.users.map((userInfo, index) => {
                  const formattedDate = new Date(
                    userInfo.interestedAt
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
                      <div className="flex-1 px-4 font-bold">
                        {userInfo.user.firstName + " " + userInfo.user.lastName}
                      </div>

                      <div className="text-center w-[150px] px-4">
                        {formattedDate}
                      </div>

                      <div className="flex flex-col text-center w-[150px] px-4">
                        {userInfo.user.department}
                      </div>
                      <div className="flex flex-col text-center w-[150px] px-4">
                        {userInfo.user.role === "ASP"
                          ? "Genehmiger"
                          : userInfo.user.role === "admin"
                          ? "Administrator"
                          : "User"}
                      </div>
                      <div className="px-4 flex items-center w-[150px]">
                        <span
                          className={`inline-block px-3 py-1 font-base text-sm rounded-full ${
                            userInfo.user.status === "aktiv"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-200 text-red-700"
                          }`}
                        >
                          {userInfo.user.status}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="my-4 text-sm text-center text-gray-500">
                Keine Schulungshistorie vorhanden
              </p>
            )}
          </motion.div>
        </td>
      </tr>
    </>
  );
}
