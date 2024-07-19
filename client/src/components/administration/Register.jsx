import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import SideMenu from "./SideMenu";
import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Register() {
  const { signup } = useContext(AuthContext);
  const [generatedPassword, setGeneratedPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
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
        notifyCopied();
      })
      .catch((err) => {});
  };

  const notifyCopied = () =>
    toast.success("Kennwort in die Zwischenablage kopiert!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      className: "mt-14 mr-6",
    });

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
                      <option value={"design & Planung"}>
                        Design & Planung
                      </option>
                      <option value={"projektmanagement"}>
                        Projektmanagement
                      </option>
                      <option value={"officemanagement"}>
                        Office Management
                      </option>
                    </select>
                  </div>
                </div>
                <div className="relative flex flex-col lg:flex-row justify-between gap-2">
                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Kennwort:
                    </label>
                    <div className="flex items-center gap-1">
                      <input
                        {...register("password", { required: true })}
                        type={passwordVisible ? "text" : "password"}
                        placeholder="••••••••"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-38 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={generatedPassword}
                      />
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
                    </div>
                  </div>
                  <div className="flex items-center mt-3">
                    <button
                      className="bg-gradient-to-b from-blue-400 to-blue-800 font-medium p-2 mt-2 md:p-2 text-white uppercase rounded cursor-pointer hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
                      type="button"
                      onClick={generatePassword}
                    >
                      Kennwort generieren
                    </button>
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
