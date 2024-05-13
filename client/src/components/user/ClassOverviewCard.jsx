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

  return (
    <>
      <div className="bg-white border m-2 p-4 relative z-40 group shadow-lg">
        <div className=" absolute bg-blue-500/50 top-0 left-0 w-24 h-1 z-30  transition-all duration-200 group-hover:bg-orange-300 group-hover:w-1/2  "></div>
        <div className="space-x-4 flex justify-end mt-4 mr-4">
          <span className={spanStyle}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 mr-2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d={dPath} />
            </svg>
            {activity.status}
          </span>
        </div>
        <div className="py-2 px-9 relative  ">
          <h3 className="flex justify-center text-lg font-semibold text-black">
            {activity.registeredClassID?.title}
          </h3>
          <div className="flex justify-center mt-2 mb-1">
            <p>Ziel Gruppe</p>
          </div>
          <div className="mt-4 flex justify-center">
            {activity.registeredClassID?.department.map((dept, index) => (
              <img key={index} src={dept} className="w-12 h-12" />
            ))}
          </div>
          <p className="flex justify-center mt-4 text-base text-gray-600  ">
            {activity.registeredClassID?.description}
          </p>
          <div className="flex justify-around gap-16">
            <div className="flex flex-col">
              <p className="mt-4 text-base text-gray-600 ">
                <span className="font-bold">Kapazität:</span>{" "}
                {activity.registeredClassID?.capacity + " Teilnehmer"}
              </p>
              <p className="mt-4 text-base text-gray-600 ">
                <span className="font-bold">Datum:</span> {formattedDate}
              </p>
            </div>
            <div className="flex flex-col">
              <p className="mt-4 text-base text-gray-600 ">
                <span className="font-bold">Uhrzeit:</span>{" "}
                {activity.registeredClassID?.time}
              </p>
              <p className="mt-4 text-base text-gray-600 ">
                <span className="font-bold">Dauer:</span>{" "}
                {activity.registeredClassID?.duration + " min"}
              </p>
            </div>
            <div className="flex flex-col">
              <p className="mt-4 text-base text-gray-600 ">
                <span className="font-bold">Location:</span>{" "}
                {activity.registeredClassID?.location}
              </p>
              <p className="mt-4 text-base text-gray-600 ">
                <span className="font-bold">Lehrer:</span>{" "}
                {activity.registeredClassID?.teacher}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
