import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import MessagesSide from "./MessagesSide";
import axiosClient from "../../utils/axiosClient";
import envelope from "../../assets/envelope.png";

export default function Messages() {
  const { user, setUser } = useContext(AuthContext);

  const [selectedMessageID, setSelectedMessageID] = useState(null);

  const handleSelectMessage = (id) => {
    setSelectedMessageID(id);
    markRead(id);
  };

  const selectedMessage = user?.message.find(
    (message) => message?.messageID?._id === selectedMessageID
  );

  const markRead = (messageId) => {
    axiosClient
      .put(`/user/markRead/${messageId}`, {
        status: "read",
      })
      .then((response) => {
        console.log("Message marked as read", response.data);
        const updatedUser = {
          ...user,
          message: user.message.map((msg) =>
            msg.messageID?._id === messageId ? { ...msg, status: "read" } : msg
          ),
        };
        setUser(updatedUser);
      })
      .catch((error) => {
        console.error("Error marking message as read:", error);
      });
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

  return (
    <>
      <div className="flex justify-center mt-6 px-4 py-1.5 mx-auto rounded-full">
        <p className="font-anek text-4xl font-semibold tracking-widest text-g uppercase">
          Inbox
        </p>
      </div>
      <div className="flex justify-center mt-6">
        <section className="flex flex-col pt-3 w-4/12 bg-gray-50 h-[calc(75.5vh-32px)] rounded-tl-md rounded-bl-md overflow-y-scroll shadow-md">
          <ul>
            {!user ? (
              <p>Loading...</p>
            ) : (
              sortedMessages.map((message, index) => (
                <MessagesSide
                  message={message}
                  key={message?.messageID?._id || index}
                  onClick={() => handleSelectMessage(message?.messageID?._id)}
                />
              ))
            )}
          </ul>
        </section>
        <section className="w-6/12 px-4 flex flex-col bg-white rounded-r-md shadow-md">
          <div className="flex justify-between items-center h-48 border-b-2 mb-8">
            {!selectedMessage ? (
              <div className="flex flex-col justify-center items-center text-center">
                <p className="text-gray-500 text-lg">
                  Klick auf die Nachricht links, um den Inhalt zu sehen.
                </p>
              </div>
            ) : (
              <div className="flex items-center w-full justify-between">
                <div className="flex flex-col">
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="size-6 text-red-500 transform transition-transform duration-300 hover:scale-150 hover:cursor-pointer ml-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              
              </div>
            )}
          </div>
          {selectedMessage ? (
            <section>
              <article className="mt-2 text-gray-500 leading-6 tracking-wider">
                <p className="mb-6">Hallo {user.firstName},</p>
                <p>{selectedMessage?.messageID?.messageContent}</p>
                <div className="mt-6">
                  <p className="mb-3">
                    Bei Fragen komm gerne auf uns zu oder schreib uns per E-Mail
                  </p>
                  <p className="mb-1">Liebe Grüße</p>
                  <p className="italic">{selectedMessage?.messageID?.sender}</p>
                </div>
              </article>
            </section>
          ) : (
            <img
              src={envelope}
              className="mx-auto my-auto"
              style={{ height: "40%", width: "45%" }}
              alt="envelope"
            />
          )}
        </section>
      </div>
    </>
  );
}
