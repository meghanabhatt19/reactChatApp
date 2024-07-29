import React, { useState, useEffect } from "react";
import { doc, getDoc, setDoc, updateDoc, serverTimestamp, arrayUnion, collection } from 'firebase/firestore';
import { db } from '../../firebase';
import "./ChatList.css";
import AddUser from "./addUser/AddUser";
import { userStore } from "../../userStore";
import { chatStore } from "../../chatStore";

function ChatList() {
  const [addMode, setAddMode] = useState(false);
  const [chats, setChats] = useState([]);
  const [input, setInput] = useState("");
  const currentUser = userStore((state) => state.currentUser);
const {chatId,changeChat} = chatStore();
  useEffect(() => {
    if (!currentUser?.id) return;
    const fetchChats = async () => {
      const userChatsRef = doc(db, "userchats", currentUser.id);
      const res = await getDoc(userChatsRef);
      if (!res.exists()) {
        setChats([]);
        return;
      }

      const items = res.data().chats || [];
      const promises = items.map(async (item) => {
        const userDocRef = doc(db, "users", item.receiverId);
        const userDocSnap = await getDoc(userDocRef);
        const user = userDocSnap.data();
        return { ...item, user };
      });
      const chatData = await Promise.all(promises);
      setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
    };

    fetchChats();
  }, [currentUser?.id]);

  const handleAddUser = async (user) => {
    if (!user?.id || !currentUser?.id) {
      console.error("User data or current user data is missing");
      return;
    }

    try {
      const chatRef = collection(db, "chats");
      const userChatsRef = collection(db, "userchats");
      const newChatRef = doc(chatRef);

      await setDoc(newChatRef, {
        createdAt: serverTimestamp(),
        messages: [],
      });

      const newChatData = {
        chatId: newChatRef.id,
        lastMessage: "",
        receiverId: currentUser.id,
        updatedAt: Date.now(),
      };

      await updateDoc(doc(userChatsRef, user.id), {
        chats: arrayUnion({
          ...newChatData,
          receiverId: currentUser.id,
        }),
      });

      await updateDoc(doc(userChatsRef, currentUser.id), {
        chats: arrayUnion({
          ...newChatData,
          receiverId: user.id,
        }),
      });

      const userDocRef = doc(db, "users", user.id);
      const userDocSnap = await getDoc(userDocRef);
      const newUser = userDocSnap.data();

      const newChat = {
        chatId: newChatRef.id,
        lastMessage: "",
        receiverId: user.id,
        updatedAt: Date.now(),
        user: newUser
      };

      setChats((prevChats) => [newChat, ...prevChats].sort((a, b) => b.updatedAt - a.updatedAt));
    } catch (err) {
      console.log(err);
    }
  };
const handleSelect = async (chat) =>{

  const userChats = chats.map((item) => {
    const { user, ...rest } = item;
    return rest;
  });

  const chatIndex = userChats.findIndex((item) => item.chatId === chat.chatId);
  userChats[chatIndex].isSeen = true;

  const userChatsRef = doc(db, "userchats", currentUser.id);
  try {
    await updateDoc(userChatsRef, {
      chats: userChats,
    });
    changeChat(chat.chatId , chat.user);
  } catch (err) {
    console.log(err);
  }
 
};


const filteredChats = chats.filter((c) =>
  c.user.username.toLowerCase().includes(input.toLowerCase())
);
  return (
    <div className="chatList">
      <div className="search">
        <div className="searchBar">
          <img src="./search.png" alt="" />
          <input type="text" placeholder="Search"   onChange={(e) => setInput(e.target.value)}/>
        </div>
        <img
          src={addMode ? "./minus.png" : "./plus.png"}
          alt=""
          className="add"
          onClick={() => setAddMode((prev) => !prev)}
        />
      </div>
      {filteredChats.map((chat) => (
        <div className="item" key={chat.chatId} onClick={() => handleSelect(chat)} 
        style={{
          backgroundColor: chat?.isSeen ? "transparent" : "rgba(17, 25, 40, 0.5)",
        }}
        >
          <img src={chat.user.blocked.includes(currentUser.id)
          ? "./avatar.png"
        : chat.user.avatar || "./avatar.png"
    }alt="" />
          {/* src={chat.user.avatar || "./avatar.png"} */}
          <div className="texts">
            <span>   {chat.user.blocked.includes(currentUser.id)
        ? "User"
        : chat.user.username}</span>
            <p>{chat.lastMessage}</p>
          </div>
        </div>
      ))}
      {addMode && <AddUser onAddUser={handleAddUser} />}
    </div>
  );
}

export default ChatList;
