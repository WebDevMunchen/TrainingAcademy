import { useContext, useEffect, useState } from "react";
import SideMenu from "./SideMenu";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../context/AuthProvider";
import axiosClient from "../../utils/axiosClient";
import { useNavigate } from "react-router-dom";

export default function CreateClass() {
  const { setAllActivities } = useContext(AuthContext);

  const navigate = useNavigate()

  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [currentMonth, setCurrentMonth] = useState("");

  useEffect(() => {
    const date = new Date();
    const monthNames = [
      "januar",
      "februar",
      "märz",
      "april",
      "mai",
      "juni",
      "juli",
      "august",
      "september",
      "oktober",
      "november",
      "dezember",
    ];
    setCurrentMonth(monthNames[date.getMonth()]);
  }, [])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleDepartmentChange = (e) => {
    const department = e.target.value;
    if (e.target.checked) {
      setSelectedDepartments([...selectedDepartments, department]);
    } else {
      setSelectedDepartments(
        selectedDepartments.filter((d) => d !== department)
      );
    }
  };

  const onSubmit = (data) => {
    data.department = selectedDepartments;
    axiosClient
      .post(`/classActivity/create`, data, {
        withCredentials: true,
      })
      .then((response) => {
        return axiosClient.get(`/classActivity/allActivities?month=${currentMonth}`);
      })
      .then((activitiesResponse) => {
        setAllActivities(activitiesResponse.data);
        navigate("/admin/dashboard")
      })
      .catch((error) => {
      });
  };

  return (
    <>
      <div className="bg-gray-50/50 flex">
        <SideMenu />
        <div className="flex mt-4 flex-col items-center w-11/12 lg:py-10 mx-auto lg:mt-0 lg:w-5/12">
          <div className="bg-white rounded-md shadow w-11/12 lg:6/12">
            <div className="p-6 space-y-4 md:space-y-4 sm:p-6">
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

                <div className="flex flex-col lg:flex-row lg:justify-between">
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

                  <div className="mt-2 lg:mt-0">
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
                  <div className="mt-2 lg:mt-0">
                    <label
                      htmlFor="time"
                      className="pr-20 block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Uhrzeit:
                    </label>
                    <input
                      type="time"
                      {...register("time", { required: true })}
                      className="ml-2 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-32 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                </div>
                <div className="flex flex-col lg:flex-row justify-between">
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
                  <div className="mt-2 lg:mt-0">
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

                  <div className="mt-2 lg:mt-0">
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

                <div className="flex justify-start gap-16">

                </div>
                <div>
                  <label
                    htmlFor="teacher"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Referent:
                  </label>
                  <input
                    placeholder="Wer unterrichtet die Schulung?"
                    {...register("teacher", { required: true })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
                <label
                  htmlFor="teacher"
                  className="block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Zielgruppe:
                </label>
                <div className="grid grid-cols-2 grid-rows-6 lg:grid-cols-4 lg:grid-rows-3">
                  <div className="flex items-center mb-1">
                    <input
                      type="checkbox"
                      value="https://res.cloudinary.com/dtrymbvrp/image/upload/v1715088433/symbols/hczkglpvaybhguywjgku.png"
                      onChange={handleDepartmentChange}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="departmentA"
                      className="ml-2 text-sm text-gray-900 dark:text-white"
                    >
                      Alle
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      value="https://res.cloudinary.com/dtrymbvrp/image/upload/v1715088434/symbols/ng4emaukxn9adrxpnvlu.png"
                      onChange={handleDepartmentChange}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="departmentB"
                      className="ml-2 text-sm text-gray-900 dark:text-white"
                    >
                      Vertrieb
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      value="https://res.cloudinary.com/dtrymbvrp/image/upload/v1715088434/symbols/o4qwfioe3dkqrkhmumd4.png"
                      onChange={handleDepartmentChange}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="departmentB"
                      className="ml-2 text-sm text-gray-900 dark:text-white"
                    >
                      Logistik
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      value="https://res.cloudinary.com/dtrymbvrp/image/upload/v1715088434/symbols/uaozccdgnwtcelxvqjug.png"
                      onChange={handleDepartmentChange}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="departmentB"
                      className="ml-2 text-sm text-gray-900 dark:text-white"
                    >
                      Fuhrpark
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      value="https://res.cloudinary.com/dtrymbvrp/image/upload/v1715088434/symbols/ke8amlflgcdrvdfghzoz.png"
                      onChange={handleDepartmentChange}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="departmentB"
                      className="ml-2 text-sm text-gray-900 dark:text-white"
                    >
                      IT & Services
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      value="https://res.cloudinary.com/dtrymbvrp/image/upload/v1715088433/symbols/gmnv44k0nydrmfnbr67y.png"
                      onChange={handleDepartmentChange}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="departmentB"
                      className="ml-2 text-sm text-gray-900 dark:text-white"
                    >
                      HR & Training
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      value="https://res.cloudinary.com/dtrymbvrp/image/upload/v1715088433/symbols/ip7khvjx1dgxosk6lxnb.png"
                      onChange={handleDepartmentChange}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="departmentB"
                      className="ml-2 text-sm text-gray-900 dark:text-white"
                    >
                      Buchhaltung
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      value="https://res.cloudinary.com/dtrymbvrp/image/upload/v1715088434/symbols/ydkcdshvmwdffe4tyf9f.png"
                      onChange={handleDepartmentChange}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="departmentB"
                      className="ml-2 text-sm text-gray-900 dark:text-white"
                    >
                      Einkauf & Anmietung
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      value="https://res.cloudinary.com/dtrymbvrp/image/upload/v1715088433/symbols/wodezi58z28wwhcvhsev.png"
                      onChange={handleDepartmentChange}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="departmentB"
                      className="ml-2 text-sm text-gray-900 dark:text-white"
                    >
                      Design & Planung
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      value="https://res.cloudinary.com/dtrymbvrp/image/upload/v1715088434/symbols/ikluglsekc6msbuvgn0z.png"
                      onChange={handleDepartmentChange}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="departmentB"
                      className="ml-2 text-sm text-gray-900 dark:text-white"
                    >
                      Projektmanagement
                    </label>
                  </div>
                  <div className="flex items-center ">
                    <input
                      type="checkbox"
                      value="https://res.cloudinary.com/dtrymbvrp/image/upload/v1715088434/symbols/p0m4tdmsd5qdmysdzolk.png"
                      onChange={handleDepartmentChange}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="departmentB"
                      className="ml-2 text-sm text-gray-900 dark:text-white"
                    >
                      Officemanagement
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      value="https://res.cloudinary.com/dtrymbvrp/image/upload/v1715088433/symbols/l85s2hjejj6kzkzung8o.png"
                      onChange={handleDepartmentChange}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="departmentB"
                      className="ml-2 text-sm text-gray-900 dark:text-white"
                    >
                      Gesundheitsmanagement
                    </label>
                  </div>
                </div>

                <div className="flex justify-center">
                  <input
                    type="submit"
                    className="bg-gradient-to-b from-gray-700 to-gray-900 font-medium p-2 mt-2 md:p-2 text-white uppercase w-1/3 rounded cursor-pointer hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
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
