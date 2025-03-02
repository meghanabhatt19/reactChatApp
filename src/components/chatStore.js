import { doc, getDoc } from 'firebase/firestore';
import { create } from 'zustand';
import { db } from './firebase'; // Ensure this path is correct
import { userStore } from "./userStore";

export const chatStore = create((set) => ({
  chatId: null,
  user: null,
  isCurrentUserBlocked: false,
  isReceiverBlocked: false,
  
  changeChat: (chatId, user) => {
    const currentUser = userStore.getState().currentUser;

    // CHECK IF CURRENT USER IS BLOCKED
    if (user.blocked.includes(currentUser.id)) {
      return set({
        chatId,
        user: null,
        isCurrentUserBlocked: true,
        isReceiverBlocked: false,
      });
    }

    // CHECK IF RECEIVER IS BLOCKED
    else if (currentUser.blocked.includes(user.id)) {
      return set({
        chatId,
        user,
        isCurrentUserBlocked: false,
        isReceiverBlocked: true,
      });
    } else {
      return set({
        chatId,
        user,
        isCurrentUserBlocked: false,
        isReceiverBlocked: false,
      });
    }
  },
  
  changeBlock: () => {
    set(state => ({
      ...state,
      isReceiverBlocked: !state.isReceiverBlocked
    }));
  }
}));
