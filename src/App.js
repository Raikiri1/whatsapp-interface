import styles from './App.module.css';
import { Login } from './Components/pages/Login';
import { Header } from './Components/Header';
import { Messages } from './Components/pages/Messages';
import { Route, Routes, NavLink } from 'react-router-dom'

function App() {
  return (
    <div className={styles.appWrapper}>
      <Header/>
      <div className={styles.container}> 
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/chat' element={<Messages/>}/>
          
        </Routes>
      </div>
    </div>
  );
}

export default App;
