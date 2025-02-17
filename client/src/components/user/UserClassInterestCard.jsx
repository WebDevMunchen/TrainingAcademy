import { useContext, useRef } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { toast } from "react-toastify";
import axiosClient from "../../utils/axiosClient";

export default function UserClassInterestCard({ id, interest }) {
  const { setAllInterest, user } = useContext(AuthContext);

  const showInterest = () => {
    axiosClient
      .put(`/activityInterest/showInterest/${id}`)
      .then(() => {
        return axiosClient.get("/activityInterest/getEveryInterest");
      })
      .then((response) => {
        setAllInterest(response.data);
        toast.success("Erfolgreich eingetragen!");
      })
      .catch((error) => {});
  };

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

  const getTooltipText = (url) => {
    return allTargetGroups[url] || "Unknown Group";
  };

  const isUserInterested = interest.interestedUsers.some(
    (interestedUserId) => interestedUserId.user === user._id
  );

  return (
    <div className="bg-gray-50/50 flex">
      <div className="flex justify-center">
        <div className="mx-auto">
          <div className="relative flex flex-col rounded-xl bg-white shadow-lg lg:w-fit lg:h-[800px]">
            <div className="relative mx-4 mt-4 overflow-hidden text-white shadow-lg rounded-xl bg-blue-gray-500 bg-clip-border shadow-blue-gray-500/40">
              <img
                src={interest.previewPicture}
                alt="ui/ux review check"
                className="w-full min-h-[250px] object-cover lg:min-h-[350px]"
              />
              <div className="absolute inset-0 w-full h-full to-bg-black-10 bg-gradient-to-tr from-transparent via-transparent to-black/60"></div>
            </div>
            <div className="p-6 flex-grow overflow-auto">
              <div className="flex items-center justify-between mb-3">
                <h5 className="block font-sans text-xl antialiased font-medium leading-snug tracking-normal text-blue-gray-900">
                  {interest.title}
                </h5>
              </div>
              <p className="block font-sans text-base antialiased font-light leading-relaxed text-gray-700">
                {interest.description}
              </p>
              <label className="block my-3 text-sm font-medium text-gray-900 dark:text-white">
                Lernziele:
              </label>
              <div className="flex flex-wrap gap-1">
                {interest.tag.map((singleTag) => {
                  return (
                    <span className="w-fit bg-gray-200 text-gray-800 px-2 py-1 rounded-md flex items-center border border-gray-400">
                      {singleTag}
                    </span>
                  );
                })}
              </div>
              <label className="text-center block my-4 text-sm font-medium text-gray-900 dark:text-white">
                Zielgruppe:
              </label>

              <div className="flex justify-center mx-auto items-center gap-3 group">
                {interest.targetGroup.map((group) => {
                  return (
                    <span
                      className="tooltip cursor-pointer rounded-full border border-gray-900/5 bg-gray-900/5 p-1.5 text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-gray-900/10 hover:!opacity-100 group-hover:opacity-70"
                      data-tip={getTooltipText(group)}
                    >
                      <img src={group} width={35} alt={group} />
                    </span>
                  );
                })}
              </div>
            </div>
            <div className="p-6">
              <button
                className={`block w-full select-none rounded-lg py-3.5 px-7 text-center align-middle font-sans text-sm font-bold uppercase shadow-md transition-all 
      ${
        isUserInterested
          ? "bg-gray-400 text-white cursor-not-allowed"
          : "bg-gray-900 text-white hover:shadow-lg hover:shadow-gray-900/20"
      }
    `}
                type="button"
                onClick={showInterest}
                disabled={isUserInterested}
              >
                {isUserInterested ? "Bereits eingetragen" : "Eintragen"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
