import {Route, Routes, Navigate} from 'react-router-dom';
import Main from './components/Main/main';
import Signup from './components/Signup/signup';
import Login from './components/Login/login';
import CreateArticle from "./components/CreateArticle/create-article";
import EditArticle from "./components/EditArticle/edit-article";

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
        {user && <Route path="/create" element={<CreateArticle />} />}
        <Route path="/create" element={<Navigate replace to="/login" />} />
        {user && <Route path="/article/edit/:slug" element={<EditArticle />} />}
        <Route path="/article/edit/:slug" element={<Navigate replace to="/login" />} />
      </Routes>
  );
}

export default App;