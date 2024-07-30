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
            msg.messageID._id === messageId ? { ...msg, status: "read" } : msg
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
    (a, b) => new Date(b?.messageID?.timeStamp) - new Date(a?.messageID?.timeStamp)
  );

  return (
    <div className="flex justify-center mt-16">
      <section className="flex flex-col pt-3 w-4/12 bg-gray-50 h-[calc(75.5vh-32px)] rounded-tl-md rounded-bl-md overflow-y-scroll shadow-md">
        <h2 className="px-3 mb-2.5 text-2xl font-bold">Inbox</h2>
        <ul>
          {!user ? (
            <p>Loading...</p>
          ) : (
            sortedMessages.map((message) => (
              <MessagesSide
                message={message}
                key={message?.messageID?._id}
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
            <div className="flex flex-col">
              <div className="flex flex-col mb-4">
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
  );
}
