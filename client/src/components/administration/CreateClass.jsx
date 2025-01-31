import { useContext, useEffect, useState } from "react";
import SideMenu from "./SideMenu";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../context/AuthProvider";
import axiosClient from "../../utils/axiosClient";
import { useNavigate } from "react-router-dom";

export default function CreateClass() {
  const { setAllActivities, currentMonth, currentYear } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [hideFileUpload, setHideFileUpload] = useState("hidden");
  const [fileName, setFileName] = useState("");
  const [responsibleDepartments, setResponsibleDepartments] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const departmentMap = {
    "https://res.cloudinary.com/dtrymbvrp/image/upload/v1737040594/alle_wyewox.png": "Alle",
    "https://res.cloudinary.com/dtrymbvrp/image/upload/v1737040592/vertrieb_mhopgl.png": "Vertrieb",
    "https://res.cloudinary.com/dtrymbvrp/image/upload/v1737040592/logistik_blm8tf.png": "Logistik",
    "https://res.cloudinary.com/dtrymbvrp/image/upload/v1737040593/fuhrpark_bhkb9q.png": "Fuhrpark",
    "https://res.cloudinary.com/dtrymbvrp/image/upload/v1737040592/IT_cyoqz8.png": "IT & Services",
    "https://res.cloudinary.com/dtrymbvrp/image/upload/v1737040593/HR_bhni2i.png": "HR & Training",
    "https://res.cloudinary.com/dtrymbvrp/image/upload/v1737040593/buha_xuo2tb.png": "Buchhaltung",
    "https://res.cloudinary.com/dtrymbvrp/image/upload/v1737040594/showroom_nsrmiw.png": "Showroom",
    "https://res.cloudinary.com/dtrymbvrp/image/upload/v1737040596/design_x4hg1y.png": "Design & Marketing",
    "https://res.cloudinary.com/dtrymbvrp/image/upload/v1737040595/bestandsmanagement_dacigz.png": "Bestandsmanagement",
    "https://res.cloudinary.com/dtrymbvrp/image/upload/v1737040595/haustechnik_uj6pa6.png": "Haustechnik",
    "https://res.cloudinary.com/dtrymbvrp/image/upload/v1737040595/unternehmensentwicklung_qiggf8.png": "Unternehmensentwicklung",
  };

  const handleDepartmentChange = (e) => {
    const { value, checked } = e.target;
    const departmentName = departmentMap[value];
  
    // Update responsibleDepartments state
    setResponsibleDepartments((prev) => {
      if (checked) {
        return [...prev, departmentName];
      } else {
        return prev.filter((dept) => dept !== departmentName);
      }
    });
  
    // Update selectedDepartments state (URLs for departments)
    setSelectedDepartments((prev) => {
      if (checked) {
        return [...prev, value]; // Add the URL of the selected department
      } else {
        return prev.filter((url) => url !== value); // Remove the URL of the unselected department
      }
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    if (file) {
      setFileName(file.name);
    }
  };

  const onSubmit = async (data) => {
    data.department = selectedDepartments;
    data.responsibleDepartments = responsibleDepartments;
    console.log("Submitting Data:", data); // Debugging log
    const formData = new FormData();
    for (const key in data) {
      if (Array.isArray(data[key])) {
        data[key].forEach((value) => formData.append(key, value));
      } else {
        formData.append(key, data[key]);
      }
    }
    if (selectedFile) {
      formData.append("file", selectedFile);
    }

    try {
      await axiosClient.post(`/classActivity/create`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const activitiesResponse = await axiosClient.get(
        `/classActivity/allActivities?month=${currentMonth}&year=${currentYear}`
      );
      setAllActivities(activitiesResponse?.data);
    } catch (error) {
      console.error("Error during form submission!");
    } finally {
      navigate("/admin/dashboard");
    }
  };

  const handleHideFileUpload = () => {
    setHideFileUpload(hideFileUpload === "hidden" ? "visible" : "hidden");
  };

  return (
    <>
      <div className="bg-gray-50/50 flex">
        <SideMenu />
        <div className="flex mx-auto mt-4 flex-col items-center w-11/12 lg:py-4 lg:mx-auto lg:mt-0 lg:w-[55%]">
          <div className="bg-white rounded-md shadow lg:w-9/12">
            <div className="p-2 space-y-4 md:space-y-2 sm:p-5">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Neue Schulung erstellen
              </h1>
              <form
                className="space-y-4 w-full md:space-y-5"
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
                    placeholder="Gib eine kurze Beschreibung für die Schulung ein"
                  />
                </div>

                <div className="flex flex-col lg:flex-row gap-2 items-center">
                  <div className="flex items-center gap-2">
                    <label
                      htmlFor="safetyBriefing"
                      className="py-1.5 block text-sm font-medium text-gray-900 dark:text-white mt-1"
                    >
                      Jährliche Sicherheitsunterweisung:
                    </label>
                    <input
                      type="checkbox"
                      {...register("safetyBriefing", { required: false })}
                      id="safetyBriefing"
                      className="checkbox mt-2"
                      onClick={handleHideFileUpload}
                    />
                  </div>
                  <div className={`${hideFileUpload} flex items-center gap-3`}>
                    <label
                      htmlFor="file"
                      className="flex bg-gray-800 hover:bg-gray-700 text-white text-base px-5 ml-3 py-1.5 outline-none rounded w-max cursor-pointer mx-auto font-[sans-serif]"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 mr-2 fill-white inline"
                        viewBox="0 0 32 32"
                      >
                        <path
                          d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z"
                          data-original="#000000"
                        />
                        <path
                          d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z"
                          data-original="#000000"
                        />
                      </svg>
                      Datei auswählen
                      <input
                        type="file"
                        onChange={handleFileChange}
                        id="file"
                        className="hidden"
                      />
                    </label>
                    {fileName && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-8 text-green-600"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
                        />
                      </svg>
                    )}
                  </div>
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
                      <option value="september">September</option>
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
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-32 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Kapazität:
                    </label>
                    <input
                      min="0"
                      type="number"
                      placeholder="0"
                      {...register("capacity", { required: true })}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-32 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="teacher"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Referent*in:
                  </label>
                  <input
                    placeholder="Wer hält die Schulung?"
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
                {/* <div className="grid grid-cols-2 grid-rows-6 lg:grid-cols-3 lg:grid-rows-4">
                  <div className="flex items-center mb-1">
                    <input
                      type="checkbox"
                      value="https://res.cloudinary.com/dtrymbvrp/image/upload/v1737040594/alle_wyewox.png"
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
                      value="https://res.cloudinary.com/dtrymbvrp/image/upload/v1737040592/vertrieb_mhopgl.png"
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
                      value="https://res.cloudinary.com/dtrymbvrp/image/upload/v1737040592/logistik_blm8tf.png"
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
                      value="https://res.cloudinary.com/dtrymbvrp/image/upload/v1737040593/fuhrpark_bhkb9q.png"
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
                      value="https://res.cloudinary.com/dtrymbvrp/image/upload/v1737040592/IT_cyoqz8.png"
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
                      value="https://res.cloudinary.com/dtrymbvrp/image/upload/v1737040593/HR_bhni2i.png"
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
                      value="https://res.cloudinary.com/dtrymbvrp/image/upload/v1737040593/buha_xuo2tb.png"
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
                      value="https://res.cloudinary.com/dtrymbvrp/image/upload/v1737040594/showroom_nsrmiw.png"
                      onChange={handleDepartmentChange}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="departmentB"
                      className=":block ml-2 text-sm text-gray-900 dark:text-white"
                    >
                      Showroom
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      value="https://res.cloudinary.com/dtrymbvrp/image/upload/v1737040596/design_x4hg1y.png"
                      onChange={handleDepartmentChange}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="departmentB"
                      className="hidden lg:block ml-2 text-sm text-gray-900 dark:text-white"
                    >
                      Design und Marketing
                    </label>
                    <label
                      htmlFor="departmentB"
                      className="ml-2 text-sm text-gray-900 dark:text-white lg:hidden"
                    >
                      Design und Mark.
                    </label>
                  </div>
                  <div className="flex items-center ">
                    <input
                      type="checkbox"
                      value="https://res.cloudinary.com/dtrymbvrp/image/upload/v1737040595/bestandsmanagement_dacigz.png"
                      onChange={handleDepartmentChange}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="departmentB"
                      className="hidden lg:block ml-2 text-sm text-gray-900 dark:text-white"
                    >
                      Bestandsmanagement
                    </label>
                    <label
                      htmlFor="departmentB"
                      className="ml-2 text-sm text-gray-900 dark:text-white lg:hidden"
                    >
                      Bestandsman.
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      value="https://res.cloudinary.com/dtrymbvrp/image/upload/v1737040595/haustechnik_uj6pa6.png"
                      onChange={handleDepartmentChange}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="departmentB"
                      className="block ml-2 text-sm text-gray-900 dark:text-white"
                    >
                      Haustechnik
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      value="https://res.cloudinary.com/dtrymbvrp/image/upload/v1737040595/unternehmensentwicklung_qiggf8.png"
                      onChange={handleDepartmentChange}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />

                    <label
                      htmlFor="departmentB"
                      className="hidden lg:block ml-2 text-sm text-gray-900 dark:text-white"
                    >
                      Unternehmensentwicklung
                    </label>
                    <label
                      htmlFor="departmentB"
                      className="ml-2 text-sm text-gray-900 dark:text-white lg:hidden"
                    >
                      Unternehmensenent.
                    </label>
                  </div>
                </div> */}

<div className="grid grid-cols-2 grid-rows-6 lg:grid-cols-3 lg:grid-rows-4">
  {Object.entries(departmentMap).map(([url, name]) => (
    <div key={name} className="flex items-center mb-1">
      <input
        type="checkbox"
        value={url} // This is the URL you need in the department array
        onChange={handleDepartmentChange}
        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
      />
      <label className="ml-2 text-sm text-gray-900 dark:text-white">
        {name}
      </label>
    </div>
  ))}
</div>


      {/* Display Selected Departments */}
      <div className="mt-4">
        <h3 className="text-lg font-bold">Verantwortliche Abteilungen:</h3>
        <p>{responsibleDepartments.join(", ") || "Keine ausgewählt"}</p>
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
