import Chat from "./components/chat/Chat"

import Details from "./components/Details/Details"
import Lists from "./components/Lists/Lists"
import Login from "./components/login/Login"
import Notification from "./components/notification/Notification"
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from "react";
import { auth  } from "../src/components/firebase";
import{userStore}  from "./components/userStore"; 

const App = () => {

   const { currentUser,isLoading, fetchUserInfo } = userStore();

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
   
       fetchUserInfo(user?.uid)
       
    // console.log(user.uid)
    });

    return () => {
      unSub();
    };
  }, [fetchUserInfo]);
  console.log(currentUser);
  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className='container'>
{ currentUser ? (
        <>
          <Lists/>
<Chat/>
<Details/>
        </>
      ) : (
        <Login />
      )}
<Notification/>



    </div>
    
  )
  
}





export default App ;