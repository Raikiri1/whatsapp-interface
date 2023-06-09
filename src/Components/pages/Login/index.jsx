/** @format */

import React from 'react';
import styles from './Login.module.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getKeys } from '../../../redux/slice/loginSlice';

export const Login = () => {
  const [idInstance, setIdInstance] = React.useState('');
  const [apiToken, setApiToken] = React.useState('');
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const authHandler = () => {
    if (idInstance && apiToken) {
      dispatch(getKeys({ idInstance, apiToken }));
      localStorage.setItem('idInstance', idInstance);
      localStorage.setItem('apiTokenInstance', apiToken);
      navigate('/chat');
    }
  };
  
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.inputWrapper}>
          <div className={styles.inputText}>Введите idInstance</div>
          <input
            type='text'
            placeholder='idInstance'
            className={styles.input}
            value={idInstance}
            onChange={(e) => setIdInstance(e.target.value)}
          />
        </div>
        <div className={styles.inputWrapper}>
          <div className={styles.inputText}>Введите ApiTokenInstance</div>
          <input
            type='text'
            placeholder='ApiTokenInstance'
            className={styles.input}
            value={apiToken}
            onChange={(e) => setApiToken(e.target.value)}
          />
        </div>

        <button className={styles.buttonSubmit} onClick={authHandler}>
          Вход
        </button>
      </div>
    </div>
  );
};
