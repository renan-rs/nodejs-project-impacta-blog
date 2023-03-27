import {Route, Routes, Navigate} from 'react-router-dom';
import Main from './components/Main/main';
import Signup from './components/Signup/signup';
import Login from './components/Login/login';

function App(){
  const user = localStorage.getItem("token");
  return (
      <Routes>
        {user && <Route path="/" element={<Navigate replace to="/home" />} />}
        <Route path="/" exact element={<Navigate replace to="/login" />} />
        {user && <Route path="/home" exact element={<Main />} />}
        <Route path="/home" exact element={<Navigate replace to="/login" />} />
        {user && <Route path="/login" element={<Navigate replace to="/home" />} />}
        <Route path="/login" exact element={<Login />} />
        {user && <Route path="/signup" element={<Navigate replace to="/home" />} />}
        <Route path="/signup" exact element={<Signup />} />
      </Routes>
  );
}

export default App;