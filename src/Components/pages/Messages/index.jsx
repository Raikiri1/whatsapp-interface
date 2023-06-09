

import React from 'react';
import styles from './Messages.module.css';
import { ContactsItem } from '../../ContactsItem';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { createChats, addMeMessage, addReceivingMessage } from '../../../redux/slice/chatsSlice';
import { UserChat } from '../../UserChat';
import { UserChatPlaceholder } from '../../UserChat/UserChatPlaceholder';

export const Messages = () => {
  const navigate = useNavigate();

  const [inputMessageValue, setInputMessageValue] = React.useState('');
  const [contactInput, setContactInput] = React.useState('');
  const [currentContact, setCurrentContact] = React.useState('');
  const [exitChat, setExitChat] = React.useState(false);
  const idInstance = useSelector((state) => state.login.idInstance) || localStorage.getItem('idInstance') || "1101828335";
  const apiTokenInstance = useSelector((state) => state.login.ApiTokenInstance) || localStorage.getItem('apiTokenInstance') || "e97ace3c64e745ea9a619c6f1a9bb814275a536a6da740e083";
  

  const contacts = useSelector((state) => ({...state.chatsSlice.chats}));

  const dispatch = useDispatch();

  const addNewContact = () => {
    dispatch(createChats(contactInput));
    setContactInput('');
  };


  const sendMessage = async (chatId, message) => {
    try {
      const response = await axios.post(
        `https://api.green-api.com/waInstance${idInstance}/sendMessage/${apiTokenInstance}`,
        {
          chatId: `${chatId}@c.us`,
          message: {
            type: 'text',
            text: message,
          },
        }
      );
      console.log('Сообщение успешно отправлено', response.data);
      dispatch(addMeMessage(chatId, message));
    } catch (error) {
      console.error('Ошибка при отправке сообщения', error);
    }
  };
  
const handleSendMessage = () => {
  sendMessage(currentContact, inputMessageValue);
};



  const confirmFetchingNewMessage = async (receiptId) => {
  try {
    await axios.delete(
      `https://api.green-api.com/waInstance${idInstance}/DeleteNotification/${apiTokenInstance}/${receiptId}`
    );
  } catch (error) {
    console.log('Ошибка подтверждения получения сообщения', error);
  }
};

const fetchMessage = async () => {
  try {
    const response = await axios
      .get(
        `https://api.green-api.com/waInstance${idInstance}/ReceiveNotification/${apiTokenInstance}`
      )
      .then((response) => response.data);
    return response;
  } catch (error) {
    console.log('Ошибка получения сообщения', error);
    return error;
  }
};


  const getMessages = async () => {
    if (exitChat) return;
    try {
      const data = await fetchMessage();
      if (!data) {
        getMessages();
      } else if (data.body && data.body.messageData && data.body.messageData.typeMessage === 'textMessage') {
        dispatch(addReceivingMessage(data));
        await confirmFetchingNewMessage(data.receiptId);
        getMessages();
      } else {
        await confirmFetchingNewMessage(data.receiptId);
        getMessages();
      }
    } catch (e) {
      setTimeout(() => navigate('/'), 5000);
      alert('Что-то пошло не так. Проверьте idInstance и apiTokenInstance. Сейчас вы будете переброшены на страницу авторизации', e);
    }
  };
  

  React.useEffect(() => {
    getMessages();
    return () => {
      setExitChat(true)
    }
  }, []);

  return (
    <div className={styles.messagesWrapper}>
      <div className={styles.chats}>
        <div className={styles.search}>
          <input
            type='text'
            placeholder='Добавить контакт'
            value={contactInput}
            onChange={(e) => setContactInput(e.target.value)}
            className={styles.searchInput}
          />
          <button className={styles.searchButton} onClick={addNewContact}>
            Добавить
          </button>
        </div>
        <ContactsItem
          contacts={contacts}
          currentContact={currentContact}
          setCurrentContact={(name) => setCurrentContact(name)}
        />
      </div>

      {currentContact ? (
        <UserChat
          inputMessageValue={inputMessageValue}
          setInputMessageValue={setInputMessageValue}
          sendMessage={handleSendMessage}
          currentContact={currentContact}
        />
      ) : (
        <UserChatPlaceholder />
      )}
    </div>
  );
};
