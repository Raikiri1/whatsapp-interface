import React from 'react';
import styles from './Header.module.css'
import { useNavigate } from "react-router-dom";

export const Header = () => {

      const navigate = useNavigate()
      
      const singOut = () => {
            navigate('/')
      }
      return (
            <header className={styles.header}>
                  <button onClick={singOut} className={styles.exitButton}>Выход</button>
            </header>
      );
}

