import { useForm } from "react-hook-form";
import SideMenu from "./SideMenu";
import axiosClient from "../../utils/axiosClient";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import { useContext } from "react";

export default function ApproverList() {
  const { approver } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    axiosClient
      .put(`/approver/update/668e958729a4cd5bb513f562`, data, {
        withCredentials: true,
      })
      .then((response) => {
        console.log("success");
      })

      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="bg-gray-50/50 flex">
        <SideMenu />
        <div className="flex flex-col items-center px-0 py-8 lg:py-12 lg:px-6 mx-auto w-10/12">
          <div className="bg-white rounded-md shadow w-full lg:w-5/12">
            <div className="p-6 space-y-4 md:space-y-8 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Genehmigerliste
              </h1>
              <form
                className="space-y-4 w-full md:space-y-7"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="flex flex-col lg:flex-row justify-around gap-2">
                  <div>
                    <label
                      htmlFor="logistik"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Logistik:
                    </label>
                    <input
                      {...register("logistik", { required: true })}
                      defaultValue={approver[0].logistik}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-56 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="vertrieb"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Vertrieb:
                    </label>
                    <input
                      {...register("vertrieb", { required: true })}
                      placeholder="tbd"
                      defaultValue={approver[0].vertrieb}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-56 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                </div>
                <div className="flex flex-col lg:flex-row justify-around gap-2">
                  <div>
                    <label
                      htmlFor="hr"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      HR:
                    </label>
                    <input
                      {...register("hr", { required: true })}
                      defaultValue={approver[0].hr}
                      placeholder="tbd"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-56 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="it"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      IT & Services:
                    </label>
                    <input
                      {...register("it", { required: true })}
                      defaultValue={approver[0].it}
                      placeholder="tbd"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-56 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                </div>
                <div className="flex flex-col lg:flex-row justify-around gap-2">
                  <div>
                    <label
                      htmlFor="fuhrpark"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Fuhrpark:
                    </label>
                    <input
                      {...register("fuhrpark", { required: true })}
                      defaultValue={approver[0].fuhrpark}
                      placeholder="tbd"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-56 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="buchhaltung"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Buchhaltung:
                    </label>
                    <input
                      {...register("buchhaltung", { required: true })}
                      defaultValue={approver[0].buchhaltung}
                      placeholder="tbd"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-56 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                </div>
                <div className="flex flex-col lg:flex-row justify-around gap-2">
                  <div>
                    <label
                      htmlFor="einkauf"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Einkauf:
                    </label>
                    <input
                      {...register("einkauf", { required: true })}
                      defaultValue={approver[0].einkauf}
                      placeholder="tbd"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-56 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="design"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Design & Planung:
                    </label>
                    <input
                      {...register("design", { required: true })}
                      defaultValue={approver[0].design}
                      placeholder="tbd"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-56 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                </div>
                <div className="flex flex-col lg:flex-row justify-around gap-2">
                  <div>
                    <label
                      htmlFor="projektmanagement"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Projektmanagement:
                    </label>
                    <input
                      {...register("projektmanagement", { required: true })}
                      defaultValue={approver[0].projektmanagement}
                      placeholder="tbd"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-56 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="officemanagement"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Officemanagement:
                    </label>
                    <input
                      {...register("officemanagement", { required: true })}
                      defaultValue={approver[0].officemanagement}
                      placeholder="tbd"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-56 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="flex justify-center gap-2">
                  <button
                    type="submit"
                    className="bg-gradient-to-b from-gray-700 to-gray-900 font-medium p-2 mt-2 md:p-2 text-white uppercase w-1/3 rounded cursor-pointer hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
                  >
                    Aktualisieren
                  </button>
                  <NavLink
                    to={"/admin/dashboard"}
                    className="text-center bg-gradient-to-b from-blue-400 to-blue-600 font-medium p-2 mt-2 md:p-2 text-white uppercase w-1/3 rounded cursor-pointer hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
                  >
                    Abbrechen
                  </NavLink>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
