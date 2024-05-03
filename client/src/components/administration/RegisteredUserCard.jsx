import { useForm } from "react-hook-form";
import axiosClient from "../../utils/axiosClient";
import { useParams } from "react-router-dom";

export default function RegisteredUserCard({ user, activityId }) {
  const { id } = useParams();

  const approve = (status) => {
    axiosClient
      .put(`/user/updateClassStatus/${user._id}`, {
        classId: id,
        newStatus: status,
      })
      .then((response) => {
        return (
          axiosClient.put(`/classActivity/increaseClassCapacity/${id}`),
          console.log("Slot increased")
        );
      })
      .then((response) => {
        console.log(`Slot increased and status changed!`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const decline = (status) => {
    axiosClient
      .put(`/user/updateClassStatus/${user._id}`, {
        classId: id,
        newStatus: status,
      })
      .then((response) => {
        return (
          axiosClient.put(`/classActivity/decreaseClassCapacity/${id}`),
          console.log("Slot decreased")
        );
      })
      .then((response) => {
        console.log(`Slot decreased and status changed!`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleApproved = (e) => {
    if (e.target.checked) {
      const status = e.target.value;
      approve(status);
    }
  };

  const handleDeclined = (e) => {
    if (e.target.checked) {
      const status = e.target.value;
      decline(status);
    }
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
      </div>
      <div className="flex gap-4">
        <label class="cursor-pointer">
          <input
            onChange={handleApproved}
            type="radio"
            class="peer sr-only"
            value="genehmigt"
          />
          <div class="w-72 mt-4 max-w-xl rounded-md bg-white p-5 text-gray-600 ring-2 ring-transparent transition-all hover:bg-slate-200 peer-checked:text-sky-600 hover:ring-blue-400 peer-checked:ring-offset-2">
            <div class="flex flex-col gap-1">
              <div class="flex items-center justify-between">
                <p class="text-sm font-semibold uppercase text-gray-500">
                  Genehmigen
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
                      d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </label>

        <label class="cursor-pointer">
          <input
            onChange={handleDeclined}
            type="radio"
            class="peer sr-only"
            value="abgelehnt"
          />
          <div class="w-72 mt-4 max-w-xl rounded-md bg-white p-5 text-gray-600 ring-2 ring-transparent transition-all hover:bg-slate-200 peer-checked:text-sky-600 hover:ring-red-400 peer-checked:ring-offset-2">
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
      </div>
    </>
  );
}
