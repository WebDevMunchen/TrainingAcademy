export default function ClassesOverviewCard({ activity }) {
  const dateString = activity?.registeredClassID?.date;
  const date = new Date(dateString);

  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const formattedDate = `${day}/${month}/${year}`;

  let dPath = "";
  let spanStyle = "";

  if (activity.status === "abgelehnt") {
    spanStyle =
      "inline-flex items-center bg-red-600 rounded-full px-3 text-sm text-white py-1 font-medium";
    dPath =
      "m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z";
  } else if (activity.status === "genehmigt") {
    spanStyle =
      "inline-flex items-center bg-green-600 rounded-full px-3 text-sm text-white py-1 font-medium";
    dPath = "M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z";
  } else {
    spanStyle =
      "inline-flex items-center bg-orange-500 rounded-full px-3 text-sm text-white py-1 font-medium";
    dPath =
      "M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z";
  }

  let dPath2 = "";
  let spanStyle2 = "";

  if (activity.statusAttended === "nicht teilgenommen") {
    spanStyle2 =
      "inline-flex items-center bg-red-600 rounded-full px-3 text-sm text-white py-1 font-medium";
    dPath2 =
      "m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z";
  } else if (activity.statusAttended === "teilgenommen") {
    spanStyle2 =
      "inline-flex items-center bg-green-600 rounded-full px-3 text-sm text-white py-1 font-medium";
    dPath2 = "M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z";
  } else if (activity.status === "abgelehnt") {
    spanStyle2 =
      "inline-flex items-center bg-slate-400 rounded-full px-4 py-1.5 text-sm text-white py-1 font-medium";
  } else {
    spanStyle2 =
      "inline-flex items-center bg-orange-500 rounded-full px-3 text-sm text-white py-1 font-medium";
    dPath2 =
      "M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z";
  }

  const showLegend = () => {
    document.getElementById("legend").showModal();
  };

  return (
    <>
      <div className="bg-white border m-2 p-4 relative group shadow-lg">
        <div className="absolute bg-blue-500/50 top-0 left-0 w-24 h-1 transition-all duration-200 group-hover:bg-orange-300 group-hover:w-1/2  "></div>
        <div className="flex justify-center lg:justify-between px-6 mt-4 mr-4 items-center ">
          <div className="flex flex-col items-center">
            <span className="mr-2 mb-1 text-md font-semibold text-gray-900 hidden lg:inline">
              Teilnahmestatus:{" "}
            </span>
            {activity.status === "abgelehnt" ? (
              <span className={spanStyle2}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-5.5 mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                  />
                </svg>
                nicht angemeldet
              </span>
            ) : (
              <span className={spanStyle2}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d={dPath2}
                  />
                </svg>
                {activity.statusAttended}
              </span>
            )}
          </div>
          <div className="flex flex-col items-center">
            <span className="mr-2 mb-1 text-md font-semibold text-gray-900 hidden lg:inline">
              Genehmigungsstatus:{" "}
            </span>
            <div className="flex items-center">
              {activity.status === "abgelehnt" && (
                <span
                  className="tooltip mr-2 hover:cursor-pointer"
                  style={{ width: "auto", height: "auto" }}
                  data-tip={
                    /^[^a-zA-Z]*$/.test(activity.reason)
                      ? "Kein Grund vorhanden"
                      : activity.reason
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

              <span className={spanStyle}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d={dPath}
                  />
                </svg>
                {activity.status}
              </span>
            </div>
          </div>
        </div>
        <div className="py-2 relative">
          <h3 className="flex justify-center text-lg font-semibold text-black">
            {activity.registeredClassID?.title}
          </h3>
          <div className="flex justify-center mt-2 mb-1">
            <p>Zielgruppe</p>
          </div>
          <div className="mt-4 flex justify-center">
            {activity.registeredClassID?.department.map((dept, index) => (
              <img key={index} src={dept} className="w-12 h-12" />
            ))}
          </div>
          <div className="flex items-center justify-center">
            <button
              onClick={showLegend}
              className="font-medium text-blue-600 text-center transition-transform duration-300 transform hover:scale-125 mx-auto mt-1"
            >
              Legende
            </button>
          </div>
          <dialog id="legend" className="modal">
            <div className="modal-box w-full max-w-5xl">
              <h2 className="text-center font-anek font-semibold text-4xl">
                Legende
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 p-3">
                <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 flex flex-col items-center">
                  <img
                    className="w-20 mx-auto"
                    src="https://res.cloudinary.com/dtrymbvrp/image/upload/v1715088433/symbols/hczkglpvaybhguywjgku.png"
                    alt="alle"
                  />
                  <p className="font-anek font-medium text-center text-lg">
                    Alle
                  </p>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 flex flex-col items-center">
                  <img
                    src="https://res.cloudinary.com/dtrymbvrp/image/upload/v1715088434/symbols/ng4emaukxn9adrxpnvlu.png"
                    alt="Vertrieb"
                    className="w-20 mx-auto"
                  />
                  <p className="font-anek font-medium text-center text-lg">
                    Vertrieb
                  </p>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 flex flex-col items-center">
                  <img
                    src="https://res.cloudinary.com/dtrymbvrp/image/upload/v1715088434/symbols/o4qwfioe3dkqrkhmumd4.png"
                    alt="Logistik"
                    className="w-20 mx-auto"
                  />
                  <p className="font-anek font-medium text-center text-lg">
                    Logistik
                  </p>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 flex flex-col items-center">
                  <img
                    src="https://res.cloudinary.com/dtrymbvrp/image/upload/v1715088434/symbols/uaozccdgnwtcelxvqjug.png"
                    alt="Fuhrpark"
                    className="w-20 mx-auto"
                  />
                  <p className="font-anek font-medium text-center text-lg">
                    Fuhrpark
                  </p>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 flex flex-col items-center">
                  <img
                    src="https://res.cloudinary.com/dtrymbvrp/image/upload/v1715088434/symbols/ke8amlflgcdrvdfghzoz.png"
                    alt="IT & Services"
                    className="w-20 mx-auto"
                  />
                  <p className="font-anek font-medium text-center text-lg">
                    IT & Services
                  </p>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 flex flex-col items-center">
                  <img
                    src="https://res.cloudinary.com/dtrymbvrp/image/upload/v1715088433/symbols/gmnv44k0nydrmfnbr67y.png"
                    alt="HR & Training"
                    className="w-20 mx-auto"
                  />
                  <p className="font-anek font-medium text-center text-lg">
                    HR & Training
                  </p>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 flex flex-col items-center">
                  <img
                    src="https://res.cloudinary.com/dtrymbvrp/image/upload/v1715088433/symbols/ip7khvjx1dgxosk6lxnb.png"
                    alt="Buchhaltung"
                    className="w-20 mx-auto"
                  />
                  <p className="font-anek font-medium text-center text-lg">
                    Buchhaltung
                  </p>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 flex flex-col items-center">
                  <img
                    src="https://res.cloudinary.com/dtrymbvrp/image/upload/v1715088434/symbols/ydkcdshvmwdffe4tyf9f.png"
                    alt="item8"
                    className="w-20 mx-auto"
                  />
                  <p className="font-anek font-medium text-center text-lg">
                    Einkauf & Anmietung
                  </p>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 flex flex-col items-center">
                  <img
                    src="https://res.cloudinary.com/dtrymbvrp/image/upload/v1715088433/symbols/wodezi58z28wwhcvhsev.png"
                    alt="Design & Planung"
                    className="w-20 mx-auto"
                  />
                  <p className="font-anek font-medium text-center text-lg">
                    Design & Planung
                  </p>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 flex flex-col items-center">
                  <img
                    src="https://res.cloudinary.com/dtrymbvrp/image/upload/v1715088434/symbols/ikluglsekc6msbuvgn0z.png"
                    alt="Projektmanagement"
                    className="w-20 mx-auto"
                  />
                  <p className="font-anek font-medium text-center text-lg">
                    Projektmanagement
                  </p>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 flex flex-col items-center">
                  <img
                    src="https://res.cloudinary.com/dtrymbvrp/image/upload/v1715088434/symbols/p0m4tdmsd5qdmysdzolk.png"
                    alt="Officemanagement"
                    className="w-20 mx-auto"
                  />
                  <p className="font-anek font-medium text-center text-lg">
                    Officemanagement
                  </p>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 flex flex-col items-center">
                  <img
                    src="https://res.cloudinary.com/dtrymbvrp/image/upload/v1715088433/symbols/l85s2hjejj6kzkzung8o.png"
                    alt="Gesundheitsmanagement"
                    className="w-20 mx-auto"
                  />
                  <p className="font-anek font-medium text-center text-lg">
                    Gesundheitsmanagement
                  </p>
                </div>
              </div>
              <div className="modal-action flex justify-center">
                <form method="dialog" className="flex gap-2">
                  <button className="btn w-28">Schließen</button>
                </form>
              </div>
            </div>
          </dialog>
          <p className="text-center lg:flex justify-center mt-2 text-base text-gray-600">
            {activity.registeredClassID?.description}
          </p>
          <div className="grid grid-cols-3 grid-rows-1 text-center lg:text-left justify-items-center">
            <div className="flex flex-col mr-2">
              <p className="mt-4 text-base text-gray-600 lg:hidden">
                <span className="font-bold">Kapazität:</span>{" "}
                {activity.registeredClassID?.capacity + " Teilneh."}
              </p>
              <p className="hidden lg:inline mt-4 text-base text-gray-600">
                <span className="font-bold">Kapazität:</span>{" "}
                {activity.registeredClassID?.capacity + " Teilnehmer"}
              </p>
              <p className="mt-4 text-base text-gray-600 ">
                <span className="font-bold">Datum:</span> {formattedDate}
              </p>
            </div>
            <div className="flex flex-col mr-2">
              <p className="mt-4 text-base text-gray-600 ">
                <span className="font-bold">Uhrzeit:</span>{" "}
                {activity.registeredClassID?.time}
              </p>
              <p className="mt-4 text-base text-gray-600 lg:hidden">
                <span className="font-bold">Dauer:</span> <br />
                {activity.registeredClassID?.duration + " Min."}
              </p>
              <p className="hidden lg:inline mt-4 text-base text-gray-600">
                <span className="font-bold">Dauer:</span>{" "}
                {activity.registeredClassID?.duration + " Min."}
              </p>
            </div>
            <div className="flex flex-col mr-2">
              <p className="mt-4 text-base text-gray-600 ">
                <span className="font-bold">Location:</span>{" "}
                {activity.registeredClassID?.location}
              </p>
              <p className="mt-4 text-base text-gray-600 ">
                <span className="font-bold">Referent*in:</span>{" "}
                {activity.registeredClassID?.teacher}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
