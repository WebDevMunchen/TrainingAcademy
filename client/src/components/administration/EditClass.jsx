import { useContext, useEffect, useState } from "react";
import SideMenu from "./SideMenu";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../context/AuthProvider";
import axiosClient from "../../utils/axiosClient";
import { useNavigate, useParams } from "react-router-dom";

export default function EditClass() {
  const { setAllActivities, setUser, currentMonth } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [activityInformation, setActivityInformation] = useState(null);

  useEffect(() => {
    axiosClient
      .get(`/classActivity/${id}`)
      .then((response) => {
        setActivityInformation(response.data);
        setSelectedDepartments(response.data.department || []);
      })
      .catch((error) => {});
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleDepartmentChange = (e) => {
    const department = e.target.value;
    if (e.target.checked) {
      setSelectedDepartments((prev) => [...prev, department]);
    } else {
      setSelectedDepartments((prev) => prev.filter((d) => d !== department));
    }
  };

  const onSubmit = (data) => {
    data.department = selectedDepartments;
    axiosClient
      .put(`/classActivity/editClass/${id}`, data, {
        withCredentials: true,
      })
      .then((response) => {
        return axiosClient.get(
          `/classActivity/allActivities?month=${currentMonth}`
        );
      })
      .then((activitiesResponse) => {
        setAllActivities(activitiesResponse.data);
      })
      .then((response) => {
        return axiosClient.get(`/user/profile`);
      })
      .then((responseUserProfile) => {
        setUser(responseUserProfile.data);
        navigate("/admin/dashboard");
      })
      .catch((error) => {});
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const formattedDate = formatDate(activityInformation?.date);

  return (
    <>
      {!activityInformation ? (
        <p>Loading...</p>
      ) : (
        <div className="bg-gray-50/50 flex">
          <SideMenu />
          <div className="flex mt-4 flex-col items-center w-11/12 lg:py-7 mx-auto lg:mt-0 lg:w-5/12">
            <div className="bg-white rounded-md shadow w-11/12 lg:6/12">
              <div className="p-6 space-y-4 md:space-y-2 sm:p-6">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  "{activityInformation.title}" bearbeiten:
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
                  <label
                    htmlFor="safetyBriefing"
                    className="block text-sm font-medium text-gray-900 dark:text-white mt-1"
                  >
                    Jährliche Sicherheitsunterweisung:
                  </label>
                  <input
                    type="checkbox" {...register("safetyBriefing", { required: false })}
                    id="safetyBriefing"
                    className="checkbox"
                    defaultChecked={activityInformation.safetyBriefing}
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
