import { useForm } from "react-hook-form";
import axiosClient from "../../utils/axiosClient";
import { useParams } from "react-router-dom";

export default function RegisteredUserCard({ user, activityId }) {
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    axiosClient
      .put(`/user/updateClassStatus/${user._id}`, {
        classId: id,
        newStatus: data.status,
      })
      .then((response) => {
        console.log(`Success!`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="px-4 py-1 sm:px-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            {user?.firstName + " " + user?.lastName}
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            {user?.position}
          </p>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm font-medium text-gray-500">
            Status:{" "}
            <span className="text-green-600">
              {user?.classesRegistered.map((element) => {
                if (element.registeredClassID === activityId)
                  return <>{element.status}</>;
              })}
            </span>
          </p>
        </div>

        <form className="flex gap-6" onSubmit={handleSubmit(onSubmit)}>
          <label class="cursor-pointer">
            <input
              type="radio"
              class="peer sr-only"
              value="genemight"
              {...register("status")}
            />

            <div class="w-72 mt-4 max-w-xl rounded-md bg-white p-5 text-gray-600 ring-2 ring-transparent transition-all hover:shadow peer-checked:text-sky-600 peer-checked:ring-blue-400 peer-checked:ring-offset-2">
              <div class="flex flex-col gap-1">
                <div class="flex items-center justify-between">
                  <p class="text-sm font-semibold uppercase text-gray-500">
                    Genehmigen
                  </p>
                  <div>
                    <svg width="24" height="24" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="m10.6 13.8l-2.175-2.175q-.275-.275-.675-.275t-.7.3q-.275.275-.275.7q0 .425.275.7L9.9 15.9q.275.275.7.275q.425 0 .7-.275l5.675-5.675q.275-.275.275-.675t-.3-.7q-.275-.275-.7-.275q-.425 0-.7.275ZM12 22q-2.075 0-3.9-.788q-1.825-.787-3.175-2.137q-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175q1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138q1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175q-1.35 1.35-3.175 2.137Q14.075 22 12 22Z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </label>
          <label class="cursor-pointer">
            <input
              type="radio"
              class="peer sr-only"
              value="abgelehnt"
              {...register("status")}
            />

            <div class="w-72 mt-4 max-w-xl rounded-md bg-white p-5 text-gray-600 ring-2 ring-transparent transition-all hover:shadow peer-checked:text-sky-600 peer-checked:ring-red-400 peer-checked:ring-offset-2">
              <div class="flex flex-col gap-1">
                <div class="flex items-center justify-between">
                  <p class="text-sm font-semibold uppercase text-gray-500">
                    Ablehnen
                  </p>
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </label>
          <input className="bg-gradient-to-b from-gray-700 to-gray-900 font-medium p-2 mt-2 md:p-2 text-white uppercase rounded cursor-pointer" type="submit" value={"Schicken"} />
        </form>
      </div>
    </>
  );
}
