import { useForm } from "react-hook-form";
import SideMenu from "./SideMenu";
import axiosClient from "../../utils/axiosClient";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import { useContext } from "react";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

export default function ApproverListSubstitute() {
  const { approver, setApprover } = useContext(AuthContext);

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
        return axiosClient.get(`/approver/approverList`);
      })
      .then((responseApprovers) => {
        setApprover(responseApprovers.data);
        toast.success("E-Mail-Adresse(n) aktualisiert!");
      })

      .catch((error) => {});
  };

  return (
    <>
      <div className="bg-gray-50/50 flex">
        <SideMenu />
        {!approver ? (
          <div class="flex mt-2 justify-center">
            <div class="relative">
              <div class="h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-200"></div>
              <div class="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-blue-500 animate-spin"></div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center px-0 py-8 lg:py-12 lg:px-6 mx-auto w-10/12">
            <div className="bg-white rounded-md shadow w-full lg:w-7/12">
              <div className="p-6 space-y-4 md:space-y-2.5 sm:p-8">
                <div className="flex justify-around gap-16 mb-8">
                  <NavLink
                    to={"/admin/approverList"}
                    className="text-xl py-1.5 px-2.5 font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
                  >
                    Hauptverantwortung
                  </NavLink>
                  <NavLink
                    to={"/admin/approverListSubstitute"}
                    className={
                      location.pathname === "/admin/approverListSubstitute"
                        ? "text-xl px-2.5 py-1.5 rounded-lg bg-[#293751] font-semibold leading-tight tracking-tight text-white md:text-2xl dark:text-white"
                        : "middle none  font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-sm py-3 rounded-lg text-white hover:bg-white/10 active:bg-white/30 w-full flex items-center gap-4 px-4 capitalize"
                    }
                  >
                    Stellvertretung
                  </NavLink>
                </div>
                <form
                  className="space-y-4 w-full md:space-y-7"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="flex flex-col lg:flex-row justify-around gap-2">
                    <div className="mt-2">
                      <label
                        htmlFor="logistikSubstitute"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Logistik:
                      </label>
                      <input
                        {...register("logistikSubstitute", { required: true })}
                        defaultValue={approver[0].logistikSubstitute}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-64 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                    </div>

                    <div className="mt-2">
                      <label
                        htmlFor="vertriebSubstitute"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Vertrieb:
                      </label>
                      <input
                        {...register("vertriebSubstitute", { required: true })}
                        placeholder="tbd"
                        defaultValue={approver[0].vertriebSubstitute}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-64 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                    </div>
                    <div className="mt-2">
                      <label
                        htmlFor="hrSubstitute"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        HR & Training:
                      </label>
                      <input
                        {...register("hrSubstitute", {
                          required: true,
                        })}
                        defaultValue={approver[0].hrSubstitute}
                        placeholder="tbd"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-64 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col lg:flex-row justify-around gap-2">
                    <div>
                      <label
                        htmlFor="itSubstitute"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        IT & Services:
                      </label>
                      <input
                        {...register("itSubstitute", { required: true })}
                        defaultValue={approver[0].itSubstitute}
                        placeholder="tbd"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-64 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="fuhrparkSubstitute"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Fuhrpark:
                      </label>
                      <input
                        {...register("fuhrparkSubstitute", { required: true })}
                        defaultValue={approver[0].fuhrparkSubstitute}
                        placeholder="tbd"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-64 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                        {...register("buchhaltungSubstitute", {
                          required: true,
                        })}
                        defaultValue={approver[0].buchhaltungSubstitute}
                        placeholder="tbd"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-64 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col lg:flex-row justify-around gap-2">
                    <div>
                      <label
                        htmlFor="showroom"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Showroom:
                      </label>
                      <input
                        {...register("showroomSubstitute", { required: true })}
                        defaultValue={approver[0].showroomSubstitute}
                        placeholder="tbd"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-64 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="designSubstitute"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Design & Marketing:
                      </label>
                      <input
                        {...register("designSubstitute", { required: true })}
                        defaultValue={approver[0].designSubstitute}
                        placeholder="tbd"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-64 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="bestandsmanagementSubstitute"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Bestandsmanagement:
                      </label>
                      <input
                        {...register("bestandsmanagementSubstitute", {
                          required: true,
                        })}
                        defaultValue={approver[0].bestandsmanagementSubstitute}
                        placeholder="tbd"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-64 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col lg:flex-row justify-center gap-16">
                    <div>
                      <label
                        htmlFor="haustechnikSubstitute"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Haustechnik:
                      </label>
                      <input
                        {...register("haustechnikSubstitute", {
                          required: true,
                        })}
                        defaultValue={approver[0].haustechnikSubstitute}
                        placeholder="tbd"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-64 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="unternehmensentwicklungSubstitute"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Unternehmensentwicklung:
                      </label>
                      <input
                        {...register("unternehmensentwicklungSubstitute", {
                          required: true,
                        })}
                        defaultValue={
                          approver[0].unternehmensentwicklungSubstitute
                        }
                        placeholder="tbd"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-64 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
