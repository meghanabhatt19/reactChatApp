import React, { useState ,useEffect} from "react";
import { onSnapshot, doc ,getDoc} from 'firebase/firestore';
import { db } from '../../firebase'; 
import "./ChatList.css";
import AddUser from "./addUser/AddUser";
import{userStore}  from "../../userStore"; 
function ChatList() {
  const [addMode, setAddMode] = useState(false);
  const [chats, setChats] = useState([]);
  const currentUser = userStore();

  useEffect(() => {
    if (!currentUser?.id) return; // Ensure currentUser.id is valid before proceeding

    const unSub = onSnapshot(doc(db, "userchats", currentUser.id), async(res) => {
       const items = res.data().chats;
       console.log(currentUser.id);
   
      console.log(res.data())
      const promises = items.map(async (item) => {
        const userDocRef = doc(db, "users", item.receiverId);
        const userDocSnap = await getDoc(userDocRef);

        const user = userDocSnap.data();

        return { ...item, user };
      });

      const chatData = await Promise.all(promises);
    


       setChats(chatData.sort((a,b) => b.updatedAt -a.updatedAt));
    });

    return () => {
      unSub();
    };
  }, [currentUser?.id]);

   console.log(chats);
  return (
    <div className="chatList">
      <div className="search">
        <div className="searchBar">
          <img src="./search.png" alt="" />
          <input type="text" placeholder="Search" />
        </div>
        <img
          src={addMode ? "./minus.png" : "./plus.png"}
          alt=""
          className="add"
          onClick={() => setAddMode((prev) => !prev)}
        />
      </div>
{chats.map((chat)=>(
 <div className="item" key={chat.chatId}>
 <img src={chat.avatar || "./avatar.png"} alt="" />
 <div className="texts">
   <span>{chat.username}</span>
   <p>{chat.lastMessage}</p>
 </div>
</div>
))}
     
     <div className="item" >
 {/* <img src={chat.user.avatar || "./avatar.png"} alt="" /> */}
 <div className="texts">
   <span>helloo</span>
   <p>hiii</p>
 </div>
</div>
 
     {addMode && <AddUser/>} 
    </div>
  );
}

export default ChatList;
