import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import UserClassInterestCard from "./UserClassInterestCard";

export default function UserClassInterest() {
  const { allInterest } = useContext(AuthContext);

  console.log(allInterest)

  return (
    <div className="bg-gray-50/50 flex">
          <div className="mx-auto my-4 flex justify center max-w-[80%]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {allInterest &&
              allInterest.map((interest) => (
                <UserClassInterestCard key={interest._id} id={interest._id} interest={interest} />
              ))}
          </div>
          </div>

    </div>
  );
}