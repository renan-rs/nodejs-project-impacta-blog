import React from "react";
import './NavBar.css';

const NavBar = () => {
  const user = localStorage.getItem("token");
  const userName = localStorage.getItem("userName");
  const handleLogout = (e) => {
    //e.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    window.location = '/';
  }
  return (
    <nav className="navbar navbar-expand-sm sticky-top" data-bs-theme="dark">
      <div className="container">
        
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarBlog" aria-controls="navbarBlog" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse d-lg-flex" id="navbarBlog">
          <a className="navbar-brand col-sm-3 me-0" href="/">Impacta Blog</a>
          <ul className="navbar-nav col-sm-6 justify-content-lg-center">
            <li className="nav-item me-3">
              <a href="/home" className="nav-link">Listar artigos</a>
            </li>
            <li className="nav-item me-3">
              <a href="/create" className="nav-link">Criar artigo</a>
            </li>
          </ul>
          <div className="d-flex col-sm-3 justify-content-lg-end">
            <span className="me-3 logged-user">Olá, {userName}</span>
            {user ? <><button className="btn btn-outline-light" onClick={handleLogout}>Sair</button></>
                  : <><a className="btn btn-outline-light" href="/login" role="button">Entrar</a></>}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;