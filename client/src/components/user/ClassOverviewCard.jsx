export default function ClassesOverviewCard({ activity }) {
  const dateString = activity?.registeredClassID?.date;
  const date = new Date(dateString);

  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const formattedDate = `${day}/${month}/${year}`;

  let dPath = "";
  let dPath2 = "";
  let spanStyle = "";

  if (activity?.status === "abgelehnt") {
    spanStyle =
      "inline-flex items-center bg-red-600 rounded-full px-2 text-sm text-white py-1 font-medium";
    dPath = "M8 9.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z";
    dPath2 =
      "M8 0a8 8 0 100 16A8 8 0 008 0zM1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0z";
  } else if (activity?.status === "genemight") {
    spanStyle =
      "inline-flex items-center bg-green-600 rounded-full px-2 text-sm text-white py-1 font-medium";
    dPath =
      "M11.28 6.78a.75.75 0 00-1.06-1.06L7.25 8.69 5.78 7.22a.75.75 0 00-1.06 1.06l2 2a.75.75 0 001.06 0l3.5-3.5z";
    dPath2 =
      "M16 8A8 8 0 110 8a8 8 0 0116 0zm-1.5 0a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z";
  } else {
    spanStyle =
      "inline-flex items-center bg-gray-500 rounded-full px-2 text-sm text-white py-1 font-medium";
    dPath =
      "M6.749.097a8.054 8.054 0 012.502 0 .75.75 0 11-.233 1.482 6.554 6.554 0 00-2.036 0A.75.75 0 016.749.097zM4.345 1.693A.75.75 0 014.18 2.74a6.542 6.542 0 00-1.44 1.44.75.75 0 01-1.212-.883 8.042 8.042 0 011.769-1.77.75.75 0 011.048.166zm7.31 0a.75.75 0 011.048-.165 8.04 8.04 0 011.77 1.769.75.75 0 11-1.214.883 6.542 6.542 0 00-1.439-1.44.75.75 0 01-.165-1.047zM.955 6.125a.75.75 0 01.624.857 6.554 6.554 0 000 2.036.75.75 0 01-1.482.233 8.054 8.054 0 010-2.502.75.75 0 01.858-.624zm14.09 0a.75.75 0 01.858.624 8.057 8.057 0 010 2.502.75.75 0 01-1.482-.233 6.55 6.55 0 000-2.036.75.75 0 01.624-.857zm-13.352 5.53a.75.75 0 011.048.165 6.542 6.542 0 001.439 1.44.75.75 0 01-.883 1.212 8.04 8.04 0 01-1.77-1.769.75.75 0 01.166-1.048zm12.614 0a.75.75 0 01.165 1.048 8.038 8.038 0 01-1.769 1.77.75.75 0 11-.883-1.214 6.543 6.543 0 001.44-1.439.75.75 0 011.047-.165zm-8.182 3.39a.75.75 0 01.857-.624 6.55 6.55 0 002.036 0 .75.75 0 01.233 1.482 8.057 8.057 0 01-2.502 0 .75.75 0 01-.624-.858z";
    dPath2 =
      "M16 8A8 8 0 110 8a8 8 0 0116 0zm-1.5 0a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z";
  }

  return (
    <>
      <div className="transition-all  duration-1000 bg-white hover:bg-blue-500  hover:shadow-xl m-2 p-4 relative z-40 group  ">
        <div className=" absolute  bg-blue-500/50 top-0 left-0 w-24 h-1 z-30  transition-all duration-200   group-hover:bg-white group-hover:w-1/2  "></div>
        <div className="py-2 px-9 relative  ">
          <h3 className="flex justify-center text-lg font-semibold text-black group-hover:text-white ">
            {activity?.title}
          </h3>
          <div className="mt-4 flex justify-center">
            {activity?.registeredClassID?.department?.map((dept, index) => (
              <p
                key={index}
                className="text-base text-gray-600 group-hover:text-white"
              >
                {dept}
              </p>
            ))}
          </div>
          <p className="flex justify-center mt-4 text-base text-gray-600 group-hover:text-white  ">
            {activity?.registeredClassID?.description}
          </p>
          <div className="flex justify-around gap-16">
            <div className="flex flex-col">
              <p className="mt-4 text-base text-gray-600 group-hover:text-white">
                <span className="font-bold">Kapazität:</span>{" "}
                {activity?.registeredClassID?.capacity + " Teilnehmer"}
              </p>
              <p className="mt-4 text-base text-gray-600 group-hover:text-white">
                <span className="font-bold">Datum:</span> {formattedDate}
              </p>
            </div>
            <div className="flex flex-col">
              <p className="mt-4 text-base text-gray-600 group-hover:text-white">
                <span className="font-bold">Uhrzeit:</span>{" "}
                {activity?.registeredClassID?.time}
              </p>
              <p className="mt-4 text-base text-gray-600 group-hover:text-white">
                <span className="font-bold">Dauer:</span>{" "}
                {activity?.registeredClassID?.duration + " min"}
              </p>
            </div>
            <div className="flex flex-col">
              <p className="mt-4 text-base text-gray-600 group-hover:text-white">
                <span className="font-bold">Location:</span>{" "}
                {activity?.registeredClassID?.location}
              </p>
              <p className="mt-4 text-base text-gray-600 group-hover:text-white">
                <span className="font-bold">Lehrer:</span>{" "}
                {activity?.registeredClassID?.teacher}
              </p>
            </div>
            <div className="space-x-4">
              <span className={spanStyle}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="fill-current mr-1.5 text-white"
                  viewBox="0 0 16 16"
                  width="16"
                  height="16"
                >
                  <path d={dPath}></path>
                  <path fillRule="evenodd" d={dPath2}></path>
                </svg>
                {activity?.status}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
