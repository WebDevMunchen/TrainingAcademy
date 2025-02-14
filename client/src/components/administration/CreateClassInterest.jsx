import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import SideMenu from "./SideMenu";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axiosClient from "../../utils/axiosClient";
import { toast } from "react-toastify";

export default function CreateClassInterest() {
  const { setAllInterest } = useContext(AuthContext);
  const navigate = useNavigate();

  const [targetGroups, setTargetGroups] = useState([]);
  const [tags, setTags] = useState([]);
  const [fileName, setFileName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const allTargetGroups = {
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    if (file) {
      setFileName(file.name);
    }
  };

  const toggleTargetGroup = (imageUrl) => {
    setTargetGroups((prev) => {
      const updated = prev.includes(imageUrl)
        ? prev.filter((url) => url !== imageUrl)
        : [...prev, imageUrl];
      return updated;
    });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const addTag = (e) => {
    if (e.key === "Enter" && e.target.value.trim() !== "") {
      e.preventDefault();
      setTags([...tags, e.target.value.trim()]);
      e.target.value = "";
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };
  const onSubmit = (data) => {
    setLoading(true);

    const formData = new FormData();

    if (selectedFile) {
      formData.append("previewPicture", selectedFile);
    }

    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("favCount", data.favCount || 0);
    formData.append("tookPlace", data.tookPlace || false);

    formData.append("tag", JSON.stringify(tags));
    formData.append("targetGroup", JSON.stringify(targetGroups));

    axiosClient
      .post("/activityInterest/createInterest", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        return axiosClient.get(`/activityInterest/getEveryInterest/`);
      })
      .then((response) => {
        setAllInterest(response.data);
        toast.success("Neue Schulung erstellt!");
        navigate("/admin/classInterest");
      })
      .catch((error) => {
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="bg-gray-50/50 flex">
      <SideMenu />
      <div className="flex-1 p-6 flex flex-col ">
        <div className="flex flex-col items-center px-0 py-8 lg:py-2 lg:px-6">
          <div className="bg-white rounded-md shadow w-full lg:w-6/12">
            <div className="p-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Neue Schulung erstellen
              </h1>
              <form
                className="w-full flex flex-col gap-4 mt-6"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="flex flex-col lg:flex-row justify-between gap-2">
                  <div className="w-full">
                    <label
                      htmlFor="title"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Schulungstitel:
                    </label>
                    <div className="flex items-center gap-1">
                      <input
                        {...register("title", { required: true })}
                        placeholder="Schulungstitel"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                    </div>
                  </div>
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
                <div className="flex items-center gap-2">
                  <label className="py-1.5 block text-sm font-medium text-gray-900 dark:text-white mt-1">
                    Vorschaubild:
                  </label>
                </div>
                <div className="flex items-start gap-2">
                  <label
                    htmlFor="file"
                    className="flex bg-gray-800 hover:bg-gray-700 text-white text-base px-5 py-1.5 outline-none rounded w-max cursor-pointer font-[sans-serif]"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 mr-2 fill-white inline"
                      viewBox="0 0 32 32"
                    >
                      <path d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z" />
                      <path d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z" />
                    </svg>
                    Datei auswählen
                    <input
                      type="file"
                      id="file"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </label>

                  {fileName && (
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                      <span className="font-bold">{`Ausgewählte Datei: `}</span>
                      {fileName}`
                    </p>
                  )}
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Lernziele:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-gray-200 text-gray-800 px-2 py-1 rounded-md flex items-center border border-gray-400"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="ml-2 text-gray-600 hover:text-red-500 transition-colors duration-200 ease-in-out"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={20}
                            height={20}
                            viewBox="0 0 36 36"
                            className="fill-current"
                          >
                            <path
                              fill="currentColor"
                              d="M18 2a16 16 0 1 0 16 16A16 16 0 0 0 18 2m8 22.1a1.4 1.4 0 0 1-2 2l-6-6l-6 6.02a1.4 1.4 0 1 1-2-2l6-6.04l-6.17-6.22a1.4 1.4 0 1 1 2-2L18 16.1l6.17-6.17a1.4 1.4 0 1 1 2 2L20 18.08Z"
                              className="clr-i-solid clr-i-solid-path-1"
                            ></path>
                            <path fill="none" d="M0 0h36v36H0z"></path>
                          </svg>
                        </button>
                      </span>
                    ))}
                  </div>
                  <input
                    type="text"
                    placeholder="Lernziel eingeben und mit Enter bestätigen"
                    onKeyDown={addTag}
                    className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Zielgruppe:
                </label>
                <div className="grid text-sm grid-cols-3 gap-1">
                  {Object.entries(allTargetGroups).map(([imageUrl, name]) => (
                    <label
                      key={imageUrl}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={targetGroups.includes(imageUrl)}
                        onChange={() => toggleTargetGroup(imageUrl)}
                        className="w-4 h-4 accent-blue-500"
                      />
                      <span className="text-gray-800">{name}</span>
                    </label>
                  ))}
                </div>

                <div className="flex justify-center">
                  <button
                    type="submit"
                    disabled={loading}
                    className={`bg-gradient-to-b from-gray-700 to-gray-900 font-medium p-2 mt-2 md:p-2 text-white uppercase w-1/3 rounded shadow transition transform ${
                      loading
                        ? "cursor-not-allowed opacity-50"
                        : "hover:shadow-lg hover:-translate-y-0.5"
                    }`}
                  >
                    {loading ? (
                      <div className="flex items-center justify-center gap-2">
                        <svg
                          className="animate-spin h-5 w-5 text-white"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v4l4-4-4-4v4a8 8 0 00-8 8z"
                          ></path>
                        </svg>
                        Bitte warten...
                      </div>
                    ) : (
                      "Erstellen"
                    )}
                  </button>
                </div>
              </form>
              <div className="flex justify-center">
                <button
                  onClick={() => navigate(-1)}
                  className="bg-blue-400 hover:bg-blue-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5 from-gray-700 to-gray-900 font-medium p-2 mt-2 md:p-2 text-white uppercase w-1/3 rounded cursor-pointer "
                >
                  Abbrechen
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
