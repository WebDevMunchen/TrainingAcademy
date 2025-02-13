import { useContext, useEffect, useState } from "react";
import SideMenu from "./SideMenu";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../context/AuthProvider";
import axiosClient from "../../utils/axiosClient";
import { useNavigate, useParams } from "react-router-dom";

export default function EditClass() {
  const { setAllActivities, setAllUsers, currentMonth, currentYear, setUser } =
    useContext(AuthContext);

  const { id } = useParams();
  const navigate = useNavigate();

  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [activityInformation, setActivityInformation] = useState(null);
  const [fileUploadHidden, setFileUploadHidden] = useState("hidden");
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [responsibleDepartments, setResponsibleDepartments] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const departmentMap = {
    "https://res.cloudinary.com/dtrymbvrp/image/upload/v1738958806/alle_wyewox_c_pad_w_80_h_75_n0nktg.png":
      "Alle",
    "https://res.cloudinary.com/dtrymbvrp/image/upload/v1737040592/vertrieb_mhopgl.png":
      "Vertrieb",
    "https://res.cloudinary.com/dtrymbvrp/image/upload/v1737040592/logistik_blm8tf.png":
      "Logistik",
    "https://res.cloudinary.com/dtrymbvrp/image/upload/v1738958594/fuhrpark_bhkb9q_c_pad_w_80_h_74_unpasw.png":
      "Fuhrpark",
    "https://res.cloudinary.com/dtrymbvrp/image/upload/v1737040592/IT_cyoqz8.png":
      "IT & Services",
    "https://res.cloudinary.com/dtrymbvrp/image/upload/v1737040593/HR_bhni2i.png":
      "HR & Training",
    "https://res.cloudinary.com/dtrymbvrp/image/upload/v1737040593/buha_xuo2tb.png":
      "Buchhaltung",
    "https://res.cloudinary.com/dtrymbvrp/image/upload/v1737040594/showroom_nsrmiw.png":
      "Showroom",
    "https://res.cloudinary.com/dtrymbvrp/image/upload/v1737040596/design_x4hg1y.png":
      "Design & Marketing",
    "https://res.cloudinary.com/dtrymbvrp/image/upload/v1737040595/bestandsmanagement_dacigz.png":
      "Bestandsmanagement",
    "https://res.cloudinary.com/dtrymbvrp/image/upload/v1737040595/haustechnik_uj6pa6.png":
      "Haustechnik",
    "https://res.cloudinary.com/dtrymbvrp/image/upload/v1737040595/unternehmensentwicklung_qiggf8.png":
      "Unternehmensentwicklung",
  };

  useEffect(() => {
    axiosClient
      .get(`/classActivity/${id}`)
      .then((response) => {
        setActivityInformation(response.data);
        setSelectedDepartments(response.data.department || []);
        setFileUploadHidden(
          response.data.safetyBriefing ? "visible" : "hidden"
        );

        if (response.data.fileUrl) {
          const fileUrl = response.data.fileUrl;
          const fileName = fileUrl.split("/").pop();
          setSelectedFile(fileUrl);
          setFileName(fileName);
        }

        const initialResponsibleDepartments =
          response.data.responsibleDepartments || [];
        setResponsibleDepartments(initialResponsibleDepartments);

        const currentDate = new Date();
        const { date, time } = response.data;
        if (date && time) {
          const [hoursStr, minutesStr] = time.split(":");
          const classDate = new Date(date);
          classDate.setHours(parseInt(hoursStr, 10));
          classDate.setMinutes(parseInt(minutesStr, 10));

          const differenceMs = classDate.getTime() - currentDate.getTime();
          const differenceHours = differenceMs / (1000 * 60 * 60);

          if (differenceHours < 48) {
            navigate("/admin/dashboard");
          }
        }
      })
      .catch((error) => {
        console.error("Error fetching class activity:", error);
      });
  }, [id, navigate]);
  const handleDepartmentChange = (e) => {
    const { value, checked } = e.target;

    setSelectedDepartments((prev) => {
      if (checked) {
        return [...prev, value];
      } else {
        return prev.filter((url) => url !== value);
      }
    });

    const departmentName = departmentMap[value];
    setResponsibleDepartments((prev) => {
      if (checked) {
        if (!prev.includes(departmentName)) {
          return [...prev, departmentName];
        }
      } else {
        return prev.filter((dept) => dept !== departmentName);
      }
      return prev;
    });
  };

  const onSubmit = async (data) => {
    data.department = selectedDepartments;
    data.responsibleDepartments = responsibleDepartments;

    const formData = new FormData();
    for (const key in data) {
      if (Array.isArray(data[key])) {
        data[key].forEach((value) => formData.append(key, value));
      } else {
        formData.append(key, data[key]);
      }
    }

    if (selectedFile && typeof selectedFile !== "string") {
      formData.append("file", selectedFile);
    } else if (activityInformation?.fileUrl) {
      formData.append("existingFileUrl", activityInformation?.fileUrl);
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

      const userResponse = await axiosClient.get("/user/profile");
      setUser(userResponse?.data);
    } catch (error) {
      console.error("Error submitting class activity:", error);
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
    const file = e.target.files[0];
    setSelectedFile(file);
    if (file) {
      setFileName(file.name);
    }
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
        return axiosClient.get("/user/profile");
      })
      .then((responseProfile) => {
        setUser(responseProfile.data);
      })
      .then((response) => {
        navigate("/admin/dashboard");
      })
      .catch((error) => {
        setAllActivities(null);
        navigate("/admin/dashboard");
      });
  };

  const notifyDelete = () => {
    document.getElementById("deleteClass").showModal();
  };

  return (
    <>
      {!activityInformation ? (
        <div className="flex mt-2 justify-center">
          <div className="relative">
            <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-200"></div>
            <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-blue-500 animate-spin"></div>
          </div>
        </div>
      ) : (
        <div className="bg-gray-50/50 flex">
          <SideMenu />
          <div className="flex mt-4 flex-col items-center w-11/12 lg:py-4 mx-auto lg:mt-0 lg:w-6/12">
            <dialog id="deleteClass" className="modal">
              <div className="modal-box max-w-3xl">
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
                    <span className="font-medium">Achtung!</span> Du bist dabei,
                    die Schulung zu löschen!
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
                        Bitte eine Nachricht aus dem Benachrichtigungscenter
                        senden, um den Mitarbeiter zu informieren
                      </li>
                      <li>
                        Diese Schulung kann{" "}
                        <span className="font-medium">nicht mehr</span>{" "}
                        wiedergestellt werden!
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
              <div className="p-6 space-y-4 md:space-y-2 sm:p-5">
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
                    <div className="flex items-center gap-2">
                      <label
                        htmlFor="noRegistration"
                        className="py-1.5 block text-sm font-medium text-gray-900 dark:text-white mt-1"
                      >
                        Schulung ohne Registrierung?
                      </label>
                      <input
                        type="checkbox"
                        {...register("noRegistration", { required: false })}
                        id="noRegistration"
                        className="checkbox mt-2"
                        defaultChecked={activityInformation.noRegistration}
                      />
                    </div>
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

                    <div
                      className={`flex items-center gap-3 ${fileUploadHidden}`}
                    >
                      <label
                        htmlFor="uploadFile1"
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
                        <option value="september">September</option>
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

                  <div className="grid grid-cols-2 grid-rows-6 lg:grid-cols-3 lg:grid-rows-4">
                    {Object.entries(departmentMap).map(([url, name]) => (
                      <div key={name} className="flex items-center mb-1">
                        <input
                          type="checkbox"
                          value={url}
                          onChange={handleDepartmentChange}
                          checked={selectedDepartments.includes(url)}
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                        />
                        <label className="ml-2 text-sm text-gray-900 dark:text-white">
                          {name}
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
