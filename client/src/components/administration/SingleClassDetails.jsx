import { useEffect, useState } from "react";
import axiosClient from "../../utils/axiosClient";
import { useParams } from "react-router-dom";
import RegisterdUserCard from "./RegisteredUserCard"

export default function SingleClassDetails() {
  const { id } = useParams();

  const [activity, setActivity] = useState(null);

  useEffect(() => {
    axiosClient
      .get(`/classActivity/${id}`)
      .then((response) => {
        setActivity(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      {!activity ? (
        <p>Loading</p>
      ) : (
        <>
          {activity.registeredUsers.map((registeredUser) => {
            return (
              <ul key={registeredUser._id} className="w-6/12 bg-white shadow overflow-hidden sm:rounded-md mx-auto mt-16">
                <li>
                <RegisterdUserCard
                  
                  user={registeredUser}
                  activityId = {id}
                />
                </li>
              </ul>
            );
          })}
        </>
      )}
    </>
  );
}
