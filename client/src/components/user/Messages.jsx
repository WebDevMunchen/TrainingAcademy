import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import MessagesSide from "./MessagesSide";
import axiosClient from "../../utils/axiosClient";
import envelope from "../../assets/envelope.png";

export default function Messages() {
  const { user, setUser } = useContext(AuthContext);
  const [selectedMessageID, setSelectedMessageID] = useState(null);
  const [readStatus, setReadStatus] = useState(null);

  const handleSelectMessage = (id) => {
    setSelectedMessageID(id);
    const message = user?.message.find((msg) => msg.messageID?._id === id);
    if (message) {
      setReadStatus(message.status);
      if (message.status === "unread") {
        markRead(id);
      }
    }
  };

  const markRead = (messageId) => {
    axiosClient
      .put(`/user/markRead/${messageId}`, {
        status: "read",
      })
      .then((response) => {
        const updatedUser = {
          ...user,
          message: user.message.map((msg) =>
            msg.messageID?._id === messageId ? { ...msg, status: "read" } : msg
          ),
        };
        setUser(updatedUser);
        setReadStatus("read");
      })
      .catch((error) => {});
  };

  const toggleReadStatus = (messageId) => {
    const newStatus = readStatus === "read" ? "unread" : "read";
    axiosClient
      .put(
        `/user/mark${newStatus === "read" ? "Read" : "NotRead"}/${messageId}`,
        {
          status: newStatus,
        }
      )
      .then((response) => {
        const updatedUser = {
          ...user,
          message: user.message.map((msg) =>
            msg.messageID?._id === messageId
              ? { ...msg, status: newStatus }
              : msg
          ),
        };
        setUser(updatedUser);
        setReadStatus(newStatus);
      })
      .catch((error) => {});
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString("de-DE", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const sortedMessages = user?.message.sort(
    (a, b) =>
      new Date(b?.messageID?.timeStamp) - new Date(a?.messageID?.timeStamp)
  );

  const deleteMessage = (messageId) => {
    axiosClient
      .delete(`/user/deleteMessage/${messageId}`)
      .then((response) => {
        const updatedUser = {
          ...user,
          message: user.message.filter(
            (msg) => msg.messageID?._id !== messageId
          ),
        };
        setUser(updatedUser);
      })
      .catch((error) => {});
  };

  const goToPreviousMessage = () => {
    const currentIndex = sortedMessages.findIndex(
      (msg) => msg.messageID._id === selectedMessageID
    );
    if (currentIndex > 0) {
      const previousMessage = sortedMessages[currentIndex - 1];
      handleSelectMessage(previousMessage.messageID._id);
    }
  };

  const goToNextMessage = () => {
    const currentIndex = sortedMessages.findIndex(
      (msg) => msg.messageID._id === selectedMessageID
    );
    if (currentIndex < sortedMessages.length - 1) {
      const nextMessage = sortedMessages[currentIndex + 1];
      handleSelectMessage(nextMessage.messageID._id);
    }
  };

  const selectedMessage = user?.message.find(
    (message) => message?.messageID?._id === selectedMessageID
  );

  const notifyDelete = () => {
    const deleteModal = document.getElementById("deleteClass");
    if (deleteModal) deleteModal.showModal();
  };

  return (
    <>
      <div className="flex justify-center px-4 mx-auto rounded-full lg:mt-8">
        <p className="hidden lg:flex font-poppins text-4xl font-semibold tracking-widest text-g uppercase">
          Inbox
        </p>
      </div>
      <div className="flex my-4 mr-2 justify-end gap-4 lg:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6 text-slate-500 transform transition-transform duration-300 hover:scale-150 hover:cursor-pointer hover:text-blue-500"
          onClick={goToPreviousMessage}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
          />
        </svg>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6 text-slate-500 transform transition-transform duration-300 hover:scale-150 hover:cursor-pointer hover:text-blue-500"
          onClick={goToNextMessage}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6 text-slate-500 transform transition-transform duration-300 hover:scale-150 hover:cursor-pointer hover:text-blue-500"
          onClick={() => toggleReadStatus(selectedMessageID)}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
          />
        </svg>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="size-6 text-slate-500 transform transition-transform duration-300 hover:scale-150 hover:cursor-pointer hover:text-red-500"
          onClick={notifyDelete}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
          />
        </svg>
      </div>
      <div className="flex flex-col lg:flex-row lg:justify-center overflow-y-scroll lg:mt-6">
        <section className="flex px-2 flex-col bg-gray-50 h-[calc(33.5vh-32px)] rounded-tl-md rounded-bl-md overflow-y-scroll shadow-md lg:w-4/12 lg:h-[calc(75.5vh-32px)]">
          <ul>
            {!user || user.message.length === 0 ? (
              <li
                className={`py-6 text-center border-b px-4 border-slate-300 transition 
                 text-xl font-semibold`}
              >
                Du hast noch keine Nachrichten
              </li>
            ) : (
              sortedMessages.map((message, index) => (
                <MessagesSide
                  message={message}
                  key={message?.messageID?._id || index}
                  onClick={() => handleSelectMessage(message?.messageID?._id)}
                  selected={message?.messageID?._id === selectedMessageID}
                />
              ))
            )}
          </ul>
        </section>
        <section className="px-4 py-4 flex flex-col bg-white rounded-r-md shadow-md h-[calc(45.5vh-32px)] overflow-y-scroll lg:w-5/12 lg:h-[calc(75.5vh-32px)]">
          <div className="flex justify-between items-center h-48 border-b-2 mb-2">
            {!selectedMessage ? (
              <div className="flex flex-col justify-center items-center text-center">
                <p className="text-gray-500 text-xl">
                  Klick auf die Nachricht, um den Inhalt zu sehen
                </p>
              </div>
            ) : (
              <div className="flex items-center w-full justify-between mb-2 lg:mb-6">
                <div className="flex flex-col w-full">
                  <h3 className="font-semibold text-lg">
                    <span></span>Von: {selectedMessage?.messageID?.sender}
                  </h3>
                  <p className="text-light text-gray-400">
                    <span className="font-semibold text-black">Datum: </span>
                    {formatDate(selectedMessage?.messageID?.timeStamp)}
                  </p>
                  <p className="text-light text-gray-400">
                    <span className="font-semibold text-black">E-mail: </span>
                    {selectedMessage?.messageID?.sendersEmail}
                  </p>
                </div>
                <div className="hidden lg:flex lg:gap-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6 text-slate-500 transform transition-transform duration-300 hover:scale-150 hover:cursor-pointer hover:text-blue-500"
                    onClick={goToPreviousMessage}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                    />
                  </svg>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6 text-slate-500 transform transition-transform duration-300 hover:scale-150 hover:cursor-pointer hover:text-blue-500"
                    onClick={goToNextMessage}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                    />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6 text-slate-500 transform transition-transform duration-300 hover:scale-150 hover:cursor-pointer hover:text-blue-500"
                    onClick={() => toggleReadStatus(selectedMessageID)}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                    />
                  </svg>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="size-6 text-slate-500 transform transition-transform duration-300 hover:scale-150 hover:cursor-pointer hover:text-red-500"
                    onClick={notifyDelete}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </div>
              </div>
            )}
          </div>
          {selectedMessage ? (
            <section>
              <article className="mt-2 text-gray-500 leading-6 tracking-wider break-words">
                <p className="mb-6">Hallo {user.firstName},</p>
                <div
                  className="mt-2 content text-gray-500 leading-6 tracking-wider break-words"
                  dangerouslySetInnerHTML={{
                    __html: selectedMessage?.messageID?.messageContent,
                  }}
                ></div>

                <div className="mt-6">
                  <p className="mb-3">Bei Fragen melde dich gerne</p>
                  <p className="mb-1">Liebe Grüße</p>
                  <p className="italic">{selectedMessage?.messageID?.sender}</p>
                </div>
              </article>
            </section>
          ) : (
            <img
              src={envelope}
              className="mx-auto my-auto"
              style={{ height: "35%", width: "45%" }}
              alt="envelope"
            />
          )}
        </section>
      </div>
      <dialog id="deleteClass" className="modal">
        <div className="modal-box">
          <div
            className="flex items-center justify-center p-3 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-300 dark:border-red-800"
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
              Nachricht zu löschen!
            </div>
          </div>
          <div
            className="flex p-3 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-blue-400"
            role="alert"
          >
            <span className="sr-only">Info</span>
            <div>
              <p className="font-medium text-center">
                Bitte beachten, dass nach der Löschung diese Nachricht nicht
                mehr wiederhergestellt werden kann!
              </p>
            </div>
          </div>
          <div className="modal-action flex justify-center">
            <form method="dialog" className="flex gap-2">
              <button
                onClick={() => {
                  deleteMessage(selectedMessageID);
                  document.getElementById("deleteClass").close();
                }}
                className="btn w-28 bg-red-500 text-white hover:bg-red-700"
              >
                Löschen
              </button>
              <button
                type="button"
                onClick={() => document.getElementById("deleteClass").close()}
                className="btn w-28"
              >
                Schließen
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}
