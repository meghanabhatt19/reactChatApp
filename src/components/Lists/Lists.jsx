import React from 'react'
import"./list.css";
import UserInfo from './userInfo/UserInfo';
import ChatList from './ChatList/ChatList';
function Lists() {
  return (
    <div className='list'>
<UserInfo/>
<ChatList/>

    </div>
  )
}

export default Lists