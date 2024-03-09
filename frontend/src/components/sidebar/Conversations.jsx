// eslint-disable-next-line no-unused-vars
import React from "react";
import Conversation from "./Conversation";
import useGetConversation from "../../hooks/useGetConversation";
import { getRandomEmoji } from "../../assets/emojies";

const Conversations = () => {
  const { loading, conversations } = useGetConversation();
  console.log("Loading Conversations", loading, conversations);
  return (
    <div className="py-2 flex flex-col overflow-auto">
      {conversations.map((conversation, Idx) => (
        <Conversation
          key={conversation._id}
          conversation={conversation}
          emoji={getRandomEmoji()}
          lastIdx={Idx === conversations.length - 1}
        />
      ))}
      {loading ? <span className="loading loading-spinner"></span> : <></>}
    </div>
  );
};

export default Conversations;
