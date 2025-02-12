import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import UserClassInterestCard from "./UserClassInterestCard";

export default function UserClassInterest() {
  const { allInterest } = useContext(AuthContext);

  console.log(allInterest);

  return (
    <>
      <div className="text-center mx-auto max-w-3xl p-4">
      <div className="flex justify-center">
                <img
                  src="https://d2nk66epwbpimf.cloudfront.net/images/345249fd-0959-4762-bfbc-80ca4247abbb/54ad38e7-f4b4-4dc6-9e80-21e06958a192.png"
                  className="h-48"
                  alt="logo"
                />
              </div>
        <p className="text-gray-700 mt-2">
        Hier findest du eine Auswahl an möglichen Schulungen, die stattfinden können. Wenn du Interesse an einer bestimmten Schulung hast, klicke einfach auf den Button
          <span className="font-semibold"> "Eintragen" </span>,  um dein Interesse zu bekunden. Sobald genügend Interesse besteht, werden wir die Schulung offiziell ankündigen, und du kannst dich dafür anmelden."
        </p>
      </div>
      <div className="bg-gray-50/50 flex">
        <div className="mx-auto my-4 flex justify center max-w-[90%]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {allInterest &&
              allInterest.map((interest) => (
                <UserClassInterestCard
                  key={interest._id}
                  id={interest._id}
                  interest={interest}
                />
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
