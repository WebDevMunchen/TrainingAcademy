import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import SideMenu from "./SideMenu";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Register() {
  const { signup } = useContext(AuthContext);

  const [generatedPassword, setGeneratedPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState("user");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm();

  const onSubmit = (data) => {
    signup(data);
  };

  const generateRandomString = (length) => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charactersLength);
      result += characters[randomIndex];
    }
    return result;
  };

  const handleTooltipToggle = () => {
    setIsTooltipVisible(!isTooltipVisible);
  };

  const generatePassword = () => {
    const randomString = generateRandomString(8);
    setGeneratedPassword(randomString);
    setValue("password", randomString);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(generatedPassword)
      .then(() => {
        toast.success("Kennwort in die Zwischenablage kopiert!");
      })
      .catch((err) => {});
  };

  const password = watch("password", "");

  return (
    <>
      <div className="bg-gray-50/50 flex">
        <SideMenu />
        <div className="flex flex-col items-center px-0 py-8 lg:py-12 lg:px-6 mx-auto w-10/12">
          <div className="bg-white rounded-md shadow w-full lg:w-6/12">
            <div className="p-5 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Benutzerkonto erstellen
              </h1>
              <form
                className="space-y-4 w-full md:space-y-6"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="flex flex-col lg:flex-row justify-between gap-2">
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
                      className="w-full bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 lg:w-80"
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
                      className="w-full bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-80 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 lg:w-80"
                    />
                  </div>
                </div>
                <div className="flex flex-col lg:flex-row justify-between gap-2">
                  <div>
                    <label
                      htmlFor="logID"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Kürzel:
                    </label>
                    <input
                      {...register("logID", { required: true, maxLength: 3 })}
                      type="input"
                      maxLength={3}
                      className="w-full bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 lg:w-80"
                      placeholder="Drei Zeichen lang"
                    />
                  </div>
                  <div className="my-1 lg:my-0">
                    <div className="flex">
                      <label
                        htmlFor="password"
                        className="block mb-2 mr-1 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Kennwort:
                      </label>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6 cursor-pointer transition-transform duration-300 transform hover:scale-125 hover:text-blue-600"
                        onClick={togglePasswordVisibility}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        />
                      </svg>

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6 cursor-pointer transition-transform duration-300 transform hover:scale-125 hover:text-blue-600"
                        onClick={copyToClipboard}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"
                        />
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6 cursor-pointer transition-transform duration-300 transform hover:scale-125 hover:text-blue-600"
                        onClick={generatePassword}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z"
                        />
                      </svg>
                    </div>

                    <div className="flex items-center gap-1">
                      <input
                        {...register("password", { required: true })}
                        type={passwordVisible ? "text" : "password"}
                        placeholder="••••••••"
                        className="w-full bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 lg:w-80"
                        value={password}
                        onChange={(e) => {
                          setGeneratedPassword(e.target.value);
                          setValue("password", e.target.value);
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col lg:flex-row justify-between gap-2">
                  <div>
                    <div className="flex">
                      <label
                        htmlFor="department"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Abteilung
                      </label>
                      <div className="relative">
                        <div
                          className="tooltip ml-2 hover:cursor-pointer"
                          onClick={handleTooltipToggle}
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
                        {isTooltipVisible && (
                          <div className="absolute bg-gray-700 text-white text-sm p-4 rounded shadow-lg w-72 z-50">
                            Für jede Abteilung sind die E-Mail-Adressen des ASPs
                            und seines Stellvertreters hinterlegt. Diese
                            E-Mail-Adressen werden verwendet, um eine E-Mail an
                            sie zu senden, damit sie entscheiden können, ob der
                            Mitarbeiter an der Schulung teilnehmen darf.
                          </div>
                        )}
                      </div>
                    </div>

                    <select
                      {...register("department", { required: true })}
                      className="w-full bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 lg:w-80"
                    >
                      <option value="Vertrieb">Vertrieb</option>
                      <option value="Logistik">Logistik</option>
                      <option value="Fuhrpark">Fuhrpark</option>
                      <option value="IT & Services">IT & Services</option>
                      <option value="HR & Training">HR & Training</option>
                      <option value="Buchhaltung">Buchhaltung</option>
                      <option value="Showroom">Showroom</option>
                      <option value="Design & Marketing">
                        Design & Marketing
                      </option>
                      <option value="Bestandsmanagement">
                        Bestandsmanagement
                      </option>
                      <option value="Haustechnik">Haustechnik</option>
                      <option value="Unternehmensentwicklung">
                        Unternehmensentwicklung
                      </option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="role"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Rolle:
                    </label>

                    <select
                      {...register("role", { required: true })}
                      className="w-full bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-80 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 lg:w-80"
                      onChange={(e) => setSelectedDepartment(e.target.value)}
                    >
                      <option value="user">User</option>
                      <option value="ASP">Genehmiger*in</option>
                      <option value="teacher">Referent*in</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                </div>

                {selectedDepartment === "ASP" && (
                  <div>
                    <div className="flex justify-start">
                      <label
                        htmlFor="department"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Zuständige Abteilungen:
                      </label>
                    </div>
                    <div className="grid gap-x-4 grid-cols-2 grid-rows-6 lg:grid-cols-3 lg:grid-rows-4">
                      <label className="text-sm flex items-center lg:text-md">
                        <input
                          type="checkbox"
                          {...register("additionalDepartments", {
                            required: true,
                          })}
                          value="Logistik"
                          className="h-4 w-4 mr-1 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                        />
                        Logistik
                      </label>

                      <label className="text-sm flex items-center lg:text-md">
                        <input
                          type="checkbox"
                          {...register("additionalDepartments", {
                            required: true,
                          })}
                          value="Vertrieb"
                          className="h-4 w-4 mr-1 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                        />
                        Vertrieb
                      </label>

                      <label className="text-sm flex items-center lg:text-md">
                        <input
                          type="checkbox"
                          {...register("additionalDepartments", {
                            required: true,
                          })}
                          value="IT & Services"
                          className="h-4 w-4 mr-1 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                        />
                        IT & Services
                      </label>

                      <label className="text-sm flex items-center lg:text-md">
                        <input
                          type="checkbox"
                          {...register("additionalDepartments", {
                            required: true,
                          })}
                          value="Fuhrpark"
                          className="h-4 w-4 mr-1 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                        />
                        Fuhrpark
                      </label>

                      <label className="text-sm flex items-center lg:text-md">
                        <input
                          type="checkbox"
                          {...register("additionalDepartments", {
                            required: true,
                          })}
                          value="HR & Training"
                          className="h-4 w-4 mr-1 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                        />
                        HR & Training
                      </label>

                      <label className="text-sm flex items-center lg:text-md">
                        <input
                          type="checkbox"
                          {...register("additionalDepartments", {
                            required: true,
                          })}
                          value="Buchhaltung"
                          className="h-4 w-4 mr-1 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                        />
                        Buchhaltung
                      </label>

                      <label className="text-sm flex items-center lg:text-md">
                        <input
                          type="checkbox"
                          {...register("additionalDepartments", {
                            required: true,
                          })}
                          value="Showroom"
                          className="h-4 w-4 mr-1 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                        />
                        Showroom
                      </label>

                      <label className="hidden lg:inline text-sm flex items-center lg:text-md">
                        <input
                          type="checkbox"
                          {...register("additionalDepartments", {
                            required: true,
                          })}
                          value="Design & Marketing"
                          className="h-4 w-4 mr-1 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                        />
                        Design & Marketing
                      </label>
                      <label className="text-sm flex items-center lg:hidden">
                        <input
                          type="checkbox"
                          {...register("additionalDepartments", {
                            required: true,
                          })}
                          value="Design & Marketing"
                          className="h-4 w-4 mr-1 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                        />
                        Design & Mark.
                      </label>

                      <label className="hidden lg:inline text-sm flex items-center lg:text-md">
                        <input
                          type="checkbox"
                          {...register("additionalDepartments", {
                            required: true,
                          })}
                          value="Bestandsmanagement"
                          className="h-4 w-4 mr-1 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                        />
                        Bestandsmanagement
                      </label>
                      <label className="text-sm flex items-center lg:hidden">
                        <input
                          type="checkbox"
                          {...register("additionalDepartments", {
                            required: true,
                          })}
                          value="Bestandsmanagement"
                          className="h-4 w-4 mr-1 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                        />
                        Bestandsmanag.
                      </label>

                      <label className="text-sm flex items-center lg:text-md">
                        <input
                          type="checkbox"
                          {...register("additionalDepartments", {
                            required: true,
                          })}
                          value="Haustechnik"
                          className="h-4 w-4 mr-1 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                        />
                        Haustechnik
                      </label>

                      <label className="text-sm flex items-center lg:text-md">
                        <input
                          type="checkbox"
                          {...register("additionalDepartments", {
                            required: true,
                          })}
                          value="Unternehmensentwicklung"
                          className="h-4 w-4 mr-1 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                        />
                        Unternehmensentwicklung
                      </label>
                    </div>
                  </div>
                )}

                <div className="flex flex-col lg:flex-row justify-between gap-2"></div>

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
