import { useForm } from "react-hook-form";
import SideMenu from "./SideMenu";
import axiosClient from "../../utils/axiosClient";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";

export default function MessageForm() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const sender = user.firstName + " " + user.lastName;
  const sendersEmail = user.firstName + "." + user.lastName + "@rent.group";

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({});

  const [messageContent, setMessageContent] = useState("");

  const onSubmit = (data) => {
    data.messageContent = messageContent;

    axiosClient
      .post("/message/createNewMessage", data)
      .then((response) => {
        navigate("/admin/dashboard");
        toast.success("Nachricht gesendet!");
      })
      .catch((error) => {});
  };

  return (
    <div className="bg-gray-50/50 flex">
      <SideMenu />
      <div className="flex flex-col items-center px-0 py-8 lg:py-12 lg:px-6 mx-auto w-10/12">
        <div className="bg-white rounded-md shadow w-full lg:w-5/12">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Benachrichtigen
            </h1>
            <form
              className="space-y-4 w-full md:space-y-6"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="flex flex-col lg:flex-row justify-between gap-2">
                <div className="w-full">
                  <label
                    htmlFor="messageTitle"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Betreff:
                  </label>
                  <div className="flex items-center gap-1">
                    <input
                      {...register("messageTitle", { required: true })}
                      placeholder="Betreff"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
              <div className="hidden">
                <label
                  htmlFor="sender"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Sender:
                </label>
                <input
                  {...register("sender", { required: true })}
                  placeholder="Betreff"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  defaultValue={sender}
                />
              </div>
              <div className="hidden">
                <label
                  htmlFor="sendersEmail"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Senders Email:
                </label>
                <input
                  {...register("sendersEmail", { required: true })}
                  placeholder="Betreff"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  defaultValue={sendersEmail.toLowerCase()}
                />
              </div>
              <div className="flex flex-col lg:flex-row lg:justify-between">
                <div>
                  <label
                    htmlFor="messageType"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Art der Nachricht
                  </label>
                  <select
                    {...register("messageType", { required: true })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option value="Teilnahmebestätigung für Nachzügler">
                      Teilnahmebestätigung für Nachzügler
                    </option>
                    <option value="Änderung der Schulung">
                      Änderung der Schulung
                    </option>
                    <option value="Neue Schulungen">Neue Schulungen</option>
                    <option value="Absage der Schulung">
                      Absage der Schulung
                    </option>
                    <option value="Allgemeine Information">
                      Allgemeine Information
                    </option>
                  </select>
                </div>
              </div>
              <div>
                <label
                  htmlFor="messageContent"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Nachricht:
                </label>
                <ReactQuill
                  value={messageContent}
                  onChange={(content) => {
                    setMessageContent(content);
                    setValue("messageContent", content);
                  }}
                  className="h-52"
                />
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-gradient-to-b from-gray-700 to-gray-900 font-medium p-2 mt-12 md:p-2 text-white uppercase w-1/2 rounded cursor-pointer hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
                >
                  Senden
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
