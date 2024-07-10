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

  const aspLogistik = import.meta.env.VITE_APP_LOGISTIK;
  const aspVertrieb = import.meta.env.VITE_APP_VERTRIEB;
  const aspIT = import.meta.env.VITE_APP_IT;
  const aspFuhrpark = import.meta.env.VITE_APP_FUHRPARK;
  const aspBuchhaltung = import.meta.env.VITE_APP_BUCHHALTUNG;
  const aspEinkauf = import.meta.env.VITE_APP_EINKAUF;
  const aspDesign = import.meta.env.VITE_APP_DESIGN;
  const aspProjektmanagement = import.meta.env.VITE_APP_PROJEKTMANAGEMENT;
  const aspOfficemanagement = import.meta.env.VITE_APP_OFFICEMANAGEMENT;
  const aspHR = import.meta.env.VITE_APP_HR;

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
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-56 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 lg:w-full"
                    placeholder="Drei Zeichen lang"
                  />
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

                <div className="flex flex-col lg:flex-row justify-around gap-2">
                  <div>
                    <label
                      htmlFor="department"
                      className="block mb-3 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Abteilung:
                    </label>
                    <input
                      {...register("department", { required: true })}
                      type="text"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-56 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Abteilung des Mitarbeiters"
                    />
                  </div>
                  <div>
                    <div className="flex justify-start">
                      <label
                        htmlFor="userContactInformation"
                        className="block mb-3 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Genehmiger*in:
                      </label>
                      <div
                        className="tooltip ml-2 hover:cursor-pointer"
                        data-tip="Für jede Abteilung ist eine E-Mail-Adresse des Genehmigers (Ansprechpartners) hinterlegt. Diese E-Mail-Adresse wird verwendet, um eine E-Mail an den Genehmiger zu senden, der entscheidet, ob der Mitarbeiter an der Schulung teilnehmen darf"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6 hover:text-blue-500"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                          />
                        </svg>
                      </div>
                    </div>

                    <select
                      {...register("userContactInformation", {
                        required: true,
                      })}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-56 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option value={aspLogistik}>Logistik</option>
                      <option value={aspVertrieb}>Vertrieb</option>
                      <option value={aspIT}>IT & Services</option>
                      <option value={aspFuhrpark}>Fuhrpark</option>
                      <option value={aspHR}>HR & Training</option>
                      <option value={aspBuchhaltung}>Buchhaltung</option>
                      <option value={aspEinkauf}>Einkauf & Anmietung</option>
                      <option value={aspDesign}>Design & Planung</option>
                      <option value={aspProjektmanagement}>
                        Projektmanagement
                      </option>
                      <option value={aspOfficemanagement}>
                        Office Management
                      </option>
                    </select>
                  </div>
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
