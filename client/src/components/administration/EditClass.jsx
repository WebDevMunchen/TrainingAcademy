import { useContext, useEffect, useState } from "react";
import SideMenu from "./SideMenu";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../context/AuthProvider";
import axiosClient from "../../utils/axiosClient";
import { useNavigate, useParams } from "react-router-dom";

export default function EditClass() {
  const { setAllActivities, setAllUsers, currentMonth, currentYear } =
    useContext(AuthContext);

  const { id } = useParams();
  const navigate = useNavigate();

  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [activityInformation, setActivityInformation] = useState(null);
  const [fileUploadHidden, setFileUploadHidden] = useState("hidden");
  const [selectedFile, setSelectedFile] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setFileUploadHidden(
      activityInformation?.safetyBriefing ? "visible" : "hidden"
    );
    axiosClient
      .get(`/classActivity/${id}`)
      .then((response) => {
        setActivityInformation(response.data);
        setSelectedDepartments(response.data.department || []);
        setFileUploadHidden(
          response.data.safetyBriefing ? "visible" : "hidden"
        );
      })
      .catch((error) => {});
  }, []);

  const handleDepartmentChange = (e) => {
    const department = e.target.value;
    if (e.target.checked) {
      setSelectedDepartments((prev) => [...prev, department]);
    } else {
      setSelectedDepartments((prev) => prev.filter((d) => d !== department));
    }
  };

  const onSubmit = async (data) => {
    data.department = selectedDepartments;

    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }
    if (selectedFile) {
      formData.append("file", selectedFile);
    }

    try {
      await axiosClient.put(`/classActivity/editClass/${id}`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const activitiesResponse = await axiosClient.get(
        `/classActivity/allActivities?month=${currentMonth}&year=${currentYear}`
      );
      setAllActivities(activitiesResponse?.data);

      const usersResponse = await axiosClient.get("/user/getAllUsers");
      setAllUsers(usersResponse?.data);

      
    } catch (error) {

    } finally {
      navigate("/admin/dashboard");
    }
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const formattedDate = formatDate(activityInformation?.date);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleHidingFileUpload = () => {
    setFileUploadHidden((prevState) =>
      prevState === "hidden" ? "visible" : "hidden"
    );
  };

  const cancelClass = () => {
    axiosClient
      .delete(`/classActivity/deleteClass/${id}`)
      .then((response) => {
        return axiosClient.get(
          `classActivity/allActivities?month=${currentMonth}`
        );
      })
      .then((response) => {
        setAllActivities(response.data);
      })
      .then((response) => {
        navigate("/admin/dashboard");
      })
      .catch((error) => {
        setAllActivities(null)
        navigate("/admin/dashboard");
      });
  };

  const notifyDelete = () => {
    document.getElementById("deleteClass").showModal();
  };

  return (
    <>
      {!activityInformation ? (
        <p>Loading...</p>
      ) : (
        <div className="bg-gray-50/50 flex">
          <SideMenu />
          <div className="flex mt-4 flex-col items-center w-11/12 lg:py-7 mx-auto lg:mt-0 lg:w-5/12">
            <dialog id="deleteClass" className="modal">
              <div className="modal-box  max-w-2xl">
                <div
                  className="flex items-center p-3 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-300 dark:border-red-800"
                  role="alert"
                >
                  <svg
                    className="flex-shrink-0 inline w-4 h-4 me-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                  </svg>
                  <span className="sr-only">Info</span>
                  <div>
                    <span className="font-medium">Achtung!</span> Du bist dabei, die
                    Schulung zu löschen!
                  </div>
                </div>
                <div
                  className="flex p-3 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-blue-400"
                  role="alert"
                >
                  <span className="sr-only">Info</span>
                  <div>
                    <span className="font-medium">
                      Bitte Folgendes beachten bei der Löschung der Schulung:
                    </span>
                    <ul className="mt-1.5 list-disc list-inside">
                      <li>
                        Alle Mitarbeiter bei dieser Schulung werden entfernt
                      </li>
                      <li>Alle Genehmiger werden per E-Mail informiert</li>
                      <li>
                        Schick eine Nachricht aus dem Benachrichtigungscenter,
                        um den Mitarbeiter zu informieren
                      </li>
                      <li>
                        Diese Schulung kann <span className="font-medium">nicht mehr</span> wiedegestellt werden!
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="modal-action flex justify-center">
                  <form method="dialog" className="flex gap-2">
                    <button
                      onClick={cancelClass}
                      className="btn w-28 bg-red-500 text-white hover:bg-red-700"
                    >
                      Löschen
                    </button>
                    <button className="btn w-28">Schließen</button>
                  </form>
                </div>
              </div>
            </dialog>
            <div className="bg-white rounded-md shadow w-11/12 lg:6/12">
              <div className="p-6 space-y-4 md:space-y-2 sm:p-6">
                <div className="flex items-center justify-between">
                  <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    "{activityInformation.title}" bearbeiten:
                  </h1>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="size-6 text-red-500 transform transition-transform duration-300 hover:scale-150 hover:cursor-pointer"
                    onClick={notifyDelete}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </div>
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
                      defaultValue={activityInformation.title}
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
                      defaultValue={activityInformation.description}
                    />
                  </div>

                  <div className="flex gap-4">
                    <div className="flex gap-2 items-center">
                      <label
                        htmlFor="safetyBriefing"
                        className="block py-1.5 text-sm font-medium text-gray-900 dark:text-white mt-1"
                      >
                        Jährliche Sicherheitsunterweisung:
                      </label>
                      <input
                        type="checkbox"
                        {...register("safetyBriefing", { required: false })}
                        id="safetyBriefing"
                        className="checkbox"
                        defaultChecked={activityInformation.safetyBriefing}
                        onClick={handleHidingFileUpload}
                      />
                    </div>

                    <div className={fileUploadHidden}>
                      <label
                        for="uploadFile1"
                        className="flex bg-gray-800 hover:bg-gray-700 text-white ml-2 text-base px-4 py-1.5 outline-none rounded w-max cursor-pointer mx-auto font-[sans-serif]"
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
                          id="uploadFile1"
                          className="hidden"
                        />
                      </label>
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
                        defaultValue={activityInformation.month}
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
                        defaultValue={formattedDate}
                      />
                    </div>
                    <div>
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
                        defaultValue={activityInformation.time}
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
                        defaultValue={activityInformation.duration}
                      />
                    </div>
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
                        defaultValue={activityInformation.location}
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
                        defaultValue={activityInformation.capacity}
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
                      placeholder="Wer unterrichtet die Schulung?"
                      {...register("teacher", { required: true })}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      defaultValue={activityInformation.teacher}
                    />
                  </div>
                  <label
                    htmlFor="department"
                    className="block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Zielgruppe:
                  </label>
                  <div className="grid grid-cols-2 grid-rows-6 lg:grid-cols-4 lg:grid-rows-3">
                    {[
                      {
                        value:
                          "https://res.cloudinary.com/dtrymbvrp/image/upload/v1715088433/symbols/hczkglpvaybhguywjgku.png",
                        label: "Alle",
                      },
                      {
                        value:
                          "https://res.cloudinary.com/dtrymbvrp/image/upload/v1715088434/symbols/ng4emaukxn9adrxpnvlu.png",
                        label: "Vertrieb",
                      },
                      {
                        value:
                          "https://res.cloudinary.com/dtrymbvrp/image/upload/v1715088434/symbols/o4qwfioe3dkqrkhmumd4.png",
                        label: "Logistik",
                      },
                      {
                        value:
                          "https://res.cloudinary.com/dtrymbvrp/image/upload/v1715088434/symbols/uaozccdgnwtcelxvqjug.png",
                        label: "Fuhrpark",
                      },
                      {
                        value:
                          "https://res.cloudinary.com/dtrymbvrp/image/upload/v1715088434/symbols/ke8amlflgcdrvdfghzoz.png",
                        label: "IT & Services",
                      },
                      {
                        value:
                          "https://res.cloudinary.com/dtrymbvrp/image/upload/v1715088433/symbols/gmnv44k0nydrmfnbr67y.png",
                        label: "HR & Training",
                      },
                      {
                        value:
                          "https://res.cloudinary.com/dtrymbvrp/image/upload/v1715088433/symbols/ip7khvjx1dgxosk6lxnb.png",
                        label: "Buchhaltung",
                      },
                      {
                        value:
                          "https://res.cloudinary.com/dtrymbvrp/image/upload/v1715088434/symbols/ydkcdshvmwdffe4tyf9f.png",
                        label: "Einkauf & Anmietung",
                      },
                      {
                        value:
                          "https://res.cloudinary.com/dtrymbvrp/image/upload/v1715088433/symbols/wodezi58z28wwhcvhsev.png",
                        label: "Design & Planung",
                      },
                      {
                        value:
                          "https://res.cloudinary.com/dtrymbvrp/image/upload/v1715088434/symbols/ikluglsekc6msbuvgn0z.png",
                        label: "Projektmanagement",
                      },
                      {
                        value:
                          "https://res.cloudinary.com/dtrymbvrp/image/upload/v1715088434/symbols/p0m4tdmsd5qdmysdzolk.png",
                        label: "Officemanagement",
                      },
                      {
                        value:
                          "https://res.cloudinary.com/dtrymbvrp/image/upload/v1715088433/symbols/l85s2hjejj6kzkzung8o.png",
                        label: "Gesundheitsmanagement",
                      },
                    ].map(({ value, label }) => (
                      <div key={value} className="flex items-center mb-1">
                        <input
                          type="checkbox"
                          value={value}
                          onChange={handleDepartmentChange}
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                          checked={selectedDepartments.includes(value)}
                        />
                        <label className="ml-2 text-sm text-gray-900 dark:text-white">
                          {label}
                        </label>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-center gap-2">
                    <input
                      type="submit"
                      className="bg-gradient-to-b from-gray-700 to-gray-900 font-medium p-2 mt-2 md:p-2 text-white uppercase w-1/3 rounded cursor-pointer hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
                      value={"Bestätigen"}
                    />
                    <button
                      onClick={() => navigate(-1)}
                      className="bg-blue-400 hover:bg-blue-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5 from-gray-700 to-gray-900 font-medium p-2 mt-2 md:p-2 text-white uppercase w-1/3 rounded cursor-pointer "
                    >
                      Abbrechen
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
