// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import toast from "react-hot-toast";
import { IoSearchSharp } from "react-icons/io5";
import useConversation from "../../zustand/useConversation";
import useGetConversation from "../../hooks/useGetConversation";
const SearchInput = () => {
  const [search, setSearch] = useState("");
  const { setSelectedConversation } = useConversation();
  const { conversations } = useGetConversation();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    if (search.length < 3) {
      toast.error("Search term must be at least 4 characters long");
    }
    const conversation = conversations.find((c) =>
      c.fullName.toLowerCase().includes(search.toLowerCase())
    );
    if (conversation) {
      setSelectedConversation(conversation);
      setSearch("");
    } else {
      toast.error("No user found");
    }
  };
  return (
    <form className="flex items-center gap-2 " onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="search"
        className="input input-bordered rounded-full"
        name=""
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        id=""
      />
      <button type="submit" className="btn btn-circle bg-sky-500 text-white">
        <IoSearchSharp />
      </button>
    </form>
  );
};

export default SearchInput;
