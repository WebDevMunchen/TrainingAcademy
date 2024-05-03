import { useContext } from "react";
import SideMenu from "./SideMenu";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../context/AuthProvider";
import axiosClient from "../../utils/axiosClient";

export default function CreateClass() {
  const { setAllActivities } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    axiosClient
      .post(`/classActivity/create`, data, {
        withCredentials: true,
      })
      .then((response) => {
        return axiosClient.get("/classActivity/allActivities");
      })
      .then((activitiesResponse) => {
        setAllActivities(activitiesResponse.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="bg-gray-50/50 flex">
        <SideMenu />
        <div className="flex flex-col items-center px-6 py-8 lg:py-12 mx-auto w-10/12">
          <div className="bg-white rounded-md shadow w-4/12">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Neue Schulung erstellen
              </h1>
              <form
                className="space-y-4 w-full md:space-y-6"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div>
                  <label
                    htmlFor="title"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Thema:
                  </label>
                  <input
                    {...register("title", { required: true })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Name der Schulung"
                  />
                </div>

                <div>
                  <label
                    htmlFor="description"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Beschreibung:
                  </label>
                  <textarea
                    {...register("description", { required: true })}
                    className="resize-none bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Geben Sie eine kurze Beschreibung für die Schulung ein"
                  />
                </div>

                <div className="flex justify-between">
                  <div>
                    <label
                      htmlFor="month"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Monat
                    </label>
                    <select
                      {...register("month", { required: true })}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-48 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option value="januar">Januar</option>
                      <option value="februar">Februar</option>
                      <option value="märz">März</option>
                      <option value="april">April</option>
                      <option value="mai">Mai</option>
                      <option value="juni">Juni</option>
                      <option value="juli">Juli</option>
                      <option value="august">August</option>
                      <option value="spetember">Spetember</option>
                      <option value="oktober">Oktober</option>
                      <option value="november">November</option>
                      <option value="dezember">Dezember</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="date"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Datum:
                    </label>
                    <input
                      type="date"
                      {...register("date", { required: true })}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-48 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                </div>
                <div className="flex justify-start gap-16">
                  <div>
                    <label
                      htmlFor="duration"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Dauer der Schulung:
                    </label>
                    <input
                      min={"0"}
                      type="number"
                      {...register("duration", { required: true })}
                      placeholder="In Minuten"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-48 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="time"
                      className="ml-2 pr-20 block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Uhrzeit:
                    </label>
                    <input
                      type="time"
                      {...register("time", { required: true })}
                      className="ml-2 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="flex justify-start gap-16">
                  <div>
                    <label
                      htmlFor="location"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Location:
                    </label>
                    <input
                      {...register("location", { required: true })}
                      placeholder="Ort"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-48 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="capacity"
                      className="ml-2 block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Kapazität:
                    </label>
                    <input
                      min="0"
                      type="number"
                      placeholder="0"
                      {...register("capacity", { required: true })}
                      className="ml-2 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-32 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="teacher"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Leherer:
                  </label>
                  <input
                    placeholder="Wer unterrichtet die Schulung?"
                    {...register("teacher", { required: true })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
                <div className="flex justify-center">
                  <input
                    type="submit"
                    className="bg-gradient-to-b from-gray-700 to-gray-900 font-medium p-2 mt-2 md:p-2 text-white uppercase w-1/2 rounded cursor-pointer"
                    value={"Erstellen"}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
