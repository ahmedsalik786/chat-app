// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react";
import Message from "./Message";
import useGetMessages from "../../hooks/useGetMessages";
import Skeleton from "../skeleton/Skeleton";
import { useRef } from "react";
import useListenMessages from "../../hooks/useListenMessages";

const Messages = () => {
  const { loading, messages } = useGetMessages();
  useListenMessages();
  console.log("messages", messages);
  const lastMessageRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);

  return (
    <div className="px-4 flex-1 overflow-auto">
      {loading && <Skeleton />}
      {!loading && messages.length === 0 && (
        <p className="text-center">Send a message to start a conversation</p>
      )}
      {!loading &&
        messages.length > 0 &&
        messages.map((message, index) => (
          <div
            key={message._id}
            ref={index === messages.length - 1 ? lastMessageRef : null}
          >
            <Message message={message} />
          </div>
        ))}
    </div>
  );
};

export default Messages;
