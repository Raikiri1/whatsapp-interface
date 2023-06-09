/** @format */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  chats: {},
};

export const chatsSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    createChats(state, action) {
      state.chats[action.payload] = {
        messages: [
        ],
      };
    },
    addMeMessage(state, action) {
      state.chats[action.payload.currentContact].messages.push({
        sender: true,
        message: action.payload.inputMessageValue,
      });
    },
    addReceivingMessage(state, action) {
      const sender = action.payload.body.senderData.sender.slice(0,-5);
      const message = action.payload.body.messageData.textMessageData.textMessage;
      if(!state.chats[sender]){
        state.chats[sender] = {
          messages: [
          ],
        };
      }
      state.chats[sender].messages.push({
        sender: false, 
        message: message,
      })
    },
}});

export const { createChats, addMeMessage, addReceivingMessage } = chatsSlice.actions;

export default chatsSlice.reducer;
