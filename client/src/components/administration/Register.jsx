import { useForm } from "react-hook-form";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import SideMenu from "./SideMenu";

export default function Register() {
  const { signup } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    signup(data);
  };

  return (
    <>
      <div className="bg-gray-50/50 flex">
        <SideMenu />
        <div className="flex flex-col items-center px-0 py-8 lg:py-12 lg:px-6 mx-auto w-10/12">
          <div className="bg-white rounded-md shadow w-full lg:w-4/12">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Benutzerkonto erstellen
              </h1>
              <form
                className="space-y-4 w-full md:space-y-6"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="flex flex-col lg:flex-row justify-around gap-2">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Vorname:
                    </label>
                    <input
                      {...register("firstName", { required: true })}
                      placeholder="Max"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-56 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="lastName"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Nachname:
                    </label>
                    <input
                      {...register("lastName", { required: true })}
                      placeholder="Musterman"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-56 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                </div>
                <div className="flex flex-col lg:flex-row justify-around gap-2">
                  <div>
                    <label
                      htmlFor="logID"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Kürzel:
                    </label>
                    <input
                      {...register("logID", { required: true })}
                      type="input"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-56 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Drei Zeichen lang"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="department"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Abteilung:
                    </label>
                    <select
                      {...register("department", {
                        required: true,
                      })}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-56 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option value={"logistik"}>Logistik</option>
                      <option value={"vertrieb"}>Vertrieb</option>
                      <option value={"IT & Services"}>IT & Services</option>
                      <option value={"fuhrpark"}>Fuhrpark</option>
                      <option value={"HR & Training"}>HR & Training</option>
                      <option value={"buchhaltung"}>Buchhaltung</option>
                      <option value={"einkauf"}>Einkauf & Anmietung</option>
                      <option value={"design & Planung"}>Design & Planung</option>
                      <option value={"projektmanagement"}>
                        Projektmanagement
                      </option>
                      <option value={"officemanagement"}>
                        Office Management
                      </option>
                    </select>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Kennwort:
                  </label>
                  <input
                    {...register("password", { required: true })}
                    type="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-56 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 lg:w-full"
                  />
                </div>
                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="bg-gradient-to-b from-gray-700 to-gray-900 font-medium p-2 mt-2 md:p-2 text-white uppercase w-1/2 rounded cursor-pointer hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
                  >
                    Registrieren
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
