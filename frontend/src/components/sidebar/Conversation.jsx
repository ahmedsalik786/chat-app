// eslint-disable-next-line no-unused-vars
import React from "react";
import useConversation from "../../zustand/useConversation";
import { useSocketContext } from "../../context/SocketContext";

const Conversation = ({ conversation, lastIdx, emoji }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected = selectedConversation?._id === conversation._id;

  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers[0].includes(conversation._id);

  // console.log("online users: ", onlineUsers);
  // console.log("conversation users: ", conversation._id);
  // console.log("isOnline: ", isOnline);

  //console.log(conversation);

  return (
    <>
      <div
        className={`${
          isSelected ? "bg-sky-500" : ""
        } flex gap-2 items-center hover:bg-sky-500 rounded`}
        onClick={() => {
          console.log(conversation);
          setSelectedConversation(conversation);
        }}
      >
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-20 rounded-full">
            <img src={conversation.profilePic} alt="user avatar" />
          </div>
        </div>

        <div className="flex flex-col flex-1 ">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-gray-200">{conversation.fullName}</p>
            <span className="text-xl">{emoji}</span>
          </div>
        </div>
      </div>
      {!lastIdx && <div className="divider my-0 py-0 h-1"></div>}
    </>
  );
};

export default Conversation;
