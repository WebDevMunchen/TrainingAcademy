import React from "react";

const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleString("de-DE", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};


export default function MessagesSide({ message, onClick, selected }) {
  return (
    <>

    <li
      className={`py-5 border-y px-3 border-slate-300 transition hover:bg-indigo-100 hover:cursor-pointer ${
        selected
          ? "bg-blue-200"
          : message?.status === "read"
          ? "font-normal bg-white"
          : "font-semibold bg-slate-200"
      }`}
      onClick={onClick}
    >
      <div className="flex justify-between items-center">
        <h3
          className={`text-lg ${
            message?.status === "read" ? "font-medium" : "font-bold"
          }`}
        >
          {message?.messageID?.messageTitle || "No Title"}
        </h3>
        <p
          className={`text-md text-gray-400 ${
            message?.status === "read" ? "font-normal" : "font-semibold"
          }`}
        >
          {formatDate(message?.messageID?.timeStamp) || "No Date"}
        </p>
      </div>
      <div
        className={`text-md italic text-gray-400 ${
          message?.status === "read" ? "font-normal" : "font-semibold"
        }`}
      >
        {message?.messageID?.messageType || "No Type"}
      </div>
    </li>
    </>

  );
}
